'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  value: boolean;
  autocompleteService: any; // Store the autocomplete service
  isScriptLoaded: boolean; // Track if the script is loaded
}

const initialState: SearchState = {
  value: false, // Initial search state
  autocompleteService: null, // Initially null
  isScriptLoaded: false, // Script not loaded initially
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
    setAutocompleteService: (state, action: PayloadAction<any>) => {
      state.autocompleteService = action.payload; // Set the autocomplete service
    },
    setScriptLoaded: (state, action: PayloadAction<boolean>) => {
      state.isScriptLoaded = action.payload; // Set script loaded status
    },
  },
});

export const { openSearch, closeSearch, setAutocompleteService, setScriptLoaded } = searchSlice.actions;
export default searchSlice.reducer;