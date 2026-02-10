# Job Portal - Complete Project Flow & Architecture

## 🎯 Project Overview
A full-stack job portal where users can register, browse jobs, apply with resumes, and track applications. Company admins can manage jobs and review applications through Django admin panel.

---

## 🛠️ Technology Stack

### Backend
- **Framework**: Django 5.1.5 (Python web framework)
- **API**: Django REST Framework 3.15.2 (RESTful API)
- **Authentication**: djangorestframework-simplejwt 5.3.1 (JWT tokens)
- **Database**: SQLite (development) / PostgreSQL (production-ready)
- **CORS**: django-cors-headers 4.6.0 (cross-origin requests)
- **Security**: python-decouple (environment variables)

### Frontend
- **Framework**: React 19.2.0 (UI library)
- **Build Tool**: Vite 7.3.1 (fast bundler)
- **Routing**: React Router DOM 7.13.0 (client-side routing)
- **State Management**: React Context API (authentication state)
- **Styling**: Tailwind CSS 4.1.18 (utility-first CSS)
- **HTTP Client**: Fetch API (native browser API)

---

## 🗄️ Database Structure

### Database: SQLite (db.sqlite3)

### Tables (3 Main Tables):

#### 1. **auth_user** (Django built-in User table)
```
Columns:
- id (Primary Key)
- username (unique)
- email
- password (hashed with PBKDF2)
- first_name
- last_name
- is_staff (boolean - for admin access)
- is_superuser (boolean)
- date_joined
```

#### 2. **backend_job** (Custom Job table)
```
Columns:
- id (Primary Key)
- title (varchar 200)
- About (text, nullable)
- description (text)
- salary_range (varchar 20)
- company (varchar 100)
- location (varchar 100)
- posted_at (datetime, auto)
- created_by_id (Foreign Key → auth_user.id)
```

#### 3. **backend_application** (Custom Application table)
```
Columns:
- id (Primary Key)
- applicant_id (Foreign Key → auth_user.id)
- job_id (Foreign Key → backend_job.id)
- status (varchar - choices: pending/shortlisted/rejected/accepted)
- applied_at (datetime, auto)
- resume (file path)
- phone (varchar 15)
- linkedin (URL)
- cover_letter (text)
```

### Relationships:
- **One-to-Many**: User → Jobs (one user creates many jobs)
- **One-to-Many**: User → Applications (one user submits many applications)
- **One-to-Many**: Job → Applications (one job receives many applications)

---

## 🔄 Complete Application Flow

### **Phase 1: User Registration & Authentication**

#### Step 1: User Registration
```
User Action: Fills registration form
↓
Frontend: RegisterPage.jsx
↓
API Call: POST http://localhost:8000/register/
Request Body: {
  username, email, password, password2, first_name, last_name
}
↓
Backend: views.py → register_user()
- Validates passwords match
- Checks username uniqueness
- Hashes password with PBKDF2
- Creates User in auth_user table
↓
Response: { message: "User registered successfully" }
↓
Frontend: Redirects to /login
```

#### Step 2: User Login
```
User Action: Enters username & password
↓
Frontend: LoginPage.jsx
↓
API Call: POST http://localhost:8000/login/
Request Body: { username, password }
↓
Backend: views.py → login_user()
- Authenticates credentials
- Generates JWT tokens (access + refresh)
- Access token valid: 1 day
- Refresh token valid: 7 days
↓
Response: {
  message: "Login successful",
  user_id, username, email,
  access: "eyJ0eXAiOiJKV1Q...",
  refresh: "eyJ0eXAiOiJKV1Q..."
}
↓
Frontend: AuthContext.jsx
- Stores tokens in localStorage
- Sets user state globally
- Redirects to /joblist
```

---

### **Phase 2: Browsing Jobs**

#### Step 3: View Job Listings
```
User Action: Navigates to /joblist
↓
Frontend: ProtectedRoute.jsx
- Checks if access token exists in localStorage
- If no token → Redirect to /login
- If token exists → Allow access
↓
Frontend: JoblistPage.jsx (useEffect on mount)
↓
API Call: GET http://localhost:8000/jobs/
Headers: { Authorization: "Bearer <access_token>" }
↓
Backend: views.py → job_list()
- Queries all jobs from backend_job table
- Joins with auth_user to get creator info
↓
Response: [
  {
    id: 1,
    title: "Senior Python Developer",
    company: "Google",
    location: "Mountain View, CA",
    salary_range: "$150k-$200k",
    description: "...",
    posted_at: "2024-01-15T10:30:00Z"
  },
  ...
]
↓
Frontend: Displays job cards with Apply buttons
```

