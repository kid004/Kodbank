# Quick Push to GitHub

I've created two scripts to help you push your code to GitHub. Choose one method:

## Method 1: PowerShell Script (Recommended)

1. **Right-click** on `push-to-github.ps1` in your project folder
2. Select **"Run with PowerShell"**
3. If you get an execution policy error, run this first in PowerShell as Administrator:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
4. Then run the script again

## Method 2: Batch File (Easier)

1. **Double-click** `push-to-github.bat`
2. Follow the prompts
3. Enter your GitHub credentials when prompted

## Method 3: Manual Commands

Open PowerShell or Command Prompt in your project folder and run:

```bash
cd "c:\Users\Vishwas\OneDrive\Documents\Movies\kodbank"

# Remove lock files if they exist
Remove-Item -Force .git/config.lock -ErrorAction SilentlyContinue

# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Kodbank banking application with glassmorphic design"

# Add remote
git remote add origin https://github.com/kid004/Kodbank.git

# Push
git branch -M main
git push -u origin main
```

## Authentication

When pushing, GitHub will ask for credentials. You have two options:

### Option A: Personal Access Token (Recommended)
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Give it `repo` permissions
4. Copy the token
5. When prompted for password, paste the token instead

### Option B: GitHub CLI
```bash
# Install GitHub CLI first, then:
gh auth login
git push -u origin main
```

## Troubleshooting

**If you get "lock file" errors:**
- Close VS Code/Cursor
- Pause OneDrive sync temporarily
- Run the script again

**If you get authentication errors:**
- Use a Personal Access Token instead of password
- Or set up SSH keys

**If OneDrive is causing issues:**
- Consider moving the project outside OneDrive temporarily
- Or exclude `.git` folder from OneDrive sync

## After Pushing

Once pushed, your code will be available at:
**https://github.com/kid004/Kodbank**

You can verify by visiting the repository URL!
