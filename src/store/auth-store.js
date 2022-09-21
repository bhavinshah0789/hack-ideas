import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  userId: null,
  token: null,
  tokenTimer: null,
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    auth(state, { payload }) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenTimer = payload.tokenTimer;
      state.isAuthenticated = !!payload.token;
    },
    logout(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('expiresIn');

      clearTimeout(state.tokenTimer);

      state.token = null;
      state.userId = null;
      state.tokenTimer = null;
      state.isAuthenticated = !!state.token;
    },
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
