interface JobSkill {
    id: string;
    industry_master_id: string;
    name: string;
    icon: string;
    icon2: string;
    status: string;
    order_no: string;
    created_date: string;
    created_by: string;
    updated_date: string;
    updated_by: string;
    is_custom: string;
    company_master_id: string;
    icon_type: string;
    skill_level: string;
}

interface JobBenefit {
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

interface JobLocation {
    id: string;
    company_job_id: string;
    job_location: string;
    job_location_city: string;
    latitude: string;
    longitude: string;
    is_admin_location_selected: string;
    status: string;
    created_date: string;
    created_by: string;
}

interface SupplementPayOffer {
    id: string;
    name: string;
    status: string;
    created_date: string;
    get_incentive_period: string;
}

interface JobQuestion {
    id: string;
    company_job_id: string;
    question: string;
    question_type: string;
    is_custom: string;
    status: string;
    show_job_question: string;
    created_date: string;
    created_by: string;
}

interface JobResult {
    id: string;
    company_master_id: string;
    job_title: string;
    department_master_id: string;
    profession_master_id: string;
    job_enrollment_type_id: string;
    job_location_type_master_id: string;
    min_exp: string;
    max_exp: string;
    is_exp_present: string;
    min_salary: string;
    max_salary: string;
    is_salary_present: string;
    salary_range_unit: string;
    is_industry_standard: string;
    job_location: string;
    interview_location_type_master_id: string;
    latitude: string;
    longitude: string;
    additional_info: string;
    interview_start_date: string;
    interview_end_date: string;
    status: string;
    created_date: string;
    created_by: string;
    share_url: string;
    job_duration_master_id: string;
    time_required_for_task: string;
    project_start_date: string;
    project_end_date: string;
    per_time_amount: string;
    advanced_amount: string;
    total_amount: string;
    no_of_positions_available: number;
    job_expiry: string;
    jd_type: string;
    jd_file: string;
    jd_audio: string;
    jd_url: string;
    is_job_deducted: string;
    job_posted_date: string;
    freshers_can_apply: string;
    applied_count: string;
    selected_count: string;
    shortlisted_count: string;
    count_last_updated_at: string;
    company_name: string;
    user_id: string;
    logo: string;
    company_location: string;
    job_type: string;
    education: string;
    skills: string;
    is_job_apply: string;
    saveJob_status: string;
    candidates_applied_for_job: string;
    candidates_applied: string;
    booked_interview_date: string;
    educationmaster_id: string;
    user_name: string;
    photo_url: string;
    skills_master_id: string;
    applied_job_date: string;
    weight: string;
    soft_skills: string;
    job_posted_by: string;
    is_short_listed: string;
    industry_name: string;
    company_description: string;
    company_emp_size: string;
    profile_matched: number;
    core_requirement: any[];
    jobs_skills: JobSkill[];
    job_benefits: JobBenefit[];
    jobs_location: JobLocation[];
    supplement_pay_offer: SupplementPayOffer[];
    jobs_questions: JobQuestion[];
    walk_in_interview: string;
}

interface ApiResponseJobDetail {
    code: number;
    result: JobResult[];
    msg: string;
    similar_jobs: CompanyJob[]
}