---

### **Phase 3: Applying for Jobs**

#### Step 4: View Job Details
```
User Action: Clicks "Apply Now" on a job
↓
Frontend: Navigates to /apply/:jobId
↓
Frontend: ApplyPage.jsx (useEffect on mount)
↓
API Call: GET http://localhost:8000/jobs/{jobId}/
Headers: { Authorization: "Bearer <access_token>" }
↓
Backend: views.py → job_detail()
- Queries specific job by ID from backend_job table
↓
Response: {
  id: 1,
  title: "Senior Python Developer",
  About: "Join our team...",
  description: "Full job description...",
  company: "Google",
  location: "Mountain View, CA",
  salary_range: "$150k-$200k",
  posted_at: "2024-01-15T10:30:00Z"
}
↓
Frontend: Displays full job details + application form
```

#### Step 5: Submit Application
```
User Action: Fills form (phone, LinkedIn, cover letter, uploads resume)
↓
Frontend: ApplyPage.jsx → handleApply()
- Creates FormData object (for file upload)
- Appends: job, applicant, phone, linkedin, cover_letter, resume
↓
API Call: POST http://localhost:8000/apply/
Headers: { Authorization: "Bearer <access_token>" }
Content-Type: multipart/form-data
Body: FormData {
  job: 1,
  applicant: 5,
  phone: "+1234567890",
  linkedin: "https://linkedin.com/in/johndoe",
  cover_letter: "I am excited to apply...",
  resume: File object
}
↓
Backend: views.py → apply_job()
- Validates user is authenticated
- Checks if already applied (prevents duplicates)
- Saves resume file to media/resumes/
- Creates Application in backend_application table
- Sets status = "pending"
↓
Response: {
  message: "Application submitted successfully",
  application_id: 42
}
↓
Frontend: Shows success message, redirects to /applications
```

---

### **Phase 4: Tracking Applications**

#### Step 6: View My Applications
```
User Action: Navigates to /applications
↓
Frontend: ApplicationsPage.jsx (useEffect on mount)
↓
API Call: GET http://localhost:8000/applications/{user_id}/
Headers: { Authorization: "Bearer <access_token>" }
↓
Backend: views.py → user_applications()
- Queries backend_application table
- Filters by applicant_id = current user
- Joins with backend_job to get job details
↓
Response: [
  {
    id: 42,
    job: {
      id: 1,
      title: "Senior Python Developer",
      company: "Google",
      location: "Mountain View, CA"
    },
    status: "pending",
    applied_at: "2024-01-20T14:30:00Z",
    phone: "+1234567890",
    linkedin: "https://linkedin.com/in/johndoe",
    resume: "http://localhost:8000/media/resumes/resume_42.pdf"
  },
  ...
]
↓
Frontend: Displays application cards with status badges
- 🟡 Pending
- 🔵 Shortlisted
- 🟢 Accepted
- 🔴 Rejected
```

---

### **Phase 5: Admin Management**

#### Step 7: Company Admin Login
```
Admin Action: Goes to http://localhost:8000/admin
↓
Django Admin Panel: Login with company credentials
Example: username="google_admin", password="Google@2024"
↓
Backend: Django authentication
- Checks is_staff = True
- Validates credentials
↓
Admin Dashboard: Shows Jobs and Applications sections
```

#### Step 8: Admin Views Applications
```
Admin Action: Clicks "Applications" in admin panel
↓
Backend: admin.py → ApplicationAdmin.get_queryset()
- Filters applications by admin's company
- Only shows applications for jobs created by this admin
↓
Admin Panel: Displays filtered applications with:
- Applicant name
- Job title
- Status dropdown (pending/shortlisted/rejected/accepted)
- Applied date
- Resume download link
- Phone, LinkedIn, Cover letter
```

