import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
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
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    // Dispatched by the saga on failure
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
