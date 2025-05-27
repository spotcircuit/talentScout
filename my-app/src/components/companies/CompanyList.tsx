import React from 'react';
import { Company } from '@/types';
import CompanyCard from './CompanyCard';
// Spinner is no longer needed here as loading is handled by the page
// import { Spinner } from '@/components/ui'; 

interface CompanyListProps {
  companies: Company[];
  // isLoading and error props are removed as the page component will handle this
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  // Loading and error handling are now done in the parent page component
  // if (isLoading) {
  //   return <Spinner />;
  // }

  // if (error) {
  //   return <p className="text-red-500">Error loading companies: {error}</p>;
  // }

  if (!companies || companies.length === 0) {
    return <p className="text-gray-500 text-center py-4">No companies match your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};

export default CompanyList;
