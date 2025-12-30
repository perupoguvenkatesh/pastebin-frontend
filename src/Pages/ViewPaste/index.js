import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState(null);

  async function fetchPaste() {
    setError(null);
    setPaste(null);
    try {
      const res = await fetch(`https://pastebin-backend-sigma.vercel.app/api/pastes/${id}`, {
        headers: {
          // Optional: uncomment to test expiry with a simulated time
          // 'x-test-now-ms': String(Date.now())
        }
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Paste unavailable');
        return;
      }
      setPaste(data);
    } catch (err) {
      setError('Network error');
    }
  }

  useEffect(() => {
    fetchPaste();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return (
      <div style={{ color: 'crimson' }}>
        {error}
      </div>
    );
  }

  if (!paste) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{
        padding: 12,
        border: '1px solid #ddd',
        background: '#fafafa',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace'
      }}>
        {paste.content}
      </div>

      <div style={{ marginTop: 12 }}>
        <div><strong>Remaining views:</strong> {paste.remaining_views === null ? 'Unlimited' : paste.remaining_views}</div>
        <div><strong>Expires at:</strong> {paste.expires_at === null ? 'No TTL' : paste.expires_at}</div>
      </div>

      <button onClick={fetchPaste} style={{ marginTop: 12, padding: '6px 10px' }}>
        Refresh paste
      </button>
    </div>
  );
}
