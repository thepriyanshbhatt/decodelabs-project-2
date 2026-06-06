import React from 'react';
import CipherInterface from './components/CipherInterface';
import './index.css'; // Make sure the global CSS is imported

function App() {
  return (
    <div style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="animate-fade-in">Encryption Application</h1>
        <p className="subtitle animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          Secure your data with classic cryptography techniques.
        </p>
      </header>

      {/* Main Tool Interface */}
      <main style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards', width: '100%' }}>
          <CipherInterface />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
        <p>Built for DecodeLabs Cybersecurity Training.</p>
      </footer>
    </div>
  );
}

export default App;
