import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';
import userReducer from './userSlice';

// Create the store
export const makeStore = () => {
  return configureStore({
    reducer: {
      progress: progressReducer, 
      user: userReducer,


    },
  });
};

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];