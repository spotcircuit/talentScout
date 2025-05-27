#!/bin/bash
set -e

# Check if schema.sql exists
if [ ! -f schema.sql ]; then
  echo "schema.sql not found!"
  exit 1
fi

# Check for Supabase environment variables
if [ -z "$SUPABASE_DB_HOST" ] || [ -z "$SUPABASE_DB_USER" ] || [ -z "$SUPABASE_DB_NAME" ] || [ -z "$SUPABASE_DB_PASSWORD" ]; then
  echo "Error: One or more SupABASE_DB environment variables are not set."
  echo "Please ensure SUPABASE_DB_HOST, SUPABASE_DB_USER, SUPABASE_DB_NAME, and SUPABASE_DB_PASSWORD are set."
  exit 1
fi

export PGPASSWORD="$SUPABASE_DB_PASSWORD"

echo "Attempting to apply schema to database $SUPABASE_DB_NAME on host $SUPABASE_DB_HOST as user $SUPABASE_DB_USER..."

psql -h "$SUPABASE_DB_HOST" -U "$SUPABASE_DB_USER" -d "$SUPABASE_DB_NAME" -f schema.sql

if [ $? -eq 0 ]; then
  echo "Schema applied successfully."
else
  echo "Error applying schema. Please check the output above."
  exit 1
fi

exit 0
