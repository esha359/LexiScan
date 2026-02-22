# 🚀 Deployment Guide — LexiScan (Table-Driven Lexical Analyzer)

## Step 1: Install Git
1. Download Git from: https://git-scm.com/download/win
2. Install it with default settings
3. **Restart your terminal/VS Code** after installing

## Step 2: Create a GitHub Repository
1. Go to https://github.com and sign in (or create an account)
2. Click the **"+"** button → **"New repository"**
3. Name it: `lexical-analyzer`
4. Keep it **Public**
5. Do NOT check "Add a README" (we already have code)
6. Click **"Create repository"**

## Step 3: Push Your Code to GitHub
Open a NEW terminal (after Git is installed) and run these commands one by one:

```bash
cd "c:\Users\yaser\lexical analyzer"
git init
git add .
git commit -m "Initial commit: Table-Driven Lexical Analyzer"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lexical-analyzer.git
git push -u origin main
```
> ⚠️ Replace `YOUR_USERNAME` with your actual GitHub username!

## Step 4: Deploy on Render.com (FREE)
1. Go to https://render.com and sign up with your **GitHub account**
2. Click **"New +"** → **"Web Service"**
3. Connect your **lexical-analyzer** GitHub repo
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `lexical-analyzer` |
| **Region** | Pick closest to you |
| **Branch** | `main` |
| **Build Command** | `cd frontend && npm install && npm run build && cd ../backend && npm install` |
| **Start Command** | `cd backend && node server.js` |
| **Plan** | **Free** |

5. Click **"Create Web Service"**
6. Wait 2-3 minutes for deployment
7. Your app will be live at: `https://lexical-analyzer.onrender.com` 🎉

## ⚠️ Important Notes
- The **free tier** on Render spins down after 15 mins of inactivity. First visit after inactivity takes ~30 seconds to load.
- The history (JSON file) resets on every deploy since Render uses ephemeral storage.
- Your app URL will be something like: `https://lexical-analyzer-XXXX.onrender.com`
