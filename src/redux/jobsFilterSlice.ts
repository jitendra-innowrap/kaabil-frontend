import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface JobsFilterState {
  industries: string;
}

const jobsFilterSlice = createSlice({
  name: 'jobsFilter',
  initialState:"",
  reducers: {
    setIndustries: (state, action: PayloadAction<any>) => {
      state = action.payload; // Update jobsFilter state
    },
  },
});

export default jobsFilterSlice.reducer;