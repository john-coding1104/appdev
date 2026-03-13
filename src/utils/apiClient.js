import { getToken } from './tokenStorage';

// Using Wi-Fi IP for physical device connectivity
const API_BASE_URL = 'http://192.168.137.108:8000/api';

/**
 * API client with automatic token injection
 * Logs all requests/responses for debugging
 */
export const apiClient = {
  get: async (endpoint, options = {}) => {
    return makeRequest(endpoint, { ...options, method: 'GET' });
  },

  post: async (endpoint, body, options = {}) => {
    return makeRequest(endpoint, { ...options, method: 'POST', body });
  },

  put: async (endpoint, body, options = {}) => {
    return makeRequest(endpoint, { ...options, method: 'PUT', body });
  },

  delete: async (endpoint, options = {}) => {
    return makeRequest(endpoint, { ...options, method: 'DELETE' });
  },
};

async function makeRequest(endpoint, options = {}) {
  try {
    const token = await getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('🔒 [API REQUEST] Token attached to headers', {
        endpoint,
        tokenLength: token.length,
      });
    }

    const url = `${API_BASE_URL}${endpoint}`;
    
    console.log('🌐 [API REQUEST]', {
      method: options.method || 'GET',
      url,
      timestamp: new Date().toISOString(),
      hasToken: !!token,
    });

    const response = await fetch(url, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    console.log('📨 [API RESPONSE]', {
      method: options.method || 'GET',
      endpoint,
      status: response.status,
      timestamp: new Date().toISOString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ [API DATA RECEIVED]', {
      endpoint,
      dataKeys: Object.keys(data),
    });

    return data;
  } catch (error) {
    console.error('❌ [API ERROR]', {
      endpoint,
      error: error.message,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}
