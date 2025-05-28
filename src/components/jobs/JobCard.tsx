import React from 'react';
import { Job } from '@/types'; // Assuming Company is also in @/types or a separate file
import { Card } from '@/components/ui';

interface JobCardProps {
  job: Job;
  // Optional: Pass companyName directly if you don't want to fetch it inside the card
  // companyName?: string; 
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // In a real app, you might fetch company details here if only company_id is available
  // For now, we'll assume company_id can be displayed or you'll pass companyName

  return (
    <Card className="mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
      {/* If you have company name directly or fetch it, display it here */}
      {/* For now, displaying company_id as a placeholder */}
      <p className="text-sm text-gray-600">Company ID: {job.company_id}</p>
      {job.location && <p className="text-gray-600 mt-1">Location: {job.location}</p>}
      {job.description && <p className="text-gray-700 mt-2">{job.description.substring(0, 100)}{job.description.length > 100 ? '...' : ''}</p>}
      {job.job_type && <p className="text-sm text-gray-500 mt-1">Type: {job.job_type}</p>}
      {job.salary_range_min && job.salary_range_max && (
        <p className="text-sm text-gray-500 mt-1">
          Salary: ${job.salary_range_min} - ${job.salary_range_max}
        </p>
      )}
      <p className={`text-sm mt-2 ${job.is_active ? 'text-green-600' : 'text-red-600'}`}>
        {job.is_active ? 'Active' : 'Inactive'}
      </p>
    </Card>
  );
};

export default JobCard;
