import React, { useState } from 'react';
import { Input, Textarea, Button, Spinner } from '@/components/ui'; // Assuming ui components are exported
import { Talent } from '@/types';

interface TalentFormProps {
  onTalentAdded?: (newTalent: Talent) => void; // Optional callback
}

const TalentForm: React.FC<TalentFormProps> = ({ onTalentAdded }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState(''); // Simple comma-separated string
  const [experienceLevel, setExperienceLevel] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [availability, setAvailability] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const talentData: Omit<Talent, 'id'> = {
      first_name: firstName,
      last_name: lastName,
      email,
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill), // Ensure empty strings are not included
      experience_level: experienceLevel,
      linkedin_profile: linkedinProfile,
      portfolio_url: portfolioUrl,
      availability,
    };

    try {
      const response = await fetch('/api/talent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(talentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      const newTalent: Talent = await response.json();
      setSuccessMessage(`Talent profile for ${newTalent.first_name} ${newTalent.last_name} added successfully!`);
      console.log('Talent added:', newTalent);
      
      // Clear form
      setFirstName('');
      setLastName('');
      setEmail('');
      setSkills('');
      setExperienceLevel('');
      setLinkedinProfile('');
      setPortfolioUrl('');
      setAvailability('');

      if (onTalentAdded) {
        onTalentAdded(newTalent);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error('Failed to add talent:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add New Talent Profile</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
      {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{successMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="e.g., Jane"
            required
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="e.g., Doe"
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g., jane.doe@example.com"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
          Skills (comma-separated)
        </label>
        <Textarea
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g., React, Node.js, TypeScript"
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
          Experience Level
        </label>
        <Input
          id="experienceLevel"
          type="text"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          placeholder="e.g., Senior, Mid-level, Junior"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="linkedinProfile" className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn Profile URL
        </label>
        <Input
          id="linkedinProfile"
          type="url"
          value={linkedinProfile}
          onChange={(e) => setLinkedinProfile(e.target.value)}
          placeholder="e.g., https://linkedin.com/in/janedoe"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
          Portfolio URL
        </label>
        <Input
          id="portfolioUrl"
          type="url"
          value={portfolioUrl}
          onChange={(e) => setPortfolioUrl(e.target.value)}
          placeholder="e.g., https://janedoe.dev"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
          Availability
        </label>
        <Input
          id="availability"
          type="text"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeholder="e.g., Full-time, Part-time, Contract"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" /> : 'Submit Talent Profile'}
        </Button>
      </div>
    </form>
  );
};

export default TalentForm;
