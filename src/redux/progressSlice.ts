import { getProgress } from '@/components/utils/deviceId';
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
    },
  },
});

export const { setProgress } = progressSlice.actions;
export default progressSlice.reducer;