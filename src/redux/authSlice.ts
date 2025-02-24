// features/authSlice.ts
import { generateDeviceId, getSessionData, initializeSession, getAuthToken, getAuthUser } from '@/components/utils/deviceId';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import api from '@/Services/Apiservice';
import axios from 'axios';
import { User } from '@/Types/common';

interface AuthState {
  deviceId: string;
  secret: string;
  token: string;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const { deviceId, secret } = getSessionData();
const user = getAuthUser();
const token = getAuthToken();
const initialState: AuthState = {
  deviceId,
  secret,
  token,
  user,
  loading: false,
  error: null,
};

export const getDeviceToken = createAsyncThunk<
  { deviceId: string; secret: string },
  void,
  { rejectValue: string }
>("device/fetchToken", async (_, { rejectWithValue }) => {
  try {
    console.clear();
    console.log("secret is " + secret);

    if (deviceId) {
      // If secret exists, return the existing deviceId and secret
      return { deviceId: deviceId!, secret: secret! }; // Non-null assertion here is safe due to the `if (secret)` condition
    } else {
      // If secret doesn't exist, generate deviceId and fetch token
      const newDeviceId = generateDeviceId();
      const payload = new FormData();
      payload.append("deviceId", newDeviceId);

      const response = await axios.post("/api/endpoint/Auth/getDeviceToken", payload);

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
  'auth/login',
  async (data: { mobile: string; name: string; login_type: number, role_id:number }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // ✅ Automatically append all fields from the object
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString()); // Convert all values to strings
      });
      const response = await api.post('/Auth/login', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log('login data:',response);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;
    try {
      const response = await api.post('/Auth/resendOTP', {}, {
        headers: {
          token: auth.token,
        },
      });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data: { otp: string; company_id?: string; company_offices_id?: string }, { getState, rejectWithValue }) => {
    const { auth } = getState() as RootState;

    try {
      const formData = new FormData();

      // ✅ Automatically append all fields from the object
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString()); // Convert all values to strings
      });
      const response = await api.post('/Auth/verifyOTP', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: auth.token,
        },
      });
      // console.log('User data:',response);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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
        state.token = action.payload.token;
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
        state.user = action.payload.result;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;