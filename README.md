# TalentScout

A comprehensive platform for searching and analyzing both talent and companies, powered by Apollo GraphQL and Apify.

## Project Overview

TalentScout is a dual-purpose application designed to help:
1. **Companies** find qualified talent for their open positions
2. **Recruiters** discover companies with hiring needs and partnership opportunities

The application features advanced search capabilities, detailed profiles, and data enrichment through web scraping and APIs.

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

## Tech Stack

- **Frontend**: Next.js 14+, React, Tailwind CSS
- **API**: Apollo GraphQL Server
- **Data Collection**: Apify for web scraping
- **Database**: MongoDB
- **Authentication**: NextAuth.js

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

## Project Structure

```
talentscout/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── api/         # API routes including GraphQL endpoint
│   │   ├── companies/   # Company search and profiles
│   │   ├── talent/      # Talent search and profiles
│   │   └── ...
│   ├── components/      # Reusable React components
│   ├── graphql/         # GraphQL schema, resolvers, and types
│   ├── lib/             # Utility functions and shared code
│   ├── models/          # Database models
│   └── services/        # Service layer (Apify integration, etc.)
├── .env.example         # Example environment variables
├── next.config.js       # Next.js configuration
└── package.json         # Project dependencies and scripts
```

## Development Roadmap

### Phase 1: Setup and Basic Functionality
- Project setup with Next.js, Apollo, and MongoDB
- Basic company and talent search interfaces
- Authentication system

### Phase 2: Data Collection and Enrichment
- Apify integration for web scraping
- Data enrichment from multiple sources
- Advanced filtering and search capabilities

### Phase 3: Advanced Features
- Matching algorithm between talent and companies
- Analytics dashboard
- Notification system

## Apollo and Apify Integration

### Apollo GraphQL
- The GraphQL API is accessible at `/api/graphql`
- Schema is defined in `src/graphql/schema.ts`
- Resolvers are organized by domain in `src/graphql/resolvers/`

### Apify Integration
- Apify actors are defined in `src/services/apify/`
- Web scraping tasks are scheduled and managed through the Apify SDK
- Data is processed and stored in MongoDB

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
