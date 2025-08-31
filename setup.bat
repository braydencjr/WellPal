@echo off
setlocal enabledelayedexpansion

echo 🌟 Welcome to WellPal - Mental Wellness Companion
echo =================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo ❌ Node.js is not installed.
    echo Please install Node.js version 18.17 or higher from: https://nodejs.org/
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js !NODE_VERSION! detected

REM Check if pnpm is available
pnpm --version >nul 2>&1
if !errorlevel! equ 0 (
    set PACKAGE_MANAGER=pnpm
    echo ✅ Using pnpm as package manager
) else (
    set PACKAGE_MANAGER=npm
    echo ℹ️  Using npm as package manager consider installing pnpm for better performance
)

echo.
echo 📦 Installing dependencies...
echo This may take a few minutes...
echo.

REM Install dependencies
if "!PACKAGE_MANAGER!"=="pnpm" (
    pnpm install
) else (
    npm install
)

REM Check if installation was successful
if !errorlevel! equ 0 (
    echo.
    echo 🎉 Installation completed successfully!
    echo.
    echo 🚀 To start the development server, run:
    if "!PACKAGE_MANAGER!"=="pnpm" (
        echo    pnpm dev
    ) else (
        echo    npm run dev
    )
    echo.
    echo 📱 Then open http://localhost:3000 in your browser
    echo.
    echo 📚 For more information, check the README.md file
    echo.
    echo 🆘 Need help? Visit the support page at /support or create an issue on GitHub
    echo.
    pause
) else (
    echo ❌ Installation failed. Please check the error messages above.
    pause
    exit /b 1
)
