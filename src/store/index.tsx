import { configureStore } from '@reduxjs/toolkit';
import { vmsApi } from '../api';

export const store = configureStore({
  reducer: {
    [vmsApi.reducerPath]: vmsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vmsApi.middleware),
});
