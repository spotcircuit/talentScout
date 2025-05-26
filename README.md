# TalentScout

A comprehensive platform for searching and analyzing both talent and companies, powered by Apollo GraphQL and Apify.

## Project Overview

TalentScout is a dual-purpose application designed to help:
1. **Companies** find qualified talent for their open positions
2. **Recruiters** discover companies with hiring needs and partnership opportunities

The application features advanced search capabilities, detailed profiles, and data enrichment through web scraping and APIs.

## Current Development Status

This project was initiated on May 26, 2025. The current implementation includes:

### Completed Features
- Basic project structure with Next.js, TypeScript, and Tailwind CSS
- Apollo GraphQL client and server setup
- MongoDB database connection configuration
- GraphQL schema definition for companies and talent
- Mock data for initial development
- Responsive navigation component
- Company search page with filters
- Talent search page with filters
- Apify integration for web scraping (configured but not yet implemented)

### In Progress
- Authentication system
- Company and talent detail pages
- Data fetching from external sources
- Form components for adding new companies and talent

### Planned Features
- Real-time data enrichment using Apify
- Advanced filtering and search capabilities
- Analytics dashboard
- Notification system
- Matching algorithm between talent and companies

## Features

### Company Search
- Search companies by industry, location, size, hiring status, and more
- View detailed company profiles with key decision makers
- Analyze hiring challenges and talent needs
- Track partnership opportunities

### Talent Search
- Search candidates by skills, experience, location, and availability
- View comprehensive talent profiles
- Track candidate interactions and status
- Match candidates to company needs

### Data Collection
- Integration with Apify for web scraping LinkedIn and other sources
- Automated data enrichment from multiple sources
- Periodic updates to keep information current

### User Interface
- Modern, responsive design using Tailwind CSS
- Interactive components with Headless UI
- Mobile-friendly layout
- Dark mode support (planned)

## Tech Stack

- **Frontend**: Next.js 14+, React, Tailwind CSS
- **API**: Apollo GraphQL Server
- **Data Collection**: Apify for web scraping
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom components
- **Icons**: Heroicons
- **State Management**: Apollo Client cache
- **Form Handling**: React Hook Form (planned)
- **Validation**: Zod (planned)
- **Testing**: Jest and React Testing Library (planned)

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn
- MongoDB (local or Atlas)
- Apify account (for web scraping capabilities)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/spotcircuit/talentScout.git
   cd talentscout
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required variables (API keys, database connection strings, etc.)

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Variables

The following environment variables are required:

```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talentscout

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Apify
APIFY_API_TOKEN=your_apify_api_token
```

### Database Setup

The application uses MongoDB for data storage. You can use a local MongoDB instance or MongoDB Atlas. The database schema is defined in the `src/models` directory.

### API Routes

The GraphQL API is accessible at `/api/graphql`. You can use the Apollo Client DevTools extension in your browser to explore the API.

## Project Structure

```
talentscout/
├── public/                       # Static assets
│   └── images/                   # Images including logos
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── api/                  # API routes
│   │   │   └── graphql/         # GraphQL API endpoint
│   │   ├── companies/           # Company search and profiles
│   │   ├── talent/              # Talent search and profiles
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable React components
│   │   └── providers/           # Context providers
│   ├── graphql/                 # GraphQL schema and resolvers
│   │   ├── resolvers/           # GraphQL resolvers
│   │   └── schema.ts            # GraphQL schema definition
│   ├── lib/                     # Utility functions
│   │   └── mongodb.ts           # MongoDB connection
│   ├── models/                  # Database models
│   │   ├── Company.ts           # Company model
│   │   └── Talent.ts            # Talent model
│   └── services/                # Service layer
│       └── apify/               # Apify integration
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore file
├── next.config.js               # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### Key Files and Their Purpose

- **src/app/layout.tsx**: Root layout with Apollo provider
- **src/app/api/graphql/route.ts**: GraphQL API endpoint
- **src/graphql/schema.ts**: GraphQL schema definition
- **src/models/Company.ts & Talent.ts**: MongoDB models
- **src/services/apify/index.ts**: Apify integration for web scraping

## Development Roadmap

### Phase 1: Setup and Basic Functionality (Current Phase)
- ✅ Project setup with Next.js, Apollo, and MongoDB
- ✅ Basic company and talent search interfaces
- ⏳ Authentication system
- ⏳ Company and talent detail pages
- ⏳ Form components for adding new data

### Phase 2: Data Collection and Enrichment
- ✅ Apify integration configuration
- ⏳ LinkedIn scraping implementation
- ⏳ Data enrichment from multiple sources
- ⏳ Advanced filtering and search capabilities

### Phase 3: Advanced Features
- ⏳ Matching algorithm between talent and companies
- ⏳ Analytics dashboard
- ⏳ Notification system
- ⏳ User permissions and roles

## Apollo and Apify Integration

### Apollo GraphQL
- The GraphQL API is accessible at `/api/graphql`
- Schema is defined in `src/graphql/schema.ts`
- Resolvers are organized by domain in `src/graphql/resolvers/`

### Apify Integration
- Apify actors are defined in `src/services/apify/`
- Web scraping tasks are scheduled and managed through the Apify SDK
- Data is processed and stored in MongoDB

## For AI Assistants Working on This Project

If you're an AI assistant helping with this project, here's what you need to know:

1. **Project Context**: This is a dual-purpose application for both talent search and company discovery, with a focus on B2B recruiting partnerships.

2. **Current Status**: The project is in early development with basic structure and mock data. We need to implement real data fetching, authentication, and detailed views.

3. **Priority Tasks**:
   - Implement the company and talent detail pages
   - Set up authentication with NextAuth.js
   - Implement the Apify scraping functionality
   - Create form components for adding new companies and talent

4. **Design Philosophy**: We're using a clean, professional design with Tailwind CSS. The UI should be intuitive and focused on helping recruiters find partnership opportunities.

5. **Data Structure**: The data models are defined in `src/models/` and the GraphQL schema in `src/graphql/schema.ts`. Follow these structures when implementing new features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
