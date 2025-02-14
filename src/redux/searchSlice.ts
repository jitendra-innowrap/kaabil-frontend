'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  value: boolean;
}
const initialState: SearchState = {
  value: false, // Initial search state
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload; // Update search state
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;