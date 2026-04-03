#!/bin/sh

set -eu

echo "1. Copy .env.example to .env and update the values if needed."
echo "2. Install dependencies with: pnpm install"
echo "3. Generate the Prisma client with: pnpm prisma:generate"
echo "4. Run the initial migration with: pnpm prisma:migrate"
echo "5. Seed the local database with: pnpm db:seed"
echo "6. Start the app with: pnpm dev"
