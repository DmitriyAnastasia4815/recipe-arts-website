import { configureStore } from '@reduxjs/toolkit';
import updatePasswordReducer from './updatePasswordSlice';

export const store = configureStore({
  reducer: {
    updatePassword: updatePasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;