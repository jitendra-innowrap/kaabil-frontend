import {
  getAuthToken,
  getAuthUser,
  getAuthUserDesiredRole,
  getSessionData,
  storeAuthToken,
  storeAuthUser,
} from "@/components/utils/deviceId";
import {
  Experience,
  Skill,
  User,
  UserLocation,
  UserRole,
} from "@/Types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the experience interface

interface AuthState extends User {
  deviceId: string;
  secret: string;
  token: string;
  loading: boolean;
  error: string | null;
  savedMobileNumber: string | null;
  showUploadCV: boolean,
  showUpdateEducation: boolean,
  showProfilePhoto: boolean,
  showSoftSkills: boolean,
  showUpdateProfile: boolean,
  showHelpVideo: boolean,
  helpVideoData: any,
  user_willing_to_relocate: string[],
  isProfileUpdate?: boolean,
}
const { deviceId, secret } = getSessionData();
const user = getAuthUser() as User;
const token = getAuthToken();
const initialState: AuthState = {
  deviceId,
  secret,
  token,
  showUploadCV: false,
  showUpdateEducation: false,
  showProfilePhoto: false,
  showSoftSkills: false,
  showUpdateProfile: false,
  showHelpVideo: false,
  helpVideoData: null,
  isProfileUpdate: false,
  user_willing_to_relocate: [],
  email: user?.email || "",
  photo_url: user?.photo_url || "",
  id: user?.id || "",
  is_profile_verify: user?.is_profile_verify =="1"? "1":"0",
  isLoggedIn: user?.is_profile_verify =="1",
  is_whatsapp_show: user?.is_whatsapp_show === false? false : true,
  mobile: user?.mobile,
  name: user?.name || "",
  role_id: user?.role_id || [],
  job_type_master_id: user?.job_type_master_id || [],
  skills: user?.skills || [],
  designation: user?.designation || "",
  is_fresher: user?.is_fresher || 2,
  experience: user?.experience || [],
  location_id: user?.location_id || [],
  users_education: user?.users_education || [],
  profilePercentage: user?.profilePercentage || 0,
  current_location: null,
  active_jobseeker: 0,
  available_job: 0,
  loading: false,
  error: null,
  savedMobileNumber: "",
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Clear the user state
      
      signOut: (state) => {
        state = initialState // Clear user_location on sign out
      },
      setUserId: (state, action: PayloadAction<string>) => {
        state.id = action.payload;
        storeAuthUser({ ...state, id: action.payload });
      },
      setUserDesignation: (state, action: PayloadAction<string>) => {
        state.designation = action.payload;
        storeAuthUser({ ...state, designation: action.payload });
      },
      setUserIsProfileVerified: (state, action: PayloadAction<string>) => {
        state.is_profile_verify = action.payload;
        state.isLoggedIn = action.payload=="1"
        storeAuthUser({ ...state, is_profile_verify: action.payload });
      },
      setAuthToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        storeAuthToken(action.payload);
      },
      setIsFresher: (state, action: PayloadAction<number>) => {
        state.is_fresher = action.payload;
        storeAuthUser({ ...state, is_fresher: action.payload });
      },
      setUserPhotoUrl: (state, action: PayloadAction<string>) => {
        state.photo_url = action.payload;
        storeAuthUser({ ...state, photo_url: action.payload });
      },
      setUserRole: (state, action: PayloadAction<UserRole>) => {
        state.role_id = action.payload.role_id;
        state.job_type_master_id = action.payload.job_type_master_id;
        storeAuthUser({ ...state, role_id: action.payload.role_id, job_type_master_id: action.payload.job_type_master_id });
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
      },
      setUserWAConsent: (state, action: PayloadAction<boolean>) => {
        state.is_whatsapp_show = action.payload;
        storeAuthUser({ ...state, is_whatsapp_show: action.payload });
      },
      setUserProfilePercentage: (state, action: PayloadAction<number>) => {
        state.profilePercentage = action.payload;
        storeAuthUser({ ...state, profilePercentage: action.payload });
      },
      setSaveMobileNumber: (state, action) => {
        state.savedMobileNumber = action.payload;
      },
      setNudgesVisibility: (state, action) => {
        return { ...state, ...action.payload };
      },
      setHelpVideoData: (state, action) => {
        state.helpVideoData = action.payload;
      },
      setUserWillingToRelocate: (state, action:PayloadAction<string[]>) => {
        state.user_willing_to_relocate = action.payload;
      },
      RefreshProfileData: (state) => {
        state.isProfileUpdate = !state.isProfileUpdate;
      }
    },
});

// Export actions
export const {
  signOut,
  RefreshProfileData,
  setNudgesVisibility, setHelpVideoData,
  setUserWillingToRelocate,
  setUserProfilePercentage,
  setUserDesignation,
  setAuthToken,
  setUserIsProfileVerified,
  setUserId,
  setIsFresher,
  setUserWAConsent,
  setUserPhotoUrl,
  setUserRole,
  setUserEducation,
  setUserExperience,
  setUserMobile,
  setUserName,
  setUserLocation,
  setUserSkills,
  setCurrentLocation,
  setSaveMobileNumber,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
