import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';
import userReducer from './userSlice';
import searchReducer from './searchSlice';
import authReducer from './authSlice';

// Create the store
export const makeStore = () => {
  return configureStore({
    reducer: {
      progress: progressReducer, 
      user: userReducer,
      search: searchReducer,
      auth: authReducer,
    },
  });
};

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];