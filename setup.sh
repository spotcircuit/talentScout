#!/bin/bash

# TalentScout Setup Script
# This script helps set up your TalentScout development environment
# with OpenAI Codex integration

# Color codes for output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo -e "${GREEN}Starting TalentScout setup with OpenAI Codex integration...${NC}"

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Check if .env.local exists, if not create it
if [ ! -f .env.local ]; then
  echo -e "${YELLOW}Creating .env.local file...${NC}"
  cp .env.example .env.local
  
  # Prompt for OpenAI API key
  echo -e "${YELLOW}Please enter your OpenAI API key for Codex integration:${NC}"
  read -p "API Key: " openai_key
  
  # Add OpenAI API key to .env.local
  echo "\nOPENAI_API_KEY=${openai_key}" >> .env.local
  
  echo -e "${GREEN}Created .env.local file with OpenAI API key.${NC}"
else
  echo -e "${GREEN}.env.local already exists.${NC}"
  
  # Check if OpenAI API key exists in .env.local
  if ! grep -q "OPENAI_API_KEY" .env.local; then
    echo -e "${YELLOW}Please enter your OpenAI API key for Codex integration:${NC}"
    read -p "API Key: " openai_key
    echo "\nOPENAI_API_KEY=${openai_key}" >> .env.local
    echo -e "${GREEN}Added OpenAI API key to .env.local${NC}"
  else
    echo -e "${GREEN}OpenAI API key already configured.${NC}"
  fi
fi

# Create Codex configuration file
echo -e "${YELLOW}Creating Codex configuration...${NC}"
cat > .codexrc << EOL
{
  "apiKey": "${openai_key}",
  "project": "talentscout",
  "model": "code-davinci-002",
  "temperature": 0.7,
  "maxTokens": 1000,
  "topP": 1,
  "frequencyPenalty": 0,
  "presencePenalty": 0
}
EOL
echo -e "${GREEN}Created .codexrc configuration file.${NC}"

echo -e "${GREEN}Setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Make sure your .env.local file has all required credentials"
echo -e "2. Run 'npm run dev' to start the development server"
echo -e "3. Open http://localhost:3000 in your browser"
echo -e "4. Use the OpenAI Codex integration for code assistance"

# Create .env.local file for environment variables
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
