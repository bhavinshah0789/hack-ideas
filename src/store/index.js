import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth-store';

const store = configureStore({
  reducer: { auth: authReducer },
});

export default store;
