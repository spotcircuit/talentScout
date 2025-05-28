#!/bin/bash

# This script sets up the environment for using OpenAI Codex CLI with your project

# Check if OPENAI_API_KEY is already set
if [ -z "$OPENAI_API_KEY" ]; then
  echo "Please enter your OpenAI API key:"
  read -s api_key
  export OPENAI_API_KEY="$api_key"
  echo "OPENAI_API_KEY has been set for this session"
  
  # Add to .env.local for Next.js
  if [ -f .env.local ]; then
    # Check if OPENAI_API_KEY already exists in .env.local
    if grep -q "OPENAI_API_KEY" .env.local; then
      # Replace existing OPENAI_API_KEY
      sed -i "s/OPENAI_API_KEY=.*/OPENAI_API_KEY=$api_key/" .env.local
    else
      # Add OPENAI_API_KEY to .env.local
      echo "OPENAI_API_KEY=$api_key" >> .env.local
    fi
  else
    # Create .env.local with OPENAI_API_KEY
    echo "OPENAI_API_KEY=$api_key" > .env.local
  fi
  
  echo "OPENAI_API_KEY has been added to .env.local"
else
  echo "OPENAI_API_KEY is already set"
fi

# Start the development server
echo "Starting the development server..."
npm run dev
