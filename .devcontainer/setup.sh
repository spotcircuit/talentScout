#!/bin/bash

# setup.sh for TalentScout Next.js application
# This script sets up the environment for GitHub Codespaces

echo "Setting up TalentScout environment for online execution..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file for online environment
echo "Creating environment variables for online execution..."
cat > .env << EOL
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talentscout

# Authentication
NEXTAUTH_URL=https://localhost:3000
NEXTAUTH_SECRET=temporary_secret_for_codespaces_environment

# Apify
APIFY_API_TOKEN=your_apify_api_token

# Apollo GraphQL
APOLLO_KEY=

# Optional: LinkedIn API (if using)
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Optional: Google API (if using for location services)
GOOGLE_MAPS_API_KEY=
EOL

echo "⚠️ IMPORTANT: Update the .env file with your actual credentials before running the application"
echo "   This setup is configured for online execution in Codespaces and won't affect your local environment"

# Build the application for production
echo "Building the application..."
npm run build

echo "Setup complete! You can now run the application with 'npm start'"
echo "To run in development mode: 'npm run dev'"
echo "To run linting: 'npm run lint'"
echo "For GraphQL code generation: 'npm run codegen'"

# Add a note about port configuration
echo ""
echo "Note: The application will run on port 3000 by default"
echo "To change the port, you can use: PORT=8000 npm start"
