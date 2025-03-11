import { getProgress, storeProgress } from '@/components/utils/deviceId';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  value: number;
}
const initialProgress = getProgress();
const initialState: ProgressState = {
  value: initialProgress, // Initial progress state
};
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<number>) => {
      state.value = action.payload; // Update progress state
      storeProgress(action.payload);
    },
  },
});

export const { setProgress } = progressSlice.actions;
export default progressSlice.reducer;