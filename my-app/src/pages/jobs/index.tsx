import React, { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout';
import { JobList, JobForm } from '@/components/jobs';
import { Button, Input, Select, Spinner } from '@/components/ui';
import { Job } from '@/types';

const JobsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('All'); // 'All', 'Full-time', 'Part-time', 'Contract'
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/jobs');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Job[] = await response.json();
      setAllJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error("Failed to fetch jobs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobAdded = (newJob: Job) => {
    setAllJobs(prevJobs => [newJob, ...prevJobs]);
    setShowForm(false);
  };

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const searchTermLower = searchTerm.toLowerCase();
      const titleMatch = job.title.toLowerCase().includes(searchTermLower);
      const descriptionMatch = job.description.toLowerCase().includes(searchTermLower);
      const jobTypeMatch = jobTypeFilter === 'All' || job.job_type === jobTypeFilter;
      
      return (titleMatch || descriptionMatch) && jobTypeMatch;
    });
  }, [allJobs, searchTerm, jobTypeFilter]);

  // Example job types, in a real app, these might come from a config or API
  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Job Postings</h1>
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            {showForm ? 'Cancel' : 'Post New Job'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <JobForm onJobAdded={handleJobAdded} />
          </div>
        )}

        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="searchJobs" className="block text-sm font-medium text-gray-700 mb-1">
                Search by Title or Description
              </label>
              <Input
                id="searchJobs"
                type="text"
                placeholder="Enter title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="jobTypeFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <Select
                id="jobTypeFilter"
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Job Types' : type}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-center">Error loading jobs: {error}</p>
        ) : (
          <JobList jobs={filteredJobs} />
        )}
      </div>
    </MainLayout>
  );
};

export default JobsPage;
