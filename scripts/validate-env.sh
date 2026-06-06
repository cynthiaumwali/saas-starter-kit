#!/bin/bash

echo "Validating environment variables..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo ".env.local file not found"
  exit 1
fi

# Source environment variables
source .env.local

# Validate Supabase variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
  echo "NEXT_PUBLIC_SUPABASE_URL not set"
  exit 1
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
  echo "SUPABASE_SERVICE_ROLE_KEY not set"
  exit 1
fi

# Validate Stripe variables
if [ -z "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" ]; then
  echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set"
  exit 1
fi

if [ -z "$STRIPE_SECRET_KEY" ]; then
  echo "STRIPE_SECRET_KEY not set"
  exit 1
fi

echo "All environment variables are set correctly!"