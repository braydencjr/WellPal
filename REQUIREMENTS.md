# WellPal - System Requirements & Dependencies

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **Node.js**: Version 18.17.0 or higher
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Browser**: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Recommended Setup
- **Node.js**: Version 20+ (LTS)
- **Package Manager**: pnpm (for better performance and disk usage)
- **RAM**: 8GB or more
- **Storage**: 1GB free space

## 📦 Dependencies Overview

### Core Framework Dependencies
```json
{
  "next": "15.2.4",           // React framework
  "react": "^18.3.1",         // Core React library  
  "react-dom": "^18.3.1",     // React DOM renderer
  "typescript": "^5"          // TypeScript support
}
```

### UI & Styling Dependencies
```json
{
  "tailwindcss": "^4.1.9",              // Utility-first CSS framework
  "tailwindcss-animate": "^1.0.7",      // Animation utilities
  "tailwind-merge": "^2.5.5",           // Tailwind class merging
  "class-variance-authority": "^0.7.1",  // Component variants
  "clsx": "^2.1.1",                     // Conditional className utility
  "lucide-react": "^0.454.0"            // Icon library
}
```

### Component Libraries
```json
{
  "@radix-ui/react-dialog": "1.1.4",
  "@radix-ui/react-switch": "^1.2.6", 
  "@radix-ui/react-select": "latest",
  "@radix-ui/react-label": "latest",
  "@radix-ui/react-checkbox": "latest",
  "@radix-ui/react-slot": "latest"
}
```

### Form & Validation
```json
{
  "react-hook-form": "^7.60.0",     // Form handling
  "@hookform/resolvers": "^3.10.0", // Form resolvers
  "zod": "3.25.67"                  // Schema validation
}
```

### Additional Features
```json
{
  "next-themes": "latest",           // Theme switching
  "date-fns": "4.1.0",              // Date utilities
  "recharts": "2.15.4",             // Chart library
  "sonner": "^1.7.4"                // Toast notifications
}
```

## 🛠️ Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4.1.9",
  "@types/node": "^22",
  "@types/react": "^19", 
  "@types/react-dom": "^19",
  "postcss": "^8.5",
  "tw-animate-css": "1.3.3"
}
```

## 🚀 Installation Methods

### Method 1: Automatic Setup (Recommended)

**For Windows:**
```bash
./setup.bat
```

**For macOS/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Method 2: Manual Installation

**Step 1:** Install Node.js
- Download from [nodejs.org](https://nodejs.org/)
- Choose version 18.17+ or higher

**Step 2:** Install pnpm (recommended)
```bash
npm install -g pnpm
```

**Step 3:** Clone and install
```bash
git clone https://github.com/braydencjr/WellPal.git
cd WellPal
pnpm install
```

**Step 4:** Start development server
```bash
pnpm dev
```

### Method 3: Using npm (if pnpm not available)
```bash
npm install
npm run dev
```

## 🔧 Environment Setup

### Node.js Version Management
If you have multiple Node.js versions, consider using:

**nvm (Node Version Manager):**
```bash
nvm install 20
nvm use 20
```

**On Windows:**
```bash
nvm install 20.0.0
nvm use 20.0.0
```

### Package Manager Comparison

| Feature | npm | pnpm | yarn |
|---------|-----|------|------|
| Install Speed | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Disk Usage | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Built-in | ✅ | ❌ | ❌ |
| Recommended for WellPal | ✅ | ⭐⭐⭐⭐⭐ | ✅ |

## 🚦 Troubleshooting Common Issues

### Issue: "Cannot find module"
**Solution:** Clear cache and reinstall
```bash
rm -rf node_modules
rm package-lock.json  # or pnpm-lock.yaml
npm install  # or pnpm install
```

### Issue: Port 3000 already in use
**Solution:** Use different port
```bash
npm run dev -- --port 3001
```

### Issue: Permission denied on setup.sh
**Solution:** Make script executable
```bash
chmod +x setup.sh
```

### Issue: Node.js version too old
**Solution:** Update Node.js
- Download latest LTS from [nodejs.org](https://nodejs.org/)
- Or use nvm to install/switch versions

## 📊 Build Requirements

### For Development:
- Node.js 18.17+
- 2-4GB RAM usage
- Fast internet for initial package download

### For Production Build:
- Node.js 18.17+
- 4-6GB RAM during build
- 100-200MB for built application

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Internet Explorer | Any | ❌ Not Supported |

## 📞 Getting Help

If you encounter issues with setup:

1. **Check this document** for common solutions
2. **Visit GitHub Issues**: [WellPal Issues](https://github.com/braydencjr/WellPal/issues)
3. **Create new issue** with:
   - Your operating system
   - Node.js version (`node --version`)
   - Error message (full stack trace)
   - Steps to reproduce
