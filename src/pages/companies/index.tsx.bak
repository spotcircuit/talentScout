import React, { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout';
import { CompanyList, CompanyForm } from '@/components/companies';
import { Button, Input, Select, Spinner } from '@/components/ui';
import { Company } from '@/types';

const CompaniesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hiringFilter, setHiringFilter] = useState('All'); // 'All', 'true', 'false'
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/companies');
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Company[] = await response.json();
      setAllCompanies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error("Failed to fetch companies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanyAdded = (newCompany: Company) => {
    setAllCompanies(prevCompanies => [newCompany, ...prevCompanies]); // Add to the top for immediate visibility
    setShowForm(false); // Hide form after successful submission
  };

  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(company => {
      const nameMatch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hiringMatch = hiringFilter === 'All' || String(company.hiring_status) === hiringFilter;
      return nameMatch && hiringMatch;
    });
  }, [allCompanies, searchTerm, hiringFilter]);

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Companies</h1>
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            {showForm ? 'Cancel' : 'Add New Company'}
          </Button>
        </div>

        {showForm && (
          <div className="mb-8 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <CompanyForm onCompanyAdded={handleCompanyAdded} />
          </div>
        )}

        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="searchCompanies" className="block text-sm font-medium text-gray-700 mb-1">
                Search by Name
              </label>
              <Input
                id="searchCompanies"
                type="text"
                placeholder="Enter company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="hiringStatus" className="block text-sm font-medium text-gray-700 mb-1">
                Hiring Status
              </label>
              <Select
                id="hiringStatus"
                value={hiringFilter}
                onChange={(e) => setHiringFilter(e.target.value)}
                className="w-full"
              >
                <option value="All">All Hiring Statuses</option>
                <option value="true">Actively Hiring</option>
                <option value="false">Not Hiring</option>
              </Select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500 text-center">Error loading companies: {error}</p>
        ) : (
          <CompanyList companies={filteredCompanies} />
        )}
      </div>
    </MainLayout>
  );
};

export default CompaniesPage;
