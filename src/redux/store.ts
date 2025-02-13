import { configureStore } from '@reduxjs/toolkit';
import progressReducer from './progressSlice';

// Create the store
export const makeStore = () => {
  return configureStore({
    reducer: {
      progress: progressReducer, // Add the progress slice to the store

    },
  });
};

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];