import React, { useState } from 'react';

export default function CreatePaste() {
  const [content, setContent] = useState('');
  const [ttlSeconds, setTtlSeconds] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const payload = {
      content: content,
    };

    if (ttlSeconds !== '' && Number.isInteger(Number(ttlSeconds))) {
      payload.ttl_seconds = Number(ttlSeconds);
    }
    if (maxViews !== '' && Number.isInteger(Number(maxViews))) {
      payload.max_views = Number(maxViews);
    }

    try {
      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || 'Failed to create paste');
        return;
      }

      setResult({ id: data.id, url: data.url });
    } catch (err) {
      setError('Network error');
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div>Content</div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Type or paste text here..."
            style={{ width: '100%', fontFamily: 'monospace' }}
            required
          />
        </label>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <label>
            <div>TTL seconds (optional)</div>
            <input
              type="number"
              min="1"
              value={ttlSeconds}
              onChange={(e) => setTtlSeconds(e.target.value)}
              placeholder="e.g., 60"
              style={{ width: '100%' }}
            />
          </label>

          <label>
            <div>Max views (optional)</div>
            <input
              type="number"
              min="1"
              value={maxViews}
              onChange={(e) => setMaxViews(e.target.value)}
              placeholder="e.g., 5"
              style={{ width: '100%' }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: '8px 12px' }}>Create paste</button>
      </form>

      {error && (
        <div style={{ marginTop: 12, color: 'crimson' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 12, border: '1px solid #ddd', padding: 12 }}>
          <div><strong>Paste ID:</strong> {result.id}</div>
          <div style={{ marginTop: 6 }}>
            <strong>Shareable URL:</strong>{' '}
            <a href={result.url} target="_blank" rel="noreferrer">
              {result.url}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}