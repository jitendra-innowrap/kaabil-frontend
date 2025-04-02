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
  rolesList: any;
  jobTypes: any;
  locationList: any;
  cityList: any;
  softSkills: any;
  softSkillsOption: any;
  skillList: any;
  skillsOption: any;
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
  rolesList: [],
  jobTypes: [],
  locationList: [],
  cityList: [],
  softSkills: [],
  softSkillsOption: [],
  // Skills
  skillList: [],
  skillsOption: [],
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

export const fetchSkills = createAsyncThunk(
  "auth/fetchSkills",
  async (
    { data, search }: { data: any; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const requestData = { ...data, search }; 
      const response = await api.post("/MasterData/getUserSkill", requestData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data, "Verify Data Please");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchRoles = createAsyncThunk(
  "auth/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MasterData/getDesignation");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchJobTypes = createAsyncThunk(
  "auth/fetchJobTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MasterData/getJobType");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchLocation = createAsyncThunk(
  "auth/fetchLocation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MasterData/getCity");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchSoftSkills = createAsyncThunk(
  "auth/fetchSoftSkills",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/MasterData/getSoftSkills");
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
      })
      .addCase(fetchEducationDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.qualificationList = action.payload?.result;
      })
      .addCase(fieldStudy.fulfilled, (state, action) => {
        state.educationData = action.payload.result;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        console.log(action.payload, "Fetch Role List");
        state.rolesList = action.payload?.result?.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      })
      .addCase(fetchJobTypes.fulfilled, (state, action) => {
        state.jobTypes = action.payload.result;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.cityList = action.payload.result.map((item: any) => ({
          id: item?.id,
          location: item?.name,
          latitude: item?.latitude,
          longitude: item?.longitude,
        }));
        state.locationList = action.payload.result.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
      })
      .addCase(fetchSoftSkills.fulfilled, (state, action) => {
        state.softSkills = action.payload.result.map((item: any) => ({
          id: item?.id,
          name: item?.name,
        }));
        state.softSkillsOption = action.payload.result.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        }));
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skillList = action.payload.result.map((item: any) => ({
          id: item?.id,
          name: item?.name,
          skill_level_type_id: 0,
        }));
        state.skillsOption = action.payload.result.map((item: any) => ({
          value: item?.id,
          label: item?.name,
        }));
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
