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
    user_id?: string;
    role_id?: string;
    location_id?: string;
    }
    
export interface UserRole {
    role_id: string[];
    job_type_master_id: string[];
}
export interface Skill {
    id: string | string[];
    name: string;
    skill_level_type: string;
}
export interface UserSkillPayload {
    user_skill: Skill[];  // Now expecting an array of skills
}