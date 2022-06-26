import { configureStore } from '@reduxjs/toolkit';
import userData from './Slices/dataSlice';

export const store = configureStore({
  reducer: {
    userData,
  },
});
