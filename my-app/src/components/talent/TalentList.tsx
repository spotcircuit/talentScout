import React from 'react';
import { Talent } from '@/types';
import TalentCard from './TalentCard';
// Spinner is no longer needed here as loading is handled by the page

interface TalentListProps {
  talents: Talent[];
}

const TalentList: React.FC<TalentListProps> = ({ talents }) => {
  // Loading and error handling are now done in the parent page component

  if (!talents || talents.length === 0) {
    return <p className="text-gray-500 text-center py-4">No talent profiles match your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {talents.map((talent) => (
        <TalentCard key={talent.id} talent={talent} />
      ))}
    </div>
  );
};

export default TalentList;
