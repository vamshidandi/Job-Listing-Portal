# GitHub Repository Setup Guide

## 📋 Pre-Push Checklist

Before pushing to GitHub, ensure these files are properly configured:

### ✅ Files That SHOULD Be Committed:
- ✅ All source code (.py, .jsx, .js, .css files)
- ✅ Configuration files (settings.py, package.json, vite.config.js)
- ✅ .gitignore files (root, Backend, Frontend)
- ✅ .env.example (template without real credentials)
- ✅ README.md, SECURITY.md, PROJECT_FLOW.md
- ✅ requirements.txt, package-lock.json
- ✅ Screenshots folder

### ❌ Files That SHOULD NOT Be Committed:
- ❌ .env (contains SECRET_KEY and passwords)
- ❌ venv/ (virtual environment - 100+ MB)
- ❌ node_modules/ (dependencies - 200+ MB)
- ❌ db.sqlite3 (database with user data)
- ❌ media/ (uploaded resumes - privacy concern)
- ❌ __pycache__/ (Python cache files)
- ❌ dist/ (build output)
- ❌ *.log (log files)

---

## 🚀 Step-by-Step GitHub Setup

### Step 1: Verify .gitignore Files

Check that you have 3 .gitignore files:

1. **Root .gitignore** (JobListingPortal/.gitignore) ✅ Created
2. **Backend .gitignore** (Backend/.gitignore) ✅ Exists
3. **Frontend .gitignore** (Frontend/.gitignore) ✅ Exists

### Step 2: Initialize Git Repository

Open terminal in the JobListingPortal directory:

```bash
cd "c:\Users\MEDHA TRUST\Desktop\JobListingPortal"
git init
```

### Step 3: Verify .env is Ignored

**CRITICAL SECURITY CHECK:**

```bash
git status
```

**Look for .env in the output:**
- ❌ If you see `Backend/.env` in red/green → STOP! It will be committed!
- ✅ If you don't see `.env` anywhere → Good! It's properly ignored

**If .env appears, run:**
```bash
git rm --cached Backend/.env
```

### Step 4: Add Files to Git

```bash
git add .
```

### Step 5: Verify What Will Be Committed

```bash
git status
```

**Expected output (files in green):**
```
Backend/
  backend/
    __init__.py
    settings.py
    urls.py
    views.py
    models.py
    serializers.py
    admin.py
    migrations/
    management/
  .env.example
  .gitignore
  manage.py
  requirements.txt
  run_server.bat

Frontend/
  src/
    App.jsx
    AuthContext.jsx
    LoginPage.jsx
    RegisterPage.jsx
    JoblistPage.jsx
    ApplyPage.jsx
    ApplicationsPage.jsx
    ProtectedRoute.jsx
    App.css
    main.jsx
  public/
  index.html
  package.json
  package-lock.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  .gitignore

screenshots/
  (all .png files)

.gitignore
README.md
SECURITY.md
PROJECT_FLOW.md
GITHUB_SETUP.md
```

**Should NOT see:**
- ❌ venv/
- ❌ node_modules/
- ❌ .env
- ❌ db.sqlite3
- ❌ media/
- ❌ __pycache__/
- ❌ dist/

### Step 6: Create Initial Commit

```bash
git commit -m "Initial commit: Full-stack Job Portal with Django REST & React"
```

### Step 7: Create GitHub Repository

1. Go to https://github.com
2. Click "New repository" (green button)
3. Repository name: `JobListingPortal` or `job-portal-fullstack`
4. Description: "Full-stack job portal with Django REST Framework, React, JWT authentication, and resume upload"
5. **Keep it Public** (for portfolio) or Private (if you prefer)
6. **DO NOT** initialize with README (you already have one)
7. Click "Create repository"

### Step 8: Link Local Repository to GitHub

GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/JobListingPortal.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 9: Verify Upload

1. Refresh your GitHub repository page
2. Check that all files are uploaded
3. **CRITICAL:** Click on Backend folder → Verify `.env` is NOT there
4. Verify `.env.example` IS there

