import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  value: number;
}
interface experience {
  role: string;
  company: string;
  salary: number;
  type: string;
  workingSince?: string;
  workingUntil?: string;
}

const initialState: ProgressState = {
  value: 1, // Initial progress state
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.value = action.payload; // Update progress state
    },
  },
});

export const { setProgress } = progressSlice.actions;
export default progressSlice.reducer;