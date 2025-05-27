import React, { useState, useEffect } from 'react';
import { Application } from '@/types';
import ApplicationCard from './ApplicationCard';
import { Spinner } from '@/components/ui';

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/applications');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Application[] = await response.json();
        setApplications(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Failed to fetch applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">Error loading applications: {error}</p>;
  }

  if (!applications || applications.length === 0) {
    return <p className="text-gray-500">No applications to display.</p>;
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationList;
