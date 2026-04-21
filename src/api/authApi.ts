import { apiClient } from './apiClient';
import { LoginCredentials, LoginResponse } from '../types';

/**
 *
 * @param username - User's username
 * @param password - User's password
 * @returns Promise with login response
 */
export const loginApi = async ({ username, password }: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log(' [API CALL] Sending login request to Symfony backend', {
      url: `/login`,
      username,
      timestamp: new Date().toISOString(),
    });

    const data = await apiClient.post('/login', { username, password }) as { token: string; user: { username: string; id?: string; name?: string } };

    console.log(' [API RESPONSE] Token received from Symfony', {
      timestamp: new Date().toISOString(),
      token: data.token,
      user: data.user,
      fullResponse: data,
    });

    return {
      token: data.token,
      user: data.user,
      username,
    };
  } catch (error) {
    console.log(' [API ERROR]', {
      message: error instanceof Error ? error.message : String(error),
      error: error instanceof Error ? error.toString() : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      url: `/login`,
    });
    throw error;
  }
};
