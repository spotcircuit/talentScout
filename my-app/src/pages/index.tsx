import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to DevLink</h1>
        <p className="text-lg mb-8">
          Connecting talent with opportunities. Explore companies, find jobs, and showcase your skills.
        </p>
        <div className="space-x-4">
          <Link href="/companies" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-150">
            Browse Companies
          </Link>
          <Link href="/jobs" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-150">
            Find Jobs
          </Link>
          <Link href="/talent" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-150">
            Discover Talent
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
