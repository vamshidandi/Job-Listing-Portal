<<<<<<< HEAD
# Job Portal

A full-stack job portal application built with Django REST Framework and React, enabling users to browse jobs, apply for positions, and track their applications.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication System Overview](#authentication-system-overview)
- [Screenshots](#screenshots)

## ✨ Features

### 🔐 User Authentication & Security
- **User Registration:**
  - Secure account creation with email validation
  - Password confirmation (minimum 8 characters)
  - Automatic password hashing with Django's PBKDF2

- **JWT Token-Based Login:**
  - Secure authentication with JSON Web Tokens (JWT)
  - Access tokens (valid for 1 day) and refresh tokens (valid for 7 days)
  - Tokens stored securely in browser localStorage
  - No CSRF vulnerabilities (tokens sent in Authorization headers)

- **User Logout:**
  - Client-side token removal
  - Automatic redirect to landing page

- **Protected Routes:**
  - Authentication required for job listings and applications
  - Automatic redirect to login for unauthenticated users
  - Loading states during authentication checks

- **Centralized Auth State:**
  - React Context API for global authentication state
  - Automatic token validation on app load
  - Bearer token authentication for all API requests

### 💼 Job Management
- **Browse Jobs:** View all available job listings
- **Job Details:** Comprehensive information including:
  - Job title and full description
  - Company name and location
  - Salary range
  - Posted date
  - Benefits and perks
  - Required skills and tags
- **Apply for Jobs:**
  - One-click application submission
  - Duplicate application prevention
  - Real-time application status updates

### 📊 Application Tracking
- **View Applications:** See all submitted job applications
- **Application Status:** Track application progress with statuses:
  - 🟡 Pending - Application under review
  - 🔵 Shortlisted - Selected for next round
  - 🟢 Accepted - Job offer received
  - 🔴 Rejected - Application declined
- **Application History:** View application dates and job details

### 🎨 User Interface
- **Landing Page:** Modern, animated homepage with features showcase
- **Responsive Design:** Mobile-first design using Tailwind CSS
- **User-friendly Navigation:**
  - Navbar with username display and avatar
  - Quick access to jobs, applications, and logout
- **Premium Aesthetics:**
  - Gradient backgrounds and glassmorphism effects
  - Smooth animations and transitions
  - Interactive hover effects

## 🛠️ Tech Stack

### Backend
- **Framework:** Django 5.1.5
- **API:** Django REST Framework 3.15.2
- **Database:** PostgreSQL
- **CORS:** django-cors-headers 4.6.0
- **Authentication:**
  - JWT (JSON Web Tokens) - djangorestframework-simplejwt 5.3.1
  - PyJWT 2.10.1 for token generation and validation
  - PBKDF2 password hashing
  - Token-based API authentication

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.3.1
- **Routing:** React Router DOM 7.13.0
- **State Management:** React Context API (Authentication)
- **Styling:** Tailwind CSS 4.1.18
- **HTTP Client:** Fetch API with Bearer token authentication

## 📁 Project Structure

```
JobListingPortal/
├── Backend/
│   ├── backend/
│   │   ├── __init__.py
│   │   ├── settings.py          # Django settings (CORS, JWT)
│   │   ├── urls.py               # URL routing
│   │   ├── wsgi.py
│   │   ├── asgi.py
│   │   ├── models.py             # Database models (Job, Application)
│   │   ├── views.py              # API views (auth, jobs, applications)
│   │   ├── serializers.py        # DRF serializers
│   │   ├── admin.py              # Django admin configuration
│   │   └── migrations/           # Database migrations
│   ├── .env                      # Environment variables (gitignored)
│   ├── .env.example              # Environment template
│   ├── .gitignore
│   ├── manage.py
│   ├── requirements.txt
│   └── run_server.bat
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app with AuthProvider & routing
│   │   ├── AuthContext.jsx       # Authentication context & state
│   │   ├── ProtectedRoute.jsx    # Route protection component
│   │   ├── LandingPage.jsx       # Homepage
│   │   ├── RegisterPage.jsx      # User registration
│   │   ├── LoginPage.jsx         # User login
│   │   ├── JoblistPage.jsx       # Job listings (protected)
│   │   ├── ApplyPage.jsx         # Job application (protected)
│   │   ├── ApplicationsPage.jsx  # User's applications (protected)
│   │   ├── App.css               # Global styles
│   │   └── main.jsx              # React entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── screenshots/                  # Application screenshots
├── SECURITY.md                   # Security configuration guide
└── README.md                     # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python:** 3.10 or higher
- **Node.js:** 18.0 or higher
- **npm:** 9.0 or higher
- **PostgreSQL:** 14.0 or higher
- **Git:** For version control

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd JobListingPortal
```

### 2. Backend Setup

#### Create and Activate Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Install Backend Dependencies

```bash
cd Backend
pip install -r requirements.txt
```

**Packages installed:**
- django - Web framework
- djangorestframework - REST API framework
- django-cors-headers - CORS support
- psycopg2-binary - PostgreSQL adapter
- djangorestframework-simplejwt - JWT authentication
- python-decouple - Environment variable management
- gunicorn - Production WSGI server
- whitenoise - Static file serving
- dj-database-url - Database URL parsing

#### Create PostgreSQL Database

```sql
-- Open PostgreSQL command line or pgAdmin
CREATE DATABASE jobportal_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE jobportal_db TO postgres;
```

#### Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

## ⚙️ Configuration

### 🔒 Security Configuration (IMPORTANT!)

⚠️ **Before deploying to production, you MUST configure environment variables for sensitive credentials!**

See [SECURITY.md](SECURITY.md) for detailed instructions.

#### Quick Setup:

1. Copy the environment template:
```bash
cd Backend
cp .env.example .env
```

2. Edit `Backend/.env` with your credentials:
```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database Settings
DB_NAME=jobportal_db
DB_USER=postgres
DB_PASSWORD=your-database-password
DB_HOST=localhost
DB_PORT=5432

# CORS Settings
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

⚠️ **NEVER commit the `.env` file to Git!** It's already in `.gitignore`.

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8000`. If you need to change this, update the API URLs in the component files.

## 🚀 Running the Application

### Start the Backend Server

**Option 1: Using the batch file (Recommended for Windows):**
```bash
cd Backend
.\run_server.bat
```

**Option 2: Using venv Python directly:**
```bash
# From the JobListingPortal directory
.\venv\Scripts\python.exe .\Backend\manage.py runserver
```

**Option 3: Activate venv first:**

**Windows:**
```bash
.\venv\Scripts\activate
cd Backend
python manage.py runserver
```

**macOS/Linux:**
```bash
source venv/bin/activate
cd Backend
python manage.py runserver
```

The Django server will start at **http://localhost:8000**

⚠️ **Important:** Always use the virtual environment Python to ensure JWT packages are available!

### Start the Frontend Development Server

Open a new terminal:

```bash
cd Frontend
npm run dev
```

The React app will start at **http://localhost:5173**

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend Admin:** http://localhost:8000/admin
- **API:** http://localhost:8000/

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register/` | Register a new user | No |
| POST | `/login/` | Login user and receive JWT tokens | No |
| POST | `/logout/` | Logout user | No |
| GET | `/user/` | Get current authenticated user info | Yes |

**Registration Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "password2": "securepass123",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Login Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepass123"
}
```

**Login Response (Success):**
```json
{
  "message": "Login successful",
  "user_id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Jobs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/jobs/` | Get all jobs | No |
| GET | `/jobs/{id}/` | Get specific job details | No |

### Applications

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/applications/{user_id}/` | Get user's applications | Yes |
| POST | `/apply/` | Submit a job application | Yes |

**Apply Request Body:**
```json
{
  "job": 1,
  "applicant": 2
}
```

**Authentication Header (for protected endpoints):**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

## 🗄️ Database Schema

### User Model (Django Built-in)
- `id`: Primary Key
- `username`: String (unique)
- `email`: Email
- `password`: Hashed password
- `first_name`: String
- `last_name`: String

### Job Model
- `id`: Primary Key
- `title`: String (max 200 chars)
- `About`: Text (nullable)
- `description`: Text
- `salary_range`: String (max 20 chars)
- `company`: String (max 100 chars)
- `location`: String (max 100 chars)
- `posted_at`: DateTime (auto)
- `created_by`: ForeignKey → User

### Application Model
- `id`: Primary Key
- `applicant`: ForeignKey → User
- `job`: ForeignKey → Job
- `status`: Choice field (pending, shortlisted, rejected, accepted)
- `applied_at`: DateTime (auto)

## 🔐 Authentication System Overview

### Architecture
The application uses a JWT (JSON Web Token) based authentication system combining Django REST Framework Simple JWT on the backend with React Context API on the frontend.

### Backend (Django)
- **Token Generation:** djangorestframework-simplejwt generates access and refresh tokens
- **Token Storage:** Tokens are stateless and stored client-side
- **Password Security:** PBKDF2 algorithm with SHA256 hash
- **Protected Endpoints:** `@permission_classes([IsAuthenticated])` decorator
- **CORS Configuration:** Allows requests from specific origins

### Frontend (React)
- **AuthContext:** Centralized authentication state using React Context API
- **Token Storage:** JWT tokens stored in browser localStorage
- **ProtectedRoute:** Component that guards routes requiring authentication
- **Automatic Token Validation:** Validates token on app load
- **Bearer Authentication:** Tokens sent in `Authorization: Bearer <token>` header

### Authentication Flow

1. **Registration:** User → RegisterPage → POST `/register/` → User created → Redirect to login
2. **Login:** User → LoginPage → POST `/login/` → JWT tokens generated → Stored in localStorage → Redirect to `/joblist`
3. **Protected Route Access:** User navigates → ProtectedRoute checks token → If valid, allow access → If invalid, redirect to `/login`
4. **Logout:** User clicks logout → Tokens removed from localStorage → Redirect to home

## 📸 Screenshots

### Landing Page
![Landing Page](screenshots/Landing-Page.png)

### Login Page
![Login Page](screenshots/Login-Screen.png)

### Register Page
![Register Page](screenshots/Register-Screen.png)

### Job Listings
![Job Listings](screenshots/Jobslist.png)

### Job Detail
![Job Detail](screenshots/Job-Detail.png)

### Application Tracking
![Applications](screenshots/Applied_Jobs.png)

## 🔧 Troubleshooting

### Authentication Issues

**Problem:** "Authentication required" error when applying for jobs

**Solution:**
1. Check if JWT tokens are stored in localStorage (DevTools → Application → Local Storage)
2. Verify token is being sent in requests (DevTools → Network → Check Authorization header)
3. Try logging out and logging back in

**Problem:** `ModuleNotFoundError: No module named 'rest_framework_simplejwt'`

**Solution:**
```bash
.\venv\Scripts\pip install djangorestframework-simplejwt
cd Backend
.\run_server.bat
```

### CORS Issues

**Problem:** CORS errors in browser console

**Solution:**
- Ensure frontend URL is in `CORS_ALLOWED_ORIGINS` in `.env`
- Check that both servers are running on correct ports

### Port Already in Use

- **Backend:** Change port with `python manage.py runserver 8001`
- **Frontend:** Vite will automatically suggest an alternative port

## 📝 Development Notes

### Common Commands

**Backend:**
```bash
python manage.py makemigrations  # Create migrations
python manage.py migrate         # Apply migrations
python manage.py createsuperuser # Create admin user
python manage.py runserver       # Start dev server
```

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

Harivarshan-UG | Django Developer

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- Tailwind CSS
- Vite build tool
=======
# Job-Listing-Portal
>>>>>>> 6a04add9a3dfe739117020ff50aedc5d319e5e84
