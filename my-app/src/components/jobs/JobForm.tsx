import React, { useState } from 'react';
import { Input, Textarea, Button, Spinner } from '@/components/ui';
import { Job } from '@/types';

interface JobFormProps {
  onJobAdded?: (newJob: Job) => void; // Optional callback
}

const JobForm: React.FC<JobFormProps> = ({ onJobAdded }) => {
  const [title, setTitle] = useState('');
  const [companyId, setCompanyId] = useState(''); // Assuming you'll get this, e.g., from a dropdown or context
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [jobType, setJobType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Basic validation
    if (!title || !description || !companyId) {
        setError("Title, Description, and Company ID are required.");
        setIsSubmitting(false);
        return;
    }
    
    const jobData: Omit<Job, 'id' | 'posted_at' | 'is_active'> & { company_id: string } = {
      title,
      company_id: companyId, // Make sure this is provided, e.g. for a new job.
      description,
      location,
      salary_range_min: salaryMin ? parseInt(salaryMin, 10) : undefined,
      salary_range_max: salaryMax ? parseInt(salaryMax, 10) : undefined,
      job_type: jobType,
    };

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      const newJob: Job = await response.json();
      setSuccessMessage(`Job "${newJob.title}" posted successfully!`);
      console.log('Job posted:', newJob);
      
      // Clear form
      setTitle('');
      setCompanyId('');
      setDescription('');
      setLocation('');
      setSalaryMin('');
      setSalaryMax('');
      setJobType('');

      if (onJobAdded) {
        onJobAdded(newJob);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error('Failed to post job:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Post New Job</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{successMessage}</div>}

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
          Job Title <span className="text-red-500">*</span>
        </label>
        <Input
          id="jobTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Senior Software Engineer"
          required
          disabled={isSubmitting}
        />
      </div>
       <div>
        <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">
          Company ID <span className="text-red-500">*</span>
        </label>
        <Input
          id="companyId"
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          placeholder="Enter Company ID"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <Textarea
          id="jobDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the job role and responsibilities"
          rows={4}
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="jobLocation" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <Input
          id="jobLocation"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., San Francisco, CA or Remote"
          disabled={isSubmitting}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-1">
            Salary Min
          </label>
          <Input
            id="salaryMin"
            type="number"
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            placeholder="e.g., 80000"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-1">
            Salary Max
          </label>
          <Input
            id="salaryMax"
            type="number"
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
            placeholder="e.g., 120000"
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div>
        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <Input
          id="jobType"
          type="text"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          placeholder="e.g., Full-time, Part-time, Contract"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" /> : 'Post Job'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
