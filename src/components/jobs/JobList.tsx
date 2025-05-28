import React from 'react';
import { Job } from '@/types';
import JobCard from './JobCard';
// Spinner is no longer needed here as loading is handled by the page

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  // Loading and error handling are now done in the parent page component

  if (!jobs || jobs.length === 0) {
    return <p className="text-gray-500 text-center py-4">No jobs match your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
