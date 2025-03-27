import api from "@/Services/Apiservice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPopupState {
  loading: boolean;
  resumeModal: boolean;
  educationModal: boolean;
  experienceModal: boolean;
  profileModal: boolean;
  profileData: any;
  qualificationList: any;
  educationData: any;
  aboutMeModal: boolean;
}

const initialState: LoginPopupState = {
  resumeModal: false,
  educationModal: false,
  experienceModal: false,
  profileModal: false,
  loading: false,
  profileData: [],
  qualificationList: [],
  educationData: [],
  aboutMeModal: false,
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

export const editResume = createAsyncThunk(
  "auth/fetchProfile",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/Auth/editJobSeekerPrpfile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data, "Verify Data Please");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchEducationDetail = createAsyncThunk(
  "auth/fetchEducationDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MasterData/getEducation");
      console.log(response.data, "Verify Data Please");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fieldStudy = createAsyncThunk(
  "auth/fieldStudy",
  async ({ data }: any, { rejectWithValue }) => {
    try {
      const response = await api.post("MasterData/getFieldStudy", data, {
        headers: {
          "Content-Type": "multipart/form-data",
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
    setEducationData: (state, action) => {
      state.educationData = action.payload;
    },
    setAboutMeModal: (state, action) => {
      state.aboutMeModal = action.payload;
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
      })
      .addCase(fetchEducationDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.qualificationList =
          action.payload?.result?.map((role: any) => ({
            id: role.id,
            name: role.name,
          })) || [];
      })
      .addCase(fieldStudy.fulfilled, (state, action) => {
        console.log(action?.payload, "Verify Payload");
        state.educationData = action.payload.result;
      });
  },
});

export const {
  setResumeModal,
  setEducationModal,
  setExperienceModal,
  setProfileModal,
  setEducationData,
  setAboutMeModal,
} = profileSlice.actions;

export default profileSlice.reducer;
