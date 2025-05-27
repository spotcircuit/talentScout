import React, { useState } from 'react';
import { Input, Textarea, Button, Spinner } from '@/components/ui';
import { Application } from '@/types';

interface ApplicationFormProps {
  onApplicationSubmitted?: (newApplication: Application) => void; // Optional callback
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onApplicationSubmitted }) => {
  const [talentId, setTalentId] = useState('');
  const [jobId, setJobId] = useState('');
  const [coverLetter, setCoverLetter] = useState(''); // Example additional field, not in current API
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    if (!talentId || !jobId) {
      setError("Talent ID and Job ID are required.");
      setIsSubmitting(false);
      return;
    }

    const applicationData = {
      talent_id: talentId,
      job_id: jobId,
      // cover_letter: coverLetter, // Include if your API supports this
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      const newApplication: Application = await response.json();
      setSuccessMessage(`Application submitted successfully! ID: ${newApplication.id}`);
      console.log('Application submitted:', newApplication);
      
      // Clear form
      setTalentId('');
      setJobId('');
      setCoverLetter('');

      if (onApplicationSubmitted) {
        onApplicationSubmitted(newApplication);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error('Failed to submit application:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Submit New Application</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{successMessage}</div>}

      <div>
        <label htmlFor="talentId" className="block text-sm font-medium text-gray-700 mb-1">
          Talent ID <span className="text-red-500">*</span>
        </label>
        <Input
          id="talentId"
          type="text"
          value={talentId}
          onChange={(e) => setTalentId(e.target.value)}
          placeholder="Enter your Talent ID"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-1">
          Job ID <span className="text-red-500">*</span>
        </label>
        <Input
          id="jobId"
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Enter the Job ID you are applying for"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
          Cover Letter (Optional)
        </label>
        <Textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          placeholder="Why are you a good fit for this role?"
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" /> : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
};

export default ApplicationForm;
