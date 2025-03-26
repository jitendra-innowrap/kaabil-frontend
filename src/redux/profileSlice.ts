import api from "@/Services/Apiservice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPopupState {
  loading: boolean;
  resumeModal: boolean;
  educationModal: boolean;
  experienceModal: boolean;
  profileModal: boolean;
  profileData: any;
}

const initialState: LoginPopupState = {
  resumeModal: false,
  educationModal: false,
  experienceModal: false,
  profileModal: false,
  loading: false,
  profileData: [],
};

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async ({ data, token }: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/Auth/getJobSeekerProfile", data, {
        headers: {
          token,
        },
      });
      console.log(response.data, "Verify Data Please");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

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
    setExperienceModal: (state, action) => {
      state.experienceModal = action.payload;
    },
    setProfileModal: (state, action) => {
      state.profileModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload?.result[0];
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        console.error("Fetch Profile Error:", action.payload);
      });
  },
});

export const {
  setResumeModal,
  setEducationModal,
  setExperienceModal,
  setProfileModal,
} = profileSlice.actions;

export default profileSlice.reducer;
