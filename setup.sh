#!/bin/bash

# WellPal Setup Script
# This script automates the installation and setup process

echo "🌟 Welcome to WellPal - Mental Wellness Companion"
echo "================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed."
    echo "Please install Node.js (version 18.17 or higher) from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.17.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old."
    echo "Please upgrade to Node.js version $REQUIRED_VERSION or higher."
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Check if pnpm is available, if not use npm
if command -v pnpm &> /dev/null; then
    PACKAGE_MANAGER="pnpm"
    echo "✅ Using pnpm as package manager"
else
    PACKAGE_MANAGER="npm"
    echo "ℹ️  Using npm as package manager (consider installing pnpm for better performance)"
fi

echo ""
echo "📦 Installing dependencies..."
echo "This may take a few minutes..."

# Install dependencies
if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
    pnpm install
else
    npm install
fi

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Installation completed successfully!"
    echo ""
    echo "🚀 To start the development server, run:"
    if [ "$PACKAGE_MANAGER" = "pnpm" ]; then
        echo "   pnpm dev"
    else
        echo "   npm run dev"
    fi
    echo ""
    echo "📱 Then open http://localhost:3000 in your browser"
    echo ""
    echo "📚 For more information, check the README.md file"
    echo ""
    echo "🆘 Need help? Visit the support page at /support or create an issue on GitHub"
else
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
