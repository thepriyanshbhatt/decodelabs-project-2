import React, { useState, useEffect } from 'react';
import { caesarCipher, vigenereCipher } from '../utils/cipher';

const CipherInterface = () => {
  const [mode, setMode] = useState('encrypt'); // 'encrypt' or 'decrypt'
  const [algorithm, setAlgorithm] = useState('caesar'); // 'caesar' or 'vigenere'
  const [input, setInput] = useState('');
  const [caesarShift, setCaesarShift] = useState('3');
  const [vigenereKey, setVigenereKey] = useState('KEY');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let result = '';
    const isDecrypt = mode === 'decrypt';
    
    if (algorithm === 'caesar') {
      result = caesarCipher(input, caesarShift, isDecrypt);
    } else {
      result = vigenereCipher(input, vigenereKey, isDecrypt);
    }
    
    setOutput(result);
  }, [input, caesarShift, vigenereKey, mode, algorithm]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel glow-effect" style={{ padding: '2.5rem', width: '100%', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Top Controls - Header Bento */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', background: 'rgba(0,0,0,0.3)', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
        
        {/* Mode Switcher */}
        <div className="switch-container" style={{ flex: '1', minWidth: '250px' }}>
          <button 
            className={`switch-btn ${mode === 'encrypt' ? 'active encrypt' : ''}`}
            onClick={() => setMode('encrypt')}
          >
            🔒 Encrypt
          </button>
          <button 
            className={`switch-btn ${mode === 'decrypt' ? 'active decrypt' : ''}`}
            onClick={() => setMode('decrypt')}
          >
            🔓 Decrypt
          </button>
        </div>

        {/* Algorithm Selector */}
        <div style={{ flex: '1', minWidth: '200px', display: 'flex', justifyContent: 'flex-end' }}>
          <select 
            value={algorithm} 
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{ width: '100%', maxWidth: '250px', cursor: 'pointer', fontWeight: '500' }}
          >
            <option value="caesar">Caesar Cipher</option>
            <option value="vigenere">Vigenère Cipher</option>
          </select>
        </div>
      </div>

      {/* Main Grid - Bento Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column: Input & Key */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Input Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600' }}>
              {mode === 'encrypt' ? '📝 Plaintext Input' : '📝 Ciphertext Input'}
            </label>
            <textarea 
              className="mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your message here..."
              style={{ boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}
            />
          </div>

          {/* Key/Shift Configuration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <label style={{ color: 'var(--text-primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔑 Cryptographic Key
            </label>
            
            {algorithm === 'caesar' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Shift Value:</span>
                <input 
                  type="number" 
                  value={caesarShift} 
                  onChange={(e) => setCaesarShift(e.target.value)}
                  style={{ width: '120px', textAlign: 'center', fontWeight: 'bold' }}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Keyword:</span>
                <input 
                  type="text" 
                  value={vigenereKey} 
                  onChange={(e) => setVigenereKey(e.target.value.toUpperCase())}
                  placeholder="e.g. SECRET"
                  style={{ flex: 1, fontWeight: 'bold', letterSpacing: '2px' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: mode === 'encrypt' ? 'var(--accent-green)' : 'var(--accent-blue)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
              {mode === 'encrypt' ? '✨ Encrypted Output' : '✨ Decrypted Output'}
            </label>
            <button 
              onClick={handleCopy}
              style={{ background: copied ? 'rgba(57, 255, 20, 0.2)' : 'rgba(255,255,255,0.05)', color: copied ? 'var(--accent-green)' : 'var(--text-primary)', fontSize: '0.8rem', padding: '6px 12px', borderRadius: '8px', border: `1px solid ${copied ? 'rgba(57, 255, 20, 0.5)' : 'var(--glass-border)'}`, transition: 'all 0.2s ease', cursor: 'pointer', fontWeight: '600' }}
            >
              {copied ? '✓ Copied!' : '📋 Copy Text'}
            </button>
          </div>
          <div 
            className="mono"
            style={{ 
              flex: 1,
              minHeight: '200px', 
              background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)', 
              borderRadius: '16px', 
              padding: '1.5rem',
              border: `1px solid ${mode === 'encrypt' ? 'rgba(57, 255, 20, 0.4)' : 'rgba(0, 240, 255, 0.4)'}`,
              color: mode === 'encrypt' ? 'var(--accent-green)' : 'var(--accent-blue)',
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap',
              boxShadow: `0 0 20px ${mode === 'encrypt' ? 'rgba(57, 255, 20, 0.1)' : 'rgba(0, 240, 255, 0.1)'}`,
              fontSize: '1.1rem',
              lineHeight: '1.5'
            }}
          >
            {output || <span style={{ opacity: 0.2, color: '#fff' }}>Awaiting input to process...</span>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CipherInterface;
