import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreatePaste from './Pages/CreatePaste';
import ViewPaste from './Pages/ViewPaste';

function App() {
  return (
    <BrowserRouter>
      <div style={{ maxWidth: 720, margin: '24px auto', fontFamily: 'system-ui' }}>
        <header style={{ marginBottom: 24 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <h1>Pastebin</h1>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<CreatePaste />} />
          <Route path="/p/:id" element={<ViewPaste />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;

