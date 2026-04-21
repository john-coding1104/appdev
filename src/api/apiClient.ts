import { getToken } from '../utils/tokenStorage';
import { ApiRequestOptions } from '../types';

// Using Wi-Fi IP for physical device connectivity
const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * API client with automatic token injection
 * Logs all requests/responses for debugging
 */
export const apiClient = {
  get: async (endpoint: string, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<unknown> => {
    return makeRequest(endpoint, { ...options, method: 'GET' });
  },

  post: async (endpoint: string, body: Record<string, unknown>, options: Omit<ApiRequestOptions, 'method'> = {}): Promise<unknown> => {
    return makeRequest(endpoint, { ...options, method: 'POST', body });
  },

  put: async (endpoint: string, body: Record<string, unknown>, options: Omit<ApiRequestOptions, 'method'> = {}): Promise<unknown> => {
    return makeRequest(endpoint, { ...options, method: 'PUT', body });
  },

  delete: async (endpoint: string, options: Omit<ApiRequestOptions, 'method' | 'body'> = {}): Promise<unknown> => {
    return makeRequest(endpoint, { ...options, method: 'DELETE' });
  },
};

async function makeRequest(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<unknown> {
  try {
    const token = await getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add Authorization header if token exists
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log(' [API REQUEST] Token attached to headers', {
        endpoint,
        tokenLength: token.length,
      });
    }

    const url = `${API_BASE_URL}${endpoint}`;

    console.log(' [API REQUEST]', {
      method: options.method || 'GET',
      url,
      timestamp: new Date().toISOString(),
      hasToken: !!token,
    });

    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    console.log(' [API RESPONSE]', {
      method: options.method || 'GET',
      endpoint,
      status: response.status,
      timestamp: new Date().toISOString(),
    });

    if (!response.ok) {
      const errorData = await response.json() as { message?: string };
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json() as unknown;
    console.log(' [API DATA RECEIVED]', {
      endpoint,
      dataKeys: Object.keys(data as object),
    });

    return data;
  } catch (error) {
    console.error(' [API ERROR]', {
      endpoint,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
}