#### Step 9: Admin Updates Application Status
```
Admin Action: Changes status from "pending" to "shortlisted"
↓
Backend: Django admin saves to backend_application table
- Updates status field
↓
Database: backend_application.status = "shortlisted"
↓
User Effect: When user refreshes /applications page
- Status badge changes from 🟡 Pending to 🔵 Shortlisted
```

---

## 📡 Complete API Endpoints Summary

### Authentication APIs (POST Requests)

| Endpoint | Method | Auth Required | Purpose | Request Body |
|----------|--------|---------------|---------|--------------|
| `/register/` | POST | No | Create new user | username, email, password, password2, first_name, last_name |
| `/login/` | POST | No | Get JWT tokens | username, password |
| `/logout/` | POST | No | Client-side token removal | None |

### Job APIs (GET Requests)

| Endpoint | Method | Auth Required | Purpose | Response |
|----------|--------|---------------|---------|----------|
| `/jobs/` | GET | Yes | Get all jobs | Array of job objects |
| `/jobs/{id}/` | GET | Yes | Get specific job | Single job object |

### Application APIs

| Endpoint | Method | Auth Required | Purpose | Request Body |
|----------|--------|---------------|---------|--------------|
| `/applications/{user_id}/` | GET | Yes | Get user's applications | None |
| `/apply/` | POST | Yes | Submit application | FormData: job, applicant, phone, linkedin, cover_letter, resume |

---

## 🔐 Authentication Flow Details

### JWT Token System

1. **Token Generation** (Login):
   - User logs in → Backend generates 2 tokens
   - **Access Token**: Short-lived (1 day), used for API requests
   - **Refresh Token**: Long-lived (7 days), used to get new access token

2. **Token Storage**:
   - Frontend stores both tokens in `localStorage`
   - Keys: `access_token`, `refresh_token`

3. **Token Usage**:
   - Every protected API call includes header:
   ```
   Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
   ```

4. **Token Validation**:
   - Backend verifies token signature
   - Checks expiration time
   - Extracts user_id from token payload

5. **Protected Routes**:
   - Frontend: `ProtectedRoute.jsx` checks token existence
   - Backend: `@permission_classes([IsAuthenticated])` decorator

---

## 🎨 Frontend Architecture

### Component Hierarchy
```
App.jsx (Root)
├── AuthProvider (Context)
│   └── BrowserRouter (Routing)
│       └── Routes
│           ├── LandingPage (/)
│           ├── RegisterPage (/register)
│           ├── LoginPage (/login)
│           └── ProtectedRoute (Auth Guard)
│               ├── JoblistPage (/joblist)
│               ├── ApplyPage (/apply/:jobId)
│               └── ApplicationsPage (/applications)
```

### State Management
- **Global State**: AuthContext.jsx
  - `user` object (id, username, email)
  - `login()` function
  - `logout()` function
  - Token management

- **Local State**: Component-level useState
  - Form inputs
  - Loading states
  - Error messages

---

## 🔄 Request/Response Cycle

### GET Request Example (Fetch Jobs)
```javascript
// Frontend: JoblistPage.jsx
fetch('http://localhost:8000/jobs/', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  }
})
.then(res => res.json())
.then(data => setJobs(data))
```

```python
# Backend: views.py
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)
```

### POST Request Example (Submit Application)
```javascript
// Frontend: ApplyPage.jsx
const formData = new FormData();
formData.append('job', jobId);
formData.append('applicant', userId);
formData.append('resume', resumeFile);

fetch('http://localhost:8000/apply/', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  },
  body: formData
})
```

```python
# Backend: views.py
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_job(request):
    serializer = ApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Application submitted'})
```

---

## 🚀 Deployment Architecture

### Development Environment
- **Backend**: `python manage.py runserver` → http://localhost:8000
- **Frontend**: `npm run dev` → http://localhost:5173
- **Database**: SQLite file (db.sqlite3)
- **Media Files**: Stored in `Backend/media/resumes/`

### Production-Ready Setup
- **Backend**: Gunicorn + Nginx
- **Frontend**: Build with `npm run build` → Static files
- **Database**: PostgreSQL
- **Media Files**: AWS S3 or cloud storage
- **HTTPS**: SSL certificates

---

## 📊 Data Flow Diagram

