import { getAuthToken, getAuthUser, getAuthUserDesiredRole, getSessionData, storeAuthUser } from '@/components/utils/deviceId';
import { Skill, User, UserLocation, UserRole } from '@/Types/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the experience interface
interface Experience {
  role: string;
  company: string;
  salary: number;
  type: string;
  workingSince?: string;
  workingUntil?: string;
}

interface AuthState {
  deviceId: string;
  secret: string;
  token: string;
  email?: string;
  id?: string;
  is_profile_verify?: string;
  mobile?: string;
  name?: string;
  photo_url?: string;
  user_id?: string;
  role_id?: string[];
  job_type_master_id?: string[];
  skills?: Skill[];
  current_location?: UserLocation | null;
  users_education?: string[];
  experience: Experience[];
  location_id?: string | string[];
  active_jobseeker?: number;
  available_job?: number;
  loading: boolean;
  error: string | null;
}
const { deviceId, secret } = getSessionData();
const user = getAuthUser() as User;
const token = getAuthToken();
const initialState: AuthState = {
  deviceId,
  secret,
  token,
  email: user?.email,
  id: user?.id,
  is_profile_verify: user?.is_profile_verify,
  mobile: user?.mobile,
  name: user?.name || "",
  role_id: user?.role_id || [],
  job_type_master_id: user?.job_type_master_id || [],
  skills: [],
  experience: [],
  location_id: [],
  users_education: [],
  current_location: null,
  active_jobseeker: 0,
  available_job: 0,
  loading: false,
  error: null,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    // Clear the user state
      signOut: (state) => {
        state = initialState // Clear user_location on sign out
      },
      setUserRole: (state, action: PayloadAction<UserRole>) => {
        console.log('updating name: ---------', action.payload);
        // state.role_id = action.payload.role_id;
        // state.job_type_master_id = action.payload.job_type_master_id;
        // storeAuthUser({ ...state, role_id: action.payload.role_id, job_type_master_id: action.payload.job_type_master_id });
      },
      setUserSkills: (state, action: PayloadAction<Skill[]>) => {
        state.skills = action.payload;
        storeAuthUser({ ...state, skills: action.payload });
      },
      setUserMobile: (state, action: PayloadAction<string>) => {
        state.mobile = action.payload;
        storeAuthUser({ ...state, mobile: action.payload });
      },
      setUserName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
        storeAuthUser({ ...state, name: action.payload });
      },
      setUserLocation: (state, action: PayloadAction<string[]>) => {
        state.location_id = action.payload;
        storeAuthUser({ ...state, location_id: action.payload });
      },
      setUserExperience: (state, action: PayloadAction<Experience[]>) => {
        state.experience = action.payload;
        storeAuthUser({ ...state, experience: action.payload });
      },
      setUserEducation: (state, action: PayloadAction<string[]>) => {
        state.users_education = action.payload;
        storeAuthUser({ ...state, users_education: action.payload });
      },
      setCurrentLocation: (state, action: PayloadAction<UserLocation>) => {
        state.current_location = action.payload;
        storeAuthUser({ ...state, current_location: action.payload });
      }
      
    },
});

// Export actions
export const { signOut, setUserRole, setUserEducation, setUserExperience, setUserMobile, setUserName, setUserLocation, setUserSkills, setCurrentLocation } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;