@echo off
REM Batch script to push Kodbank to GitHub
REM Double-click this file or run: push-to-github.bat

echo 🚀 Setting up Git and pushing to GitHub...

cd /d "c:\Users\Vishwas\OneDrive\Documents\Movies\kodbank"

echo 📝 Cleaning up any lock files...
if exist .git\config.lock del /f .git\config.lock
if exist .git\index.lock del /f .git\index.lock

echo 📦 Initializing Git repository...
if not exist .git (
    git init
)

echo ⚙️  Configuring Git...
git config user.name "kid004" 2>nul
git config user.email "your.email@example.com" 2>nul

echo ➕ Adding files to Git...
git add .

echo 💾 Creating commit...
git commit -m "Initial commit: Kodbank banking application with glassmorphic design" 2>nul

echo 🔗 Adding GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/kid004/Kodbank.git

echo 🌿 Setting main branch...
git branch -M main 2>nul

echo ⬆️  Pushing to GitHub...
echo ⚠️  You may be prompted for GitHub credentials...
git push -u origin main

echo.
echo ✅ Done! Check your repository at: https://github.com/kid004/Kodbank
pause
