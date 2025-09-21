import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../features/sessions/sessionSlice';

export const store = configureStore({
  reducer: {
    sessions: sessionReducer,
  },
});