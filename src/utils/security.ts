import CryptoJS from 'crypto-js';

// Extract the actual secret from the JWT token
const extractSecretFromJWT = (jwtToken: string): string => {
  try {
    // The JWT token contains the secret in the payload
    const payloadBase64 = jwtToken.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.secret;
  } catch (error) {
    console.error('Failed to extract secret from JWT:', error);
    throw new Error('Invalid JWT token format');
  }
};

// Sign request payload with the actual secret
export const signRequest = (jwtToken: string, payload: object | string): string => {
  try {
    const secret = extractSecretFromJWT(jwtToken);
    const payloadString = typeof payload === 'object' 
      ? JSON.stringify(payload) 
      : String(payload);
    
    return CryptoJS.HmacSHA256(payloadString, secret).toString(CryptoJS.enc.Hex);
  } catch (error) {
    console.error('Signing failed:', error);
    throw new Error('Failed to sign request');
  }
};