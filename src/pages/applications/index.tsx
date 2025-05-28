import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { ApplicationList, ApplicationForm } from '@/components/applications';
import { Button } from '@/components/ui';

const ApplicationsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  // We might want to refresh the list after a new application is added
  const [refreshKey, setRefreshKey] = useState(0);

  const handleApplicationAdded = () => {
    setShowForm(false); // Optionally hide form after successful submission
    setRefreshKey(prevKey => prevKey + 1); // Trigger a re-fetch in ApplicationList if it depends on a key
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Job Applications</h1>
          <Button onClick={() => setShowForm(!showForm)} variant="primary">
            {showForm ? 'Cancel Application' : 'Submit New Application'}
          </Button>
        </div>
        {showForm && (
          <div className="mb-8">
            <ApplicationForm onApplicationSubmitted={handleApplicationAdded} />
          </div>
        )}
        {/* Pass refreshKey to ApplicationList if you implement a refresh mechanism there */}
        <ApplicationList key={refreshKey} /> 
      </div>
    </MainLayout>
  );
};

export default ApplicationsPage;
