import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPopupState {
  resumeModal: boolean;
  educationModal: boolean;
}

const initialState: LoginPopupState = {
  resumeModal: false,
  educationModal: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setResumeModal: (state, action) => {
      state.resumeModal = action.payload;
    },
    setEducationModal: (state, action) => {
      state.educationModal = action.payload;
    },
  },
});

export const { setResumeModal, setEducationModal } = profileSlice.actions;

export default profileSlice.reducer;
