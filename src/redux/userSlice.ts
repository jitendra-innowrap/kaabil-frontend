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

// Define the user state interface
interface UserState {
  name?: string;
  number?: string;
  skills?: string[];
  type?: string;
  experiences?: Experience[];
}

// Initial state
const initialState: UserState = {
  name: undefined,
  number: undefined,
  skills: undefined,
  type: undefined,
  experiences: undefined,
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the user's name
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    // Update the user's number
    updateNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    },
    // Update the user's skills
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    // Update the user's type
    updateType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    // Update the user's experiences
    updateExperiences: (state, action: PayloadAction<Experience[]>) => {
      state.experiences = action.payload;
    },
    // Add a single experience
    addExperience: (state, action: PayloadAction<Experience>) => {
      if (!state.experiences) {
        state.experiences = [];
      }
      state.experiences.push(action.payload);
    },
    // Clear the user state
    signOut: (state) => {
      state.name = undefined;
      state.number = undefined;
      state.skills = undefined;
      state.type = undefined;
      state.experiences = undefined;
    },
  },
});

// Export actions
export const {
  updateName,
  updateNumber,
  updateSkills,
  updateType,
  updateExperiences,
  addExperience,
  signOut,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;