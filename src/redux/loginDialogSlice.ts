import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginPopupState {
  isOpen: boolean;
}

const initialState: LoginPopupState = {
  isOpen: false,
};

const loginPopupSlice = createSlice({
  name: 'loginPopup',
  initialState,
  reducers: {
    openLoginDialog: (state) => {
      state.isOpen = true;
    },
    closeLoginDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openLoginDialog, closeLoginDialog } = loginPopupSlice.actions;

export default loginPopupSlice.reducer;