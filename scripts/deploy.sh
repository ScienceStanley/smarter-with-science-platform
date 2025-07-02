#!/bin/bash

# SwS Platform Deployment Script
# Usage: ./scripts/deploy.sh [preview|production]

set -e

echo "🚀 Smarter With Science Platform Deployment"
echo "============================================"

# Check if build passes
echo "📦 Running build check..."
npm run build

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "   Commit them first for proper deployment tracking."
    git status --short
    echo ""
fi

# Deployment type
DEPLOY_TYPE=${1:-preview}

if [[ "$DEPLOY_TYPE" == "production" || "$DEPLOY_TYPE" == "prod" ]]; then
    echo "🌟 Deploying to PRODUCTION..."
    npx vercel --prod
elif [[ "$DEPLOY_TYPE" == "preview" ]]; then
    echo "🔍 Deploying PREVIEW..."
    npx vercel
else
    echo "❌ Invalid deployment type. Use 'preview' or 'production'"
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo "📝 Don't forget to test the deployed version"