import api, { api3 } from "@/Services/Apiservice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
  industries_filter: FilterBucket[];
  soft_skills_filter: FilterBucket[];
  salary: SalaryRange;
  selectedTab: number;
  openShare: boolean;
  loading: boolean; // New loading state for async operations
  branchIoError: string | null; // To handle errors from branchIo API
  shareUrl: any;
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
  selectedTab: 1,
  openShare: false,
  loading: false, // Initialize loading as false
  branchIoError: null, // Initialize error as null
  shareUrl: "",
};

export const branchIo = createAsyncThunk(
  "auth/branchIo",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await api3.post("url", data);
      console.log(response.data, "Verify Data Please");
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || "An error occurred");
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const jobFiltersMasterSlice = createSlice({
  name: "jobFiltersMaster",
  initialState,
  reducers: {
    setJobFiltersMaster: (
      state,
      action: PayloadAction<JobFiltersMasterState>
    ) => {
      return action.payload; // Replace state with new filter master data
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setOpenShare: (state, action) => {
      state.openShare = action.payload;
    },
    resetJobFiltersMaster: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(branchIo.pending, (state) => {
        state.loading = true;
        state.branchIoError = null;
      })
      .addCase(branchIo.fulfilled, (state, action) => {
        state.loading = false;
        state.shareUrl = action.payload;
      })
      .addCase(branchIo.rejected, (state, action) => {
        state.loading = false;
        state.branchIoError = action.payload as string;
      });
  },
});

export const {
  setJobFiltersMaster,
  resetJobFiltersMaster,
  setSelectedTab,
  setOpenShare,
} = jobFiltersMasterSlice.actions;
export default jobFiltersMasterSlice.reducer;
