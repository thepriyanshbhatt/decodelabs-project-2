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
    <div className="glass-panel glow-effect" style={{ padding: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Mode Switcher */}
        <div className="switch-container">
          <button 
            className={`switch-btn ${mode === 'encrypt' ? 'active encrypt' : ''}`}
            onClick={() => setMode('encrypt')}
          >
            Encrypt
          </button>
          <button 
            className={`switch-btn ${mode === 'decrypt' ? 'active decrypt' : ''}`}
            onClick={() => setMode('decrypt')}
          >
            Decrypt
          </button>
        </div>

        {/* Algorithm Selector */}
        <select 
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value)}
          style={{ width: '200px', cursor: 'pointer' }}
        >
          <option value="caesar">Caesar Cipher</option>
          <option value="vigenere">Vigenère Cipher</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Input Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {mode === 'encrypt' ? 'Plaintext Input' : 'Ciphertext Input'}
          </label>
          <textarea 
            className="mono animate-fade-in"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message here..."
          />
        </div>

        {/* Key/Shift Configuration */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
          <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Cryptographic Key
          </label>
          
          {algorithm === 'caesar' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-primary)' }}>Shift Value:</span>
              <input 
                type="number" 
                value={caesarShift} 
                onChange={(e) => setCaesarShift(e.target.value)}
                style={{ width: '100px' }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: 'var(--text-primary)' }}>Keyword:</span>
              <input 
                type="text" 
                value={vigenereKey} 
                onChange={(e) => setVigenereKey(e.target.value.toUpperCase())}
                placeholder="e.g. SECRET"
                style={{ flex: 1 }}
              />
            </div>
          )}
        </div>

        {/* Output Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ color: mode === 'encrypt' ? 'var(--accent-green)' : 'var(--accent-blue)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              {mode === 'encrypt' ? 'Encrypted Output' : 'Decrypted Output'}
            </label>
            <button 
              onClick={handleCopy}
              style={{ background: 'transparent', color: copied ? 'var(--accent-green)' : 'var(--text-secondary)', fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--glass-border)' }}
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
          <div 
            className="mono animate-fade-in"
            style={{ 
              minHeight: '120px', 
              background: 'rgba(0,0,0,0.6)', 
              borderRadius: '12px', 
              padding: '12px 16px',
              border: `1px solid ${mode === 'encrypt' ? 'rgba(57, 255, 20, 0.3)' : 'rgba(0, 240, 255, 0.3)'}`,
              color: mode === 'encrypt' ? 'var(--accent-green)' : 'var(--accent-blue)',
              wordBreak: 'break-all',
              whiteSpace: 'pre-wrap'
            }}
          >
            {output || <span style={{ opacity: 0.3 }}>Output will appear here...</span>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CipherInterface;
