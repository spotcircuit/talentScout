export interface Company {
  id: string;
  name: string;
  description?: string;
  website?: string;
  contact_email?: string;
  hiring_status?: boolean;
}

export interface Talent {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  skills?: string[];
  experience_level?: string;
  linkedin_profile?: string;
  portfolio_url?: string;
  availability?: string;
}

export interface Job {
  id: string;
  company_id: string;
  title: string;
  description: string;
  location?: string;
  salary_range_min?: number;
  salary_range_max?: number;
  job_type?: string; // e.g., "Full-time", "Part-time", "Contract"
  is_active?: boolean;
}

export interface Application {
  id: string;
  talent_id: string;
  job_id: string;
  application_date?: string; // ISO date string
  status?: string; // e.g., "Submitted", "Reviewed", "Interviewing", "Offered", "Rejected"
}
