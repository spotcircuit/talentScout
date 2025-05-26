'use client';

import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, UserIcon, MapPinIcon, BriefcaseIcon, ClockIcon } from '@heroicons/react/24/outline';

// GraphQL query for talents
const SEARCH_TALENTS = gql`
  query SearchTalents($input: TalentSearchInput) {
    searchTalents(input: $input) {
      talents {
        id
        name
        photo
        title
        location
        yearsOfExperience
        skills
        availability
        bio
        experience {
          company
          title
          startDate
          endDate
          current
        }
        education {
          institution
          degree
          field
        }
      }
      totalCount
      hasMore
    }
  }
`;

export default function TalentsPage() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>([]);
  
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;
  
  // Fetch talents data
  const { loading, error, data } = useQuery(SEARCH_TALENTS, {
    variables: {
      input: {
        query: searchQuery,
        skills: selectedSkills.length > 0 ? selectedSkills : undefined,
        locations: selectedLocations.length > 0 ? selectedLocations : undefined,
        experienceLevels: selectedExperienceLevels.length > 0 ? selectedExperienceLevels : undefined,
        availabilities: selectedAvailabilities.length > 0 ? selectedAvailabilities : undefined,
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
  const mockTalents = [
    {
      id: 'john-doe',
      name: 'John Doe',
      photo: null,
      title: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      yearsOfExperience: 8,
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'GraphQL'],
      availability: 'Available now',
      bio: 'Experienced software engineer with a focus on full-stack JavaScript development.',
      experience: [
        {
          company: 'Tech Innovators',
          title: 'Senior Software Engineer',
          startDate: '2020-01',
          endDate: null,
          current: true
        },
        {
          company: 'WebDev Solutions',
          title: 'Software Engineer',
          startDate: '2017-03',
          endDate: '2019-12',
          current: false
        }
      ],
      education: [
        {
          institution: 'Stanford University',
          degree: 'Master of Science',
          field: 'Computer Science'
        }
      ]
    },
    {
      id: 'jane-smith',
      name: 'Jane Smith',
      photo: null,
      title: 'UX/UI Designer',
      location: 'New York, NY',
      yearsOfExperience: 5,
      skills: ['UI Design', 'User Research', 'Figma', 'Adobe XD', 'Prototyping'],
      availability: 'Available in 2 weeks',
      bio: 'Creative designer passionate about creating intuitive and beautiful user experiences.',
      experience: [
        {
          company: 'Design Masters',
          title: 'Senior UX Designer',
          startDate: '2021-06',
          endDate: null,
          current: true
        },
        {
          company: 'Creative Solutions',
          title: 'UI Designer',
          startDate: '2018-09',
          endDate: '2021-05',
          current: false
        }
      ],
      education: [
        {
          institution: 'Rhode Island School of Design',
          degree: 'Bachelor of Fine Arts',
          field: 'Graphic Design'
        }
      ]
    },
    {
      id: 'michael-johnson',
      name: 'Michael Johnson',
      photo: null,
      title: 'Data Scientist',
      location: 'Boston, MA',
      yearsOfExperience: 6,
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis', 'SQL'],
      availability: 'Available in 1 month',
      bio: 'Data scientist with expertise in machine learning and predictive modeling.',
      experience: [
        {
          company: 'DataTech Analytics',
          title: 'Senior Data Scientist',
          startDate: '2019-04',
          endDate: null,
          current: true
        },
        {
          company: 'AI Solutions Inc.',
          title: 'Data Scientist',
          startDate: '2017-01',
          endDate: '2019-03',
          current: false
        }
      ],
      education: [
        {
          institution: 'MIT',
          degree: 'Ph.D.',
          field: 'Computer Science'
        }
      ]
    }
  ];

  // Skills options for filter
  const skillOptions = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'Machine Learning',
    'UI/UX Design',
    'Data Analysis',
    'Cloud Computing',
    'DevOps',
    'Mobile Development'
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

  // Experience level options for filter
  const experienceLevelOptions = [
    'Entry Level',
    'Mid Level',
    'Senior',
    'Expert'
  ];

  // Availability options for filter
  const availabilityOptions = [
    'Available now',
    'Available in 2 weeks',
    'Available in 1 month',
    'Available in 3 months'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Talent</h1>
          <Link 
            href="/talent/add" 
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Add Talent
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
                placeholder="Search talent by name, title, skills, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Skills filter */}
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <select
                  id="skills"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedSkills[0] || ''}
                  onChange={(e) => setSelectedSkills(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Skills</option>
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
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

              {/* Experience level filter */}
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedExperienceLevels[0] || ''}
                  onChange={(e) => setSelectedExperienceLevels(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Experience Levels</option>
                  {experienceLevelOptions.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability filter */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select
                  id="availability"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={selectedAvailabilities[0] || ''}
                  onChange={(e) => setSelectedAvailabilities(e.target.value ? [e.target.value] : [])}
                >
                  <option value="">All Availabilities</option>
                  {availabilityOptions.map((availability) => (
                    <option key={availability} value={availability}>
                      {availability}
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

        {/* Talents List */}
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
                    Error loading talents. Please try again later.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Use mock data for now, replace with data.searchTalents.talents when API is ready
            mockTalents.map((talent) => (
              <div key={talent.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <Link href={`/talent/${talent.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-start">
                      {/* Talent photo */}
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-16 w-16 relative rounded-full overflow-hidden border border-gray-200">
                          {talent.photo ? (
                            <Image
                              src={talent.photo}
                              alt={talent.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                              <UserIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Talent info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-gray-900">{talent.name}</h2>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            talent.availability === 'Available now'
                              ? 'bg-green-100 text-green-800'
                              : talent.availability === 'Available in 2 weeks'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {talent.availability}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-700">{talent.title}</p>
                        <p className="mt-1 text-sm text-gray-600">{talent.bio}</p>
                        
                        <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {talent.location}
                          </div>
                          <div className="flex items-center">
                            <BriefcaseIcon className="h-4 w-4 mr-1 text-gray-400" />
                            {talent.yearsOfExperience} years experience
                          </div>
                          {talent.experience && talent.experience.length > 0 && (
                            <div className="flex items-center">
                              <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                              Current: {talent.experience[0].company}
                            </div>
                          )}
                        </div>

                        {/* Skills */}
                        {talent.skills && talent.skills.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {talent.skills.map((skill, index) => (
                                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm bg-primary-50 text-primary-700 border border-primary-100">
                                  {skill}
                                </span>
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
          {!loading && !error && (data?.searchTalents?.totalCount > 0 || mockTalents.length > 0) && (
            <div className="flex justify-between items-center pt-6">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{mockTalents.length}</span> of{' '}
                <span className="font-medium">{data?.searchTalents?.totalCount || mockTalents.length}</span> results
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
                  disabled={!data?.searchTalents?.hasMore}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    !data?.searchTalents?.hasMore
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
          {!loading && !error && (!data?.searchTalents?.talents || data.searchTalents.talents.length === 0) && mockTalents.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No talents found</h3>
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
