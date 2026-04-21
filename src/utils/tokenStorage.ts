import AsyncStorage from '@react-native-async-storage/async-storage';
import { DecodedToken } from '../types';

const TOKEN_KEY = '@caterease_jwt_token';

// Cross-platform base64 decoder
const decodeBase64 = (str: string): string => {
  // Try using atob if available (works in Chrome debug mode)
  // eslint-disable-next-line no-undef
  const global = globalThis as unknown as { atob?: (s: string) => string };
  if (typeof global !== 'undefined' && typeof global.atob === 'function') {
    return global.atob(str);
  }
  // Fallback for React Native environment
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let i = 0;
  while (i < str.length) {
    const c1 = chars.indexOf(str.charAt(i++));
    const c2 = chars.indexOf(str.charAt(i++));
    const c3 = chars.indexOf(str.charAt(i++));
    const c4 = chars.indexOf(str.charAt(i++));

    const a = (c1 << 2) | (c2 >> 4);
    const b = ((c2 & 15) << 4) | (c3 >> 2);
    const c = ((c3 & 3) << 6) | c4;

    output += String.fromCharCode(a);
    if (c3 !== 64) output += String.fromCharCode(b);
    if (c4 !== 64) output += String.fromCharCode(c);
  }
  return output;
};

export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    // Log token to debugger with timestamp
    console.log(' [TOKEN SAVED]', {
      timestamp: new Date().toISOString(),
      tokenLength: token?.length,
      token: token, // Full token visible in debugger
    });
  } catch (error) {
    console.error(' Error saving token:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      console.log(' [TOKEN RETRIEVED]', {
        timestamp: new Date().toISOString(),
        tokenLength: token.length,
        token: token,
      });
    }
    return token;
  } catch (error) {
    console.error(' Error reading token:', error);
    return null;
  }
};

export const clearToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log(' [TOKEN CLEARED]', {
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(' Error clearing token:', error);
  }
};

// Decode JWT to view payload in debugger
export const decodeToken = (token: string | null): DecodedToken | null => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn(' Invalid token format');
      return null;
    }
    const decoded = JSON.parse(decodeBase64(parts[1])) as DecodedToken;
    console.log(' [TOKEN PAYLOAD DECODED]', {
      timestamp: new Date().toISOString(),
      payload: decoded,
    });
    return decoded;
  } catch (error) {
    console.error(' Error decoding token:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token: string | null): boolean => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const isExpired = Date.now() >= expirationTime;
    console.log(' [TOKEN EXPIRATION CHECK]', {
      expiresAt: new Date(expirationTime).toISOString(),
      isExpired,
    });
    return isExpired;
  } catch (error) {
    console.error(' Error checking token expiration:', error);
    return true;
  }
};
