import React, { useState } from 'react';
import { Input, Button, Textarea } from '@/components/ui';
import { Company } from '@/types';

interface CompanyFormProps {
  onCompanyAdded?: (newCompany: Company) => void; // Optional callback
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onCompanyAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const companyData: Omit<Company, 'id'> = {
      name,
      description,
      website,
      contact_email: contactEmail,
      hiring_status: false, // Default value, or add a form field for this
    };

    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      const newCompany: Company = await response.json();
      setSuccessMessage(`Company "${newCompany.name}" added successfully!`);
      console.log('Company added:', newCompany);
      
      // Clear form
      setName('');
      setDescription('');
      setWebsite('');
      setContactEmail('');

      if (onCompanyAdded) {
        onCompanyAdded(newCompany);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error('Failed to add company:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Company</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{successMessage}</div>}

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="companyName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Innovatech Solutions"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <Textarea
          id="companyDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the company"
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <Input
          id="companyWebsite"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="e.g., https://innovatech.com"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email
        </label>
        <Input
          id="companyEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          placeholder="e.g., contact@innovatech.com"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" /> : 'Submit Company'}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;
