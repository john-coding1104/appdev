import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@caterease_jwt_token';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    // Log token to debugger with timestamp
    console.log('🔐 [TOKEN SAVED]', {
      timestamp: new Date().toISOString(),
      tokenLength: token?.length,
      token: token, // Full token visible in debugger
    });
  } catch (error) {
    console.error('❌ Error saving token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      console.log('🔑 [TOKEN RETRIEVED]', {
        timestamp: new Date().toISOString(),
        tokenLength: token.length,
        token: token,
      });
    }
    return token;
  } catch (error) {
    console.error('❌ Error reading token:', error);
    return null;
  }
};

export const clearToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('🗑️ [TOKEN CLEARED]', {
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Error clearing token:', error);
  }
};

// Decode JWT to view payload in debugger
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn('⚠️ Invalid token format');
      return null;
    }
    const decoded = JSON.parse(atob(parts[1]));
    console.log('📋 [TOKEN PAYLOAD DECODED]', {
      timestamp: new Date().toISOString(),
      payload: decoded,
    });
    return decoded;
  } catch (error) {
    console.error('❌ Error decoding token:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    const isExpired = Date.now() >= expirationTime;
    console.log('⏰ [TOKEN EXPIRATION CHECK]', {
      expiresAt: new Date(expirationTime).toISOString(),
      isExpired,
    });
    return isExpired;
  } catch (error) {
    console.error('❌ Error checking token expiration:', error);
    return true;
  }
};
