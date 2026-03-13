import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null, // Store token in Redux for easy access
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Dispatched by the UI — intercepted by the auth saga
    loginRequest(state) {
      state.isLoading = true;
      state.error = null;
    },
    // Dispatched by the saga on success
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token; // Store token in Redux
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    // Dispatched by the saga on failure
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
