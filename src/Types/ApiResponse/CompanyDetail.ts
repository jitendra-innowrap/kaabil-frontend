interface CompanyDetailResponse {
    code: number;
    result: Company[];
    job: (CompanyJob | CompanyJobCategory)[];
  }
  
  interface Company {
    id: string;
    company_master_id: string;
    job_distance: string;
    company_name: string;
    company_logo: string;
    whats_hot: string;
    company_location: string;
    company_description: string;
    company_emp_size: string;
    company_office: string;
    company_follow_status: string;
    industry_master_id: string;
    company_emp_range_id: string;
    share_url: string;
    applied_job_date: string;
    salary_range_unit: string;
    is_industry_standard: string;
    job_title: string;
    job_count: string;
    is_lead_capture: string;
    freshers_can_apply: string;
    company_image: CompanyImage[];
    company_videos: CompanyVideo[];
    benifits: Benefit[];
    connection_count: number;
    company_image_count: number;
    company_videos_count: number;
    benifits_count: number;
    makeCoverVideoUrl: string;
    makeCoverVideoThumbnail: string;
  }
  
  interface CompanyImage {
    id: string;
    company_master_id: string;
    media_type: string;
    media_url: string;
    media_thumbnail: string;
    video_title: string;
    is_cover_media: string;
    status: string;
    created_date: string;
    created_by: string;
    share_url: string;
  }
  
  interface CompanyVideo {
    id: string;
    company_master_id: string;
    media_type: string;
    media_url: string;
    media_thumbnail: string;
    video_title: string;
    is_cover_media: string;
    status: string;
    created_date: string;
    created_by: string;
    share_url: string;
  }
  // Props for the CompanyGalleryCard component
interface CompanyGalleryCardProps {
  item: CompanyImage | CompanyVideo;
  onClick: () => void;
}

  
  interface Benefit {
    id: string;
    name: string;
    status: string;
    is_approved: string;
    order_no: string;
    created_date: string;
    created_by: string;
    updated_date: string;
    updated_by: string;
    is_custom: string;
    company_master_id: string;
  }
  
  interface CompanyJob {
    id: string;
    company_master_id: string;
    job_distance: string;
    job_location: string;
    min_salary: string;
    max_salary: string;
    additional_info: string;
    job_created_date: string;
    is_job_apply: string;
    walk_in_interview: string;
    saveJob_status: string;
    booked_interview_date: string;
    education_master_id: string;
    min_exp: string;
    max_exp: string;
    skills_master_id: string;
    applied_job_date: string;
    weight: string;
    salary_range_unit: string;
    is_industry_standard: string;
    job_title: string;
    freshers_can_apply: string;
    row: string;
    company_job_slots: any[]; // Assuming it's an array of some unknown type
    jobs_questions: any[]; // Assuming it's an array of some unknown type
    jobs_location: any[]; // Assuming it's an array of some unknown type
    profile_matched_percentage?: number;
    perfect_match_percent: number;
    is_show_candidate_percent: number;
    jobs_skills: jobsSkills[]
  }
  
  interface jobsSkills{
    id: string;
    company_job_id: string;
    skill_level: string;
    name: string;
  }
  interface CompanyJobCategory {
    row: "job_category";
    data: JobCategoryData[];
  }
  
  interface JobCategoryData {
    job_distance: string;
    id: string;
    name: string;
    industry_master_id: string;
    job_category_count: number;
    company_master_id: string;
  }
  