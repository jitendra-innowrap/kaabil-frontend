// features/authSlice.ts
import {
  generateDeviceId,
  getSessionData,
  initializeSession,
  getAuthToken,
  getAuthUser,
  getAuthUserDesiredRole,
  storeAuthUser,
} from "@/components/utils/deviceId";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import api from "@/Services/Apiservice";
import axios from "axios";
import { Skill, User, UserRole } from "@/Types/common";

interface AuthState {
  deviceId: string;
  secret: string;
  token: string;
  mobileInputToken: string;
  email?: string;
  id?: string;
  is_profile_verify?: string;
  mobile?: string;
  name?: string;
  photo_url?: string;
  user_id?: string;
  role_id?: string | string[];
  job_type_master_id?: string[];
  skills?: Skill[];
  users_education?: string[];
  experience: object[];
  location_id?: string | string[];
  active_jobseeker?: number;
  available_job?: number;
  loading: boolean;
  error: string | null;
}

const { deviceId, secret } = getSessionData();
const user = getAuthUser() as User;
const userRole = getAuthUserDesiredRole();
const token = getAuthToken();
const initialState: AuthState = {
  deviceId,
  secret,
  token,
  email: user?.email,
  id: user?.id,
  is_profile_verify: user?.is_profile_verify,
  mobile: user?.mobile,
  name: user?.name,
  role_id: userRole?.role_id,
  job_type_master_id: userRole?.job_type_master_id,
  skills: [],
  experience: [],
  location_id: [],
  users_education: [],
  active_jobseeker: 0,
  available_job: 0,
  loading: false,
  error: null,
  // mobileInputToken To Send inside Verify Token
  mobileInputToken: "",
};

export const getDeviceToken = createAsyncThunk<
  { deviceId: string; secret: string },
  void,
  { rejectValue: string }
>("device/fetchToken", async (_, { rejectWithValue }) => {
  try {

    if (deviceId) {
      // If secret exists, return the existing deviceId and secret
      return { deviceId: deviceId!, secret: secret! }; // Non-null assertion here is safe due to the `if (secret)` condition
    } else {
      // If secret doesn't exist, generate deviceId and fetch token
      const newDeviceId = generateDeviceId();
      const payload = new FormData();
      payload.append("deviceId", newDeviceId);

      const response = await axios.post(
        "/api/endpoint/Auth/getDeviceToken",
        payload
      );

      if (response.data?.deviceId && response.data?.secret) {
        initializeSession(response.data.deviceId, response.data.secret);
        return response.data;
      } else {
        return rejectWithValue("Invalid response from server");
      }
    }
  } catch (error: any) {
    return rejectWithValue("Failed to fetch device token");
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (
    data: { mobile: string; name: string; login_type: number; role_id: number },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      // ✅ Automatically append all fields from the object
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString()); // Convert all values to strings
      });
      const response = await api.post("/Auth/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log('login data:',response);
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    try {
      const response = await api.post(
        "/Auth/resendOTP",
        {},
        {
          headers: {
            token: auth.mobileInputToken,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    data: { otp: string; company_id?: string; company_offices_id?: string },
    { getState, rejectWithValue }
  ) => {
    const { auth } = getState() as RootState;

    try {
      const formData = new FormData();

      // ✅ Automatically append all fields from the object
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString()); // Convert all values to strings
      });
      const response = await api.post("/Auth/verifyOTP", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: auth.mobileInputToken,
        },
      });
      // console.log('User data:',response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeviceToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeviceToken.fulfilled, (state, action) => {
        state.loading = false;
        state.deviceId = action.payload.deviceId;
        state.secret = action.payload.secret;
      })
      .addCase(getDeviceToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.user_id;
        state.role_id = action.payload.role_id;
        state.skills = action.payload.skills;
        // Token Was UnSet At The Time Of First Process
        // state.token = action.payload.token;
        // New Token To Send inside Verify Token
        state.mobileInputToken = action.payload.token;
        state.active_jobseeker = action.payload.active_jobseeker;
        state.available_job = action.payload.available_job;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.photo_url = action.payload?.result?.photo_url;
        state.name = action.payload?.result?.name;
        state.email = action.payload?.result?.email;
        state.is_profile_verify = action.payload?.result?.is_profile_verify;
        state.mobile = action.payload?.result?.mobile;
        state.id = action.payload?.result?.id;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
