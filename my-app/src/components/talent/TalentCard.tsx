import React from 'react';
import { Talent } from '@/types';
import { Card } from '@/components/ui';

interface TalentCardProps {
  talent: Talent;
}

const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  return (
    <Card className="mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{talent.first_name} {talent.last_name}</h3>
      {talent.email && <p className="text-gray-600 mt-1">{talent.email}</p>}
      {talent.skills && talent.skills.length > 0 && (
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700">Skills:</h4>
          <ul className="list-disc list-inside pl-4">
            {talent.skills.map((skill, index) => (
              <li key={index} className="text-sm text-gray-600">{skill}</li>
            ))}
          </ul>
        </div>
      )}
      {talent.experience_level && <p className="text-sm text-gray-500 mt-1">Experience: {talent.experience_level}</p>}
      {talent.availability && <p className="text-sm text-gray-500 mt-1">Availability: {talent.availability}</p>}
      {talent.linkedin_profile && <p className="text-sm text-blue-500 hover:underline mt-1"><a href={talent.linkedin_profile} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
      {talent.portfolio_url && <p className="text-sm text-blue-500 hover:underline mt-1"><a href={talent.portfolio_url} target="_blank" rel="noopener noreferrer">Portfolio</a></p>}
    </Card>
  );
};

export default TalentCard;
