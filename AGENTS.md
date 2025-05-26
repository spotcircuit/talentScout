# TalentScout Agent Guide

## Project Overview
TalentScout is a Next.js application that helps companies find talent and helps talent find jobs. The application uses MongoDB, GraphQL with Apollo, and Next.js with TypeScript and Tailwind CSS.

## Development Environment Setup
- Run `npm install` to install all dependencies
- Copy `.env.example` to `.env.local` and fill in the required variables
- Run `npm run dev` to start the development server

## Testing Instructions
- Run `npm run lint` to check for linting errors
- Run `npm run build` to ensure the application builds correctly

## Code Structure
- `/src` - Contains all source code
  - `/src/pages` - Next.js pages
  - `/src/components` - React components
  - `/src/lib` - Utility functions and libraries
  - `/src/graphql` - GraphQL schemas and resolvers
  - `/src/models` - MongoDB models

## Contribution Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clean, modular code
- Add appropriate comments and documentation

## PR Instructions
- Provide a clear title and description
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