---

## 🔒 Security Verification

### Before Making Repository Public:

Run this command to check for sensitive data:

```bash
git log --all --full-history --source --find-object=.env
```

If it returns nothing → ✅ Safe!

### Check for Exposed Secrets:

```bash
git grep -i "SECRET_KEY"
git grep -i "password"
```

**Expected results:**
- ✅ Should only find references in .env.example (with placeholder values)
- ✅ Should find "password" in code (form fields, etc.) - that's fine
- ❌ Should NOT find actual SECRET_KEY or database passwords

---

## 📝 Repository Description & Tags

### Suggested Repository Description:
```
Full-stack job portal application with user authentication, job browsing, resume upload, and application tracking. Built with Django REST Framework, React, JWT authentication, and Tailwind CSS.
```

### Suggested Tags (Topics):
- django
- react
- django-rest-framework
- jwt-authentication
- full-stack
- job-portal
- tailwind-css
- vite
- postgresql
- python
- javascript

---

## 📄 Add Repository Badges (Optional)

Add these to the top of your README.md:

```markdown
![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![Django](https://img.shields.io/badge/Django-5.1.5-green.svg)
![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
```

---

## 🔄 Future Updates

### To Push New Changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

### Common Commit Messages:
- `"Add resume upload feature"`
- `"Fix authentication bug"`
- `"Update README with setup instructions"`
- `"Add company admin accounts"`
- `"Improve UI responsiveness"`

---

## 🌐 Portfolio Presentation

### Add to Your Portfolio:

**Project Title:** Job Portal - Full-Stack Web Application

**Live Demo:** (if deployed) or "Local Development"

**GitHub Link:** https://github.com/YOUR_USERNAME/JobListingPortal

**Tech Stack:**
- Backend: Django 5.1.5, Django REST Framework, JWT Authentication
- Frontend: React 19.2.0, Vite, Tailwind CSS
- Database: SQLite (dev) / PostgreSQL (production-ready)
- Features: User authentication, job browsing, resume upload, application tracking, admin panel

**Key Features:**
- 🔐 Secure JWT-based authentication
- 💼 Job listing and application system
- 📄 Resume upload with file handling
- 📊 Application status tracking
- 👨‍💼 Company admin dashboard with data isolation
- 🎨 Responsive UI with Tailwind CSS

---

## ⚠️ Important Notes

1. **Never commit .env file** - It contains sensitive credentials
2. **Always use .env.example** - Template for others to set up their environment
3. **Don't commit database** - Contains user data and is environment-specific
4. **Don't commit node_modules** - Can be reinstalled with `npm install`
5. **Don't commit venv** - Can be recreated with `pip install -r requirements.txt`
6. **Don't commit media files** - May contain private user data (resumes)

---

## 🆘 Troubleshooting

### Problem: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/JobListingPortal.git
```

### Problem: .env was accidentally committed
```bash
# Remove from Git but keep local file
git rm --cached Backend/.env
git commit -m "Remove .env from repository"
git push

# Then change all secrets in .env (SECRET_KEY, passwords)
```

### Problem: Repository too large
```bash
# Check repository size
git count-objects -vH

# If node_modules or venv were committed:
git rm -r --cached node_modules
git rm -r --cached venv
git commit -m "Remove large directories"
git push
```

---

## ✅ Final Checklist Before Push

- [ ] .env is in .gitignore
- [ ] .env.example exists with placeholder values
- [ ] venv/ is not being committed
- [ ] node_modules/ is not being committed
- [ ] db.sqlite3 is not being committed
- [ ] media/ is not being committed
- [ ] README.md is complete and accurate
- [ ] SECURITY.md explains environment setup
- [ ] PROJECT_FLOW.md documents architecture
- [ ] Screenshots are included
- [ ] All code is tested and working
- [ ] No hardcoded passwords or API keys in code

---

**Ready to push? Run the commands in Step 2-8 above!** 🚀
