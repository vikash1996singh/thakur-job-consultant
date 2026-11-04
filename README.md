# Thakur Job Consultancy — Web Portal (React 2.0)

A comprehensive, responsive web-first recruitment portal built strictly in accordance with the **Thakur Job Consultancy Official Product Specification (Version 2.0)**.

---

## 🌟 Key Modules Implemented

### 1. 🌐 Public & Candidate Portal
- **Modern Hero Search:** Instant search by job title, skills, and city location with trending search chips.
- **Job Discovery & Multi-Filtering:** Filter by Work Mode (On-site, Hybrid, Remote), Experience (Fresher to 5+ yrs), Industry Category, and Listing Source.
- **Job Details & Application Routing:**
  - On-site direct application using verified resume with optional cover note and custom screening questions.
  - External application routing for enterprise partner portals.
  - Bookmark & Save Job feature.
- **Browser-Only Resume Center (PDF Page 8 Specification):**
  - No mobile app required.
  - PDF, DOC, DOCX up to 5 MB supported.
  - Real-time simulation of malware scanning & private encrypted storage.
- **Candidate Hub (Dashboard):**
  - Profile completion scoring meter.
  - Application status tracking with complete timeline (Submitted → Viewed → Shortlisted → Interview → Hired).
  - Saved jobs bookmarks and skills master.

### 2. 🏢 Employer & Recruiter Portal
- **Post a Job Form:** Complete multi-step vacancy creation with salary CTC, experience, responsibilities, screening questions, and application mode.
- **Manage Posted Jobs:** Status breakdown (Active, Pending Review, Closed).
- **Applicant Review Desk:** View applicant resumes, access tokens, and candidate details.

### 3. 🛡️ Admin Dashboard (Super Admin Console)
- **KPI Metrics:** Live vacancies, pending approval queue, total companies, uploaded resumes, and active applications.
- **Job Moderation Desk:** Review newly submitted employer vacancies, approve/publish to public search or reject.
- **Company Verification:** Audit employer credentials and grant official verified blue badges.
- **Candidate Privacy Audit:** Inspect access logs and consent statuses as per legal safeguards.

### 4. 🎨 Modern Theming System
- **1-Click Theme Switcher** built directly into the navbar:
  - **Royal Indigo** (Corporate tech recruiter look)
  - **Emerald Growth** (Fresh trust & career growth look)
  - **Midnight Pro** (Fintech / Executive dark aesthetic)

---

## 🚀 How to Run Locally

### Start Development Server:
```powershell
# Set Node into environment (if not in global path)
$env:PATH = "C:\Users\toxic\.gradle\nodejs\node-v26.2.0-win-x64;$env:PATH"
Set-Location -Path "D:\thakur-job-consultancy"

# Run Vite dev server
npm.cmd run dev
```

### Build for Production:
```powershell
npm.cmd run build
```
Output files will be generated in `D:\thakur-job-consultancy\dist\`.
