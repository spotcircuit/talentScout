import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Company {
    id: ID!
    name: String!
    logo: String
    description: String
    website: String
    industry: String
    companySize: String
    founded: String
    headquarters: String
    specialities: String
    hiringStatus: String
    openPositions: Int
    about: String
    culture: String
    benefits: [String]
    techStack: [String]
    contact: ContactInfo
    keyDecisionMakers: [DecisionMaker]
    hiringChallenges: [String]
    growthStage: String
    fundingStatus: String
    hiringBudget: String
    hiringGoals: String
    hiringTimeline: String
    recruitingPartners: Boolean
    talentNeeds: [TalentNeed]
    hiringProcess: [String]
    previousRecruitingExperience: String
    preferredCommunicationChannel: String
    createdAt: String
    updatedAt: String
  }

  type ContactInfo {
    email: String
    phone: String
    linkedin: String
  }

  type DecisionMaker {
    name: String!
    title: String!
    email: String
    linkedin: String
  }

  type TalentNeed {
    role: String!
    count: Int
    priority: String
    skills: [String]
  }

  type Talent {
    id: ID!
    name: String!
    photo: String
    title: String
    location: String
    yearsOfExperience: Int
    skills: [String]
    availability: String
    bio: String
    experience: [Experience]
    education: [Education]
    certifications: [String]
    languages: [Language]
    portfolioUrl: String
    githubUrl: String
    linkedinUrl: String
    contactInfo: ContactInfo
    desiredRoles: [String]
    desiredSalary: String
    desiredLocations: [String]
    remotePreference: String
    createdAt: String
    updatedAt: String
  }

  type Experience {
    company: String!
    title: String!
    startDate: String!
    endDate: String
    current: Boolean
    description: String
    skills: [String]
  }

  type Education {
    institution: String!
    degree: String!
    field: String!
    startDate: String
    endDate: String
    current: Boolean
  }

  type Language {
    name: String!
    proficiency: String!
  }

  type CompanySearchResult {
    companies: [Company!]!
    totalCount: Int!
    hasMore: Boolean!
  }

  type TalentSearchResult {
    talents: [Talent!]!
    totalCount: Int!
    hasMore: Boolean!
  }

  input CompanySearchInput {
    query: String
    industries: [String]
    locations: [String]
    sizes: [String]
    hiringStatuses: [String]
    techStacks: [String]
    limit: Int
    offset: Int
  }

  input TalentSearchInput {
    query: String
    skills: [String]
    locations: [String]
    experienceLevels: [String]
    availabilities: [String]
    limit: Int
    offset: Int
  }

  type Query {
    # Company queries
    company(id: ID!): Company
    searchCompanies(input: CompanySearchInput): CompanySearchResult!
    
    # Talent queries
    talent(id: ID!): Talent
    searchTalents(input: TalentSearchInput): TalentSearchResult!
  }

  input CreateCompanyInput {
    name: String!
    logo: String
    description: String
    website: String
    industry: String
    companySize: String
    founded: String
    headquarters: String
    specialities: String
    hiringStatus: String
    openPositions: Int
    about: String
    culture: String
    benefits: [String]
    techStack: [String]
    contact: ContactInfoInput
    keyDecisionMakers: [DecisionMakerInput]
    hiringChallenges: [String]
    growthStage: String
    fundingStatus: String
    hiringBudget: String
    hiringGoals: String
    hiringTimeline: String
    recruitingPartners: Boolean
    talentNeeds: [TalentNeedInput]
    hiringProcess: [String]
    previousRecruitingExperience: String
    preferredCommunicationChannel: String
  }

  input ContactInfoInput {
    email: String
    phone: String
    linkedin: String
  }

  input DecisionMakerInput {
    name: String!
    title: String!
    email: String
    linkedin: String
  }

  input TalentNeedInput {
    role: String!
    count: Int
    priority: String
    skills: [String]
  }

  input CreateTalentInput {
    name: String!
    photo: String
    title: String
    location: String
    yearsOfExperience: Int
    skills: [String]
    availability: String
    bio: String
    experience: [ExperienceInput]
    education: [EducationInput]
    certifications: [String]
    languages: [LanguageInput]
    portfolioUrl: String
    githubUrl: String
    linkedinUrl: String
    contactInfo: ContactInfoInput
    desiredRoles: [String]
    desiredSalary: String
    desiredLocations: [String]
    remotePreference: String
  }

  input ExperienceInput {
    company: String!
    title: String!
    startDate: String!
    endDate: String
    current: Boolean
    description: String
    skills: [String]
  }

  input EducationInput {
    institution: String!
    degree: String!
    field: String!
    startDate: String
    endDate: String
    current: Boolean
  }

  input LanguageInput {
    name: String!
    proficiency: String!
  }

  type Mutation {
    # Company mutations
    createCompany(input: CreateCompanyInput!): Company!
    updateCompany(id: ID!, input: CreateCompanyInput!): Company!
    deleteCompany(id: ID!): Boolean!
    
    # Talent mutations
    createTalent(input: CreateTalentInput!): Talent!
    updateTalent(id: ID!, input: CreateTalentInput!): Talent!
    deleteTalent(id: ID!): Boolean!
  }
`;

export default typeDefs;
