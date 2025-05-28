#!/bin/bash

# setup.sh for TalentScout Next.js application with OpenAI integration
# This script sets up the environment for OpenAI API usage

echo "Setting up TalentScout environment with OpenAI integration..."

# Install dependencies including OpenAI
echo "Installing dependencies and OpenAI SDK..."
npm install
npm install openai

# Create .env file for environment variables
echo "Creating environment variables file..."
cat > .env.local << EOL
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talentscout

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Apify
APIFY_API_TOKEN=your_apify_api_token

# Apollo GraphQL
APOLLO_KEY=optional_apollo_studio_api_key

# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Optional: LinkedIn API (if using)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Optional: Google API (if using for location services)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EOL

echo "⚠️ IMPORTANT: Update the .env.local file with your actual credentials before running the application"
echo "   Especially make sure to add your OPENAI_API_KEY"

echo "Setup complete! You can now run the application with 'npm run dev'"
