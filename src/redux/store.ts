import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./progressSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";
import jobFiltersMasterReducer from "./jobsFilterSlice";
import loginPopupReducer from "./loginDialogSlice";
import profileReducer from "./profileSlice";

// Create the store
export const makeStore = () => {
  return configureStore({
    reducer: {
      progress: progressReducer,
      user: userReducer,
      search: searchReducer,
      auth: authReducer,
      jobFiltersMaster: jobFiltersMasterReducer,
      loginDialog: loginPopupReducer,
      profile: profileReducer,
    },
  });
};

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
