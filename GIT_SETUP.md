# Git & GitHub Setup Instructions

Follow these steps to push your Kodbank project to GitHub:

## Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
cd "c:\Users\Vishwas\OneDrive\Documents\Movies\kodbank"
git init
```

If you get a permission error, try:
```bash
# Remove any lock files if they exist
Remove-Item -Force .git/config.lock -ErrorAction SilentlyContinue
git init
```

## Step 2: Configure Git (if not already done)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Add All Files

```bash
git add .
```

## Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: Kodbank banking application with glassmorphic design"
```

## Step 5: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `kodbank` (or any name you prefer)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 6: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kodbank.git

# Or if you prefer SSH:
# git remote add origin git@github.com:YOUR_USERNAME/kodbank.git
```

## Step 7: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Set up SSH keys
- Use GitHub Desktop or GitHub CLI

## Alternative: Using GitHub Desktop

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select the kodbank folder
5. Click "Publish repository" button

## Important Notes

- The `.env` file is already in `.gitignore` - your database credentials won't be pushed
- `node_modules` folders are ignored - they'll be regenerated when others clone the repo
- Make sure to update `README.md` with your GitHub username/repo link after pushing

## Future Updates

After making changes, use:
```bash
git add .
git commit -m "Description of changes"
git push
```
