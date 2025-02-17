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
    openSearch: (state) => {
      state.value = true;
  },
  closeSearch: (state) => {
      state.value = false;
  },
  },
});

export const { openSearch, closeSearch } = searchSlice.actions;
export default searchSlice.reducer;