// Auth action types
export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';

// Auth action creators
export const loginRequest = (username: string, password: string) => ({
  type: LOGIN_REQUEST,
  payload: { username, password },
});

export const loginSuccess = (user: unknown) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});
