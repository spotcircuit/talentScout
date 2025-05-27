import React from 'react';
import { Application } from '@/types'; // Assuming Application type is defined
import { Card } from '@/components/ui';

interface ApplicationCardProps {
  application: Application;
  // You might want to pass talentName and jobTitle if you don't want to fetch them here
  // talentName?: string; 
  // jobTitle?: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  // In a real app, you might fetch Talent and Job details using IDs
  return (
    <Card className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Application ID: {application.id}</h3>
      <p className="text-gray-600 mt-1">Talent ID: {application.talent_id}</p>
      <p className="text-gray-600 mt-1">Job ID: {application.job_id}</p>
      {application.application_date && (
        <p className="text-sm text-gray-500 mt-1">
          Applied on: {new Date(application.application_date).toLocaleDateString()}
        </p>
      )}
      {application.status && (
        <p className="text-sm mt-2">
          Status: <span className="font-medium text-blue-600">{application.status}</span>
        </p>
      )}
    </Card>
  );
};

export default ApplicationCard;
