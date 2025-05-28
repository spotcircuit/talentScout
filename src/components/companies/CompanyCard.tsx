import React from 'react';
import { Company } from '@/types';
import { Card } from '@/components/ui';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
      {company.description && <p className="text-gray-600 mt-2">{company.description}</p>}
      {company.website && <p className="text-sm text-blue-500 hover:underline mt-1"><a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a></p>}
      {company.contact_email && <p className="text-sm text-gray-500 mt-1">{company.contact_email}</p>}
      <p className={`text-sm mt-2 ${company.hiring_status ? 'text-green-600' : 'text-red-600'}`}>
        {company.hiring_status ? 'Actively Hiring' : 'Not Currently Hiring'}
      </p>
    </Card>
  );
};

export default CompanyCard;
