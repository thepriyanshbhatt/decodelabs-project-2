export const caesarCipher = (text, shift, isDecrypt = false) => {
  if (!text) return '';
  const parsedShift = parseInt(shift, 10);
  if (isNaN(parsedShift)) return text;
  
  const effectiveShift = isDecrypt ? -parsedShift : parsedShift;

  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + effectiveShift) % 26 + 26) % 26 + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + effectiveShift) % 26 + 26) % 26 + 97);
      }
      
      return char; // Non-alphabetic characters are not changed
    })
    .join('');
};

export const vigenereCipher = (text, key, isDecrypt = false) => {
  if (!text || !key) return text;
  
  // Clean key: only letters, uppercase
  const cleanKey = key.replace(/[^A-Za-z]/g, '').toUpperCase();
  if (cleanKey.length === 0) return text;

  let keyIndex = 0;

  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      
      let isUpper = false;
      let isLower = false;
      
      if (code >= 65 && code <= 90) isUpper = true;
      else if (code >= 97 && code <= 122) isLower = true;
      
      if (isUpper || isLower) {
        const keyChar = cleanKey[keyIndex % cleanKey.length];
        const shift = keyChar.charCodeAt(0) - 65;
        const effectiveShift = isDecrypt ? -shift : shift;
        
        keyIndex++;
        
        if (isUpper) {
          return String.fromCharCode(((code - 65 + effectiveShift) % 26 + 26) % 26 + 65);
        } else {
          return String.fromCharCode(((code - 97 + effectiveShift) % 26 + 26) % 26 + 97);
        }
      }
      
      return char;
    })
    .join('');
};
