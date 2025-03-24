import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterBucket {
  key: string;
  doc_count: number;
}

interface SalaryRange {
  min: number;
  max: number;
}

interface JobFiltersMasterState {
  benefits_filter: FilterBucket[];
  job_location_types_filter: FilterBucket[];
  job_types_filter: FilterBucket[];
  experience: FilterBucket[];
  location_filter: FilterBucket[];
  skill_filter: FilterBucket[];
  industries_filter: FilterBucket[]
  soft_skills_filter: FilterBucket[];
  salary: SalaryRange;
}

const initialState: JobFiltersMasterState = {
  benefits_filter: [],
  job_location_types_filter: [],
  industries_filter: [],
  experience: [],
  job_types_filter: [],
  location_filter: [],
  skill_filter: [],
  soft_skills_filter: [],
  salary: { min: 0, max: 0 },
  
};

const jobFiltersMasterSlice = createSlice({
  name: "jobFiltersMaster",
  initialState,
  reducers: {
    setJobFiltersMaster: (state, action: PayloadAction<JobFiltersMasterState>) => {
      return action.payload; // Replace state with new filter master data
    },
    resetJobFiltersMaster: () => initialState, // Reset filters to initial state
  },
});

export const { setJobFiltersMaster, resetJobFiltersMaster } = jobFiltersMasterSlice.actions;
export default jobFiltersMasterSlice.reducer;
