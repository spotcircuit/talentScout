import React, { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout';
import { TalentList, TalentForm } from '@/components/talent';
import { Button, Input, Select, Spinner } from '@/components/ui';
import { Talent } from '@/types';

const TalentPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All'); // 'All', 'Full-time', 'Part-time', 'Contract', 'Internship'
  const [allTalent, setAllTalent] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTalent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/talent');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Talent[] = await response.json();
      setAllTalent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error("Failed to fetch talent:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTalent();
  }, []);

  const handleTalentAdded = (newTalent: Talent) => {
    setAllTalent(prevTalent => [newTalent, ...prevTalent]);
    setShowForm(false);
  };

  const filteredTalent = useMemo(() => {
    return allTalent.filter(talent => {
      const nameMatch = `${talent.first_name} ${talent.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
      const skillsMatch = talent.skills && talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const availabilityMatch = availabilityFilter === 'All' || talent.availability === availabilityFilter;
      
      return (nameMatch || skillsMatch) && availabilityMatch;
    });
  }, [allTalent, searchTerm, availabilityFilter]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Talent</h1>
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            {showForm ? 'Cancel' : 'Add New Talent'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <TalentForm onTalentAdded={handleTalentAdded} />
          </div>
        )}

        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="searchTalent" className="block text-sm font-medium text-gray-700 mb-1">
                Search by Name or Skill
              </label>
              <Input
                id="searchTalent"
                type="text"
                placeholder="Enter name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="availabilityFilter" className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <Select
                id="availabilityFilter"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full"
              >
                <option value="All">All</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                {/* Add more specific availability options as needed */}
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-center">Error loading talent: {error}</p>
        ) : (
          <TalentList talents={filteredTalent} />
        )}
      </div>
    </MainLayout>
  );
};

export default TalentPage;
