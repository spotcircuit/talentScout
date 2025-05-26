'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, BuildingOfficeIcon, MapPinIcon, UsersIcon } from '@heroicons/react/24/outline';

// GraphQL query for companies
const SEARCH_COMPANIES = gql`
  query SearchCompanies($input: CompanySearchInput) {
    searchCompanies(input: $input) {
      companies {
        id
        name
        logo
        description
        industry
        headquarters
        companySize
        hiringStatus
        openPositions
        keyDecisionMakers {
          name
          title
        }
      }
      totalCount
      hasMore
    }
  }
`;

export default function CompaniesPage() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedHiringStatuses, setSelectedHiringStatuses] = useState<string[]>([]);
  
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  
  // Fetch companies data
  const { loading, error, data } = useQuery(SEARCH_COMPANIES, {
    variables: {
      input: {
        query: searchQuery,
        industries: selectedIndustries.length > 0 ? selectedIndustries : undefined,
        locations: selectedLocations.length > 0 ? selectedLocations : undefined,
        sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
        hiringStatuses: selectedHiringStatuses.length > 0 ? selectedHiringStatuses : undefined,
        limit,
        offset: (page - 1) * limit,
      },
    },
    // Skip the initial query when the page loads with no filters
    skip: false,
  });

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The query will automatically re-run when the variables change
  };

  // Mock data for initial development
  const mockCompanies = [
    {
      id: 'techstart',
      name: 'TechStart Inc.',
      logo: '/images/companies/techstart-logo.svg',
      description: 'Building the future of AI-powered recruitment tools for small businesses and startups.',
      industry: 'Technology',
      headquarters: 'San Francisco, CA',
      companySize: '11-50 employees',
      hiringStatus: 'Actively hiring',
      openPositions: 8,
      keyDecisionMakers: [
        { name: 'Sarah Chen', title: 'VP of Engineering' },
        { name: 'Michael Rodriguez', title: 'Head of Talent Acquisition' }
      ]
    },
    {
      id: 'healthinnovate',
      name: 'HealthInnovate',
      logo: '/images/companies/healthinnovate-logo.svg',
      description: 'Revolutionizing healthcare with AI-driven diagnostics and patient care solutions.',
      industry: 'Healthcare Technology',
      headquarters: 'Boston, MA',
      companySize: '101-500 employees',
      hiringStatus: 'Actively hiring',
      openPositions: 12,
      keyDecisionMakers: [
        { name: 'Dr. Emily Watson', title: 'Chief Medical Officer' },
        { name: 'Robert Kim', title: 'Director of HR' }
      ]
    },
    {
      id: 'edutech-labs',
      name: 'EduTech Labs',
      logo: '/images/companies/edutech-labs-logo.svg',
      description: 'Transforming education through innovative learning platforms and AI-powered personalization.',
      industry: 'Education Technology',
      headquarters: 'Chicago, IL',
      companySize: '51-200 employees',
      hiringStatus: 'Actively hiring',
      openPositions: 10,
      keyDecisionMakers: [
        { name: 'Maria Lopez', title: 'Chief Product Officer' },
        { name: 'David Thompson', title: 'Director of HR' }
      ]
    }
  ];

  // Industry options for filter
  const industryOptions = [
    'Technology',
    'Healthcare',
    'Education',
    'Finance',
    'Retail',
    'Manufacturing',
    'Energy',
    'Transportation',
    'Media',
    'Telecommunications'
  ];

  // Location options for filter
  const locationOptions = [
    'San Francisco, CA',
    'New York, NY',
    'Boston, MA',
    'Austin, TX',
    'Seattle, WA',
    'Chicago, IL',
    'Los Angeles, CA',
    'Denver, CO',
    'Atlanta, GA',
    'Remote'
  ];

  // Company size options for filter
  const sizeOptions = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1,000 employees',
    '1,001-5,000 employees',
    '5,001-10,000 employees',
    '10,001+ employees'
  ];

  // Hiring status options for filter
  const hiringStatusOptions = [
    'Actively hiring',
    'Selective hiring',
    'Hiring freeze',
    'Not currently hiring'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          <Link 
            href="/companies/add" 
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Add Company
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search companies by name, industry, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Industry filter */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedIndustries[0] || ''}
                  onChange={(e) => setSelectedIndustries(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Industries</option>
                  {industryOptions.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location filter */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedLocations[0] || ''}
                  onChange={(e) => setSelectedLocations(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Locations</option>
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Company size filter */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Size
                </label>
                <select
                  id="size"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedSizes[0] || ''}
                  onChange={(e) => setSelectedSizes(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Sizes</option>
                  {sizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hiring status filter */}
              <div>
                <label htmlFor="hiringStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Hiring Status
                </label>
                <select
                  id="hiringStatus"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedHiringStatuses[0] || ''}
                  onChange={(e) => setSelectedHiringStatuses(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Statuses</option>
                  {hiringStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Companies List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Error loading companies. Please try again later.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Use mock data for now, replace with data.searchCompanies.companies when API is ready
            mockCompanies.map((company) => (
              <div key={company.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <Link href={`/companies/${company.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-start">
                      {/* Company logo */}
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-16 w-16 relative rounded-md overflow-hidden border border-gray-200">
                          {company.logo ? (
                            <Image
                              src={company.logo}
                              alt={company.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                              <BuildingOfficeIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Company info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-gray-900">{company.name}</h2>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            company.hiringStatus === 'Actively hiring'
                              ? 'bg-green-100 text-green-800'
                              : company.hiringStatus === 'Selective hiring'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {company.hiringStatus}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{company.description}</p>
                        
                        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center">
                            <BuildingOfficeIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {company.industry}
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {company.headquarters}
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {company.companySize}
                          </div>
                          {company.openPositions > 0 && (
                            <div className="flex items-center font-medium text-primary-600">
                              {company.openPositions} open positions
                            </div>
                          )}
                        </div>

                        {/* Key decision makers */}
                        {company.keyDecisionMakers && company.keyDecisionMakers.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Decision Makers</h4>
                            <div className="flex flex-wrap gap-2">
                              {company.keyDecisionMakers.map((person, index) => (
                                <div key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-gray-100 text-gray-800">
                                  <span className="font-medium">{person.name}</span>
                                  <span className="mx-1">•</span>
                                  <span>{person.title}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}

          {/* Pagination */}
          {!loading && !error && (data?.searchCompanies?.totalCount > 0 || mockCompanies.length > 0) && (
            <div className="flex justify-between items-center pt-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{mockCompanies.length}</span> of{' '}
                <span className="font-medium">{data?.searchCompanies?.totalCount || mockCompanies.length}</span> results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    page === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!data?.searchCompanies?.hasMore}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    !data?.searchCompanies?.hasMore
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && !error && (!data?.searchCompanies?.companies || data.searchCompanies.companies.length === 0) && mockCompanies.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No companies found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
