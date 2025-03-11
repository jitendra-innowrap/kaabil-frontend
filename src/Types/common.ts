export interface optionType{
    label: string,
    value: string,
    disabled?: boolean
}
export interface User {
    email?: string;
    id?: string;
    is_profile_verify?: string;
    mobile?: string;
    name?: string;
    photo_url?: string;
    status?: string;
    job_type_master_id?: string[];
    skills?: Skill[];
    users_education?: string[];
    experience: object[];
    location_id?: string[];
    active_jobseeker?: number;
    available_job?: number;
    user_id?: string;
    role_id?: string[];
    current_location?: UserLocation | null;
    }
    // Define the user location interface
export interface UserLocation {
  city: string;
  user_city: string;
  city_latitude: number;
  city_longitude: number;
}
    
export interface UserRole {
    role_id: string[];
    job_type_master_id: string[];
}
export interface Skill {
    id: string;
    name: string;
    skill_level_type: string;
}
export interface UserSkillPayload {
    user_skill: Skill[];  // Now expecting an array of skills
}