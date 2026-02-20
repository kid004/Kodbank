# PowerShell script to push Kodbank to GitHub
# Run this script in PowerShell: .\push-to-github.ps1

Write-Host "🚀 Setting up Git and pushing to GitHub..." -ForegroundColor Cyan

# Navigate to project directory
Set-Location "c:\Users\Vishwas\OneDrive\Documents\Movies\kodbank"

# Remove any lock files
Write-Host "📝 Cleaning up any lock files..." -ForegroundColor Yellow
Remove-Item -Force .git/config.lock -ErrorAction SilentlyContinue
Remove-Item -Force .git/index.lock -ErrorAction SilentlyContinue

# Initialize git repository (if not already initialized)
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
}

# Configure git user (if not already configured)
Write-Host "⚙️  Configuring Git..." -ForegroundColor Yellow
git config user.name "kid004" 2>$null
git config user.email "your.email@example.com" 2>$null

# Add all files
Write-Host "➕ Adding files to Git..." -ForegroundColor Yellow
git add .

# Create initial commit
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Kodbank banking application with glassmorphic design" 2>$null

# Add remote repository
Write-Host "🔗 Adding GitHub remote..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/kid004/Kodbank.git

# Set main branch
Write-Host "🌿 Setting main branch..." -ForegroundColor Yellow
git branch -M main 2>$null

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  You may be prompted for GitHub credentials..." -ForegroundColor Red
git push -u origin main

Write-Host "✅ Done! Check your repository at: https://github.com/kid004/Kodbank" -ForegroundColor Green
