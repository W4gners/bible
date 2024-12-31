#!/bin/bash

# Build the React application
npm run build

# Move the build files to Supabase's static folder
mv dist/* ./supabase/static/

# Deploy to Supabase
supabase deploy