```
User Browser
    ↓ (HTTP Request)
React Frontend (localhost:5173)
    ↓ (Fetch API + JWT Token)
Django REST API (localhost:8000)
    ↓ (ORM Queries)
SQLite Database (db.sqlite3)
    ↓ (Query Results)
Django Serializers (JSON conversion)
    ↓ (JSON Response)
React Frontend (State Update)
    ↓ (Re-render)
User Browser (Updated UI)
```

---

## 🎤 Interview Talking Points

### 1. **Architecture**
"I built a full-stack job portal using Django REST Framework for the backend API and React for the frontend. The backend handles authentication, job management, and application processing, while React provides a responsive, single-page application experience."

### 2. **Authentication**
"I implemented JWT-based authentication using djangorestframework-simplejwt. When users log in, they receive access and refresh tokens stored in localStorage. Every API request includes the access token in the Authorization header for secure, stateless authentication."

### 3. **Database Design**
"The database has three main tables: Users (Django's built-in auth_user), Jobs, and Applications. I used foreign keys to establish relationships - each job is created by a user, and each application links a user to a job. This normalized structure prevents data duplication."

### 4. **File Upload**
"For resume uploads, I used Django's FileField with multipart/form-data. The frontend sends FormData objects, and Django saves files to the media directory. I configured MEDIA_URL and MEDIA_ROOT to serve uploaded files during development."

### 5. **API Design**
"I followed RESTful principles - GET requests for retrieving data (jobs, applications), POST for creating resources (registration, login, applications). All protected endpoints require JWT authentication, enforced by the IsAuthenticated permission class."

### 6. **Admin Panel**
"I customized Django's admin panel to create company-specific dashboards. Each company admin only sees their own jobs and applications through queryset filtering. This provides data isolation and role-based access control."

### 7. **Frontend State**
"I used React Context API for global authentication state, avoiding prop drilling. Protected routes check for valid tokens before rendering, automatically redirecting unauthenticated users to login."

### 8. **Security**
"I implemented multiple security measures: password hashing with PBKDF2, environment variables for sensitive data, CORS configuration for cross-origin requests, and JWT tokens to prevent CSRF attacks."

---

## 🔍 Common Interview Questions & Answers

**Q: Why JWT over session-based authentication?**
A: JWT is stateless, scalable, and works well with SPAs. No server-side session storage needed, tokens can be verified independently, and it's ideal for microservices architecture.

**Q: How do you prevent duplicate applications?**
A: In the apply_job view, I check if an application already exists for the user-job combination before creating a new one. The database also has a unique constraint on (applicant_id, job_id).

**Q: How does file upload work?**
A: The frontend creates a FormData object with the file, sends it as multipart/form-data. Django's FileField handles the upload, saves it to MEDIA_ROOT, and stores the file path in the database.

**Q: What happens when the access token expires?**
A: The frontend can use the refresh token to request a new access token from the `/api/token/refresh/` endpoint without requiring the user to log in again.

**Q: How do you handle CORS?**
A: I use django-cors-headers middleware, configuring CORS_ALLOWED_ORIGINS in settings.py to whitelist the React development server (localhost:5173).

---

## 📈 Future Enhancements

1. **Real-time Notifications**: WebSockets for application status updates
2. **Advanced Search**: Filter jobs by location, salary, skills
3. **Email Notifications**: Send emails when application status changes
4. **Resume Parsing**: Extract skills from uploaded resumes
5. **Company Profiles**: Dedicated pages for each company
6. **Application Analytics**: Dashboard for admins with charts
7. **Interview Scheduling**: Calendar integration for interviews
8. **Chat System**: Direct messaging between applicants and recruiters

---

## ✅ Project Completion Checklist

- [x] User registration and authentication
- [x] JWT token-based security
- [x] Job listing and details
- [x] Application submission with resume upload
- [x] Application tracking with status updates
- [x] Company admin panel with data isolation
- [x] Responsive UI with Tailwind CSS
- [x] Environment variable configuration
- [x] Database migrations
- [x] Sample data creation
- [x] Documentation (README, SECURITY, PROJECT_FLOW)

---

**Total Development Time**: ~40 hours
**Lines of Code**: ~2,500 (Backend: 1,200 | Frontend: 1,300)
**API Endpoints**: 7
**Database Tables**: 3 main + Django system tables
**Components**: 8 React components
