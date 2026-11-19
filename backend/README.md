# 🐘 Thakur Job Consultancy — Enterprise Spring Boot + PostgreSQL Backend

Complete, high-performance, secure backend RESTful API built with **Spring Boot 3**, **Spring Security 6 (JWT)**, **Spring Data JPA**, and **PostgreSQL**.

---

## 🐘 PostgreSQL Configuration

Database configuration in [`src/main/resources/application.yml`](file:///D:/thakur-job-consultancy-backend/src/main/resources/application.yml):

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:thakur_jobs_db}?sslmode=prefer
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: update
```

### 1. Local PostgreSQL Setup (pgAdmin / psql):
1. Open pgAdmin or Terminal:
   ```sql
   CREATE DATABASE thakur_jobs_db;
   ```
2. Set your PostgreSQL password in `application.yml` (default is `postgres`):
   * Username: `postgres`
   * Password: `your_password`
   * Database: `thakur_jobs_db`
3. Optional: Agar aap manual schema run karna chahte hain, to ready-to-run SQL file available hai:
   👉 **[`src/main/resources/schema-postgresql.sql`](file:///D:/thakur-job-consultancy-backend/src/main/resources/schema-postgresql.sql)**

### 2. Free Cloud PostgreSQL (Supabase / Neon / Render / Railway):
Agar online live PostgreSQL use karna hai:
* Bas Environment variables pass karein:
  * `DB_HOST=ep-xyz.aws.neon.tech`
  * `DB_PORT=5432`
  * `DB_NAME=neondb`
  * `DB_USERNAME=xyz`
  * `DB_PASSWORD=secret`

---

## 🔑 Default Login Accounts (Pre-Seeded)

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@thakurconsultancy.in` | `admin@123` | Full Admin Dashboard, Job Moderation, Audit Logs, Verification |
| **Candidate** | `rahul.verma@example.com` | `password123` | Resume Upload, Apply to Jobs, Track Applications |
| **Employer** | `hr@company.com` | `password123` | Post Vacancies, Review Candidate Applications |

---

## 📡 REST API Endpoints Overview

### 1. 🔐 Authentication (`/api/auth`)
* `POST /api/auth/register` — Register Candidate or Employer
* `POST /api/auth/login` — Login & receive JWT Bearer token
* `POST /api/auth/admin-login` — Super Admin authentication
* `GET /api/auth/me` — Get currently logged-in user profile

### 2. 💼 Jobs Management (`/api/jobs`)
* `GET /api/jobs` — Browse & search jobs (Query params: `status`, `search`, `category`, `workMode`, `location`)
* `GET /api/jobs/{id}` — Get single job details
* `POST /api/jobs` — Create new job vacancy (Requires Auth)
* `PUT /api/jobs/{id}` — Update job vacancy details
* `PUT /api/jobs/{id}/status` — Update vacancy status (`active`, `pending`, `paused`, `closed`)
* `DELETE /api/jobs/{id}` — Delete job vacancy
* `GET /api/jobs/categories` — Master categories list
* `GET /api/jobs/locations` — Master locations list

### 3. 📝 Applications & ATS (`/api/applications`)
* `POST /api/applications` — Candidate apply for a job
* `POST /api/applications/public-apply` — Direct guest application
* `GET /api/applications/my` — Candidate view their own applications
* `GET /api/applications/job/{jobId}` — Employer view applicants for their job
* `PUT /api/applications/{id}/status` — Update status (`Submitted`, `Viewed`, `Shortlisted`, `Interview`, `Hired`, `Rejected`)
* `GET /api/applications/all` — Admin view all applications

### 4. 📄 Resume Center (`/api/resumes`)
* `POST /api/resumes/upload` — Upload resume file (Multipart form-data)
* `GET /api/resumes/my` — Get candidate resume & profile
* `PUT /api/resumes/profile` — Update candidate profile & skills
* `GET /api/resumes/all` — Admin inspect all uploaded resumes

### 5. 🏢 Companies (`/api/companies`)
* `GET /api/companies` — Get all companies
* `GET /api/companies/{id}` — Get company details
* `POST /api/companies` — Add new company
* `PUT /api/companies/{id}/verify` — Admin toggle verification blue badge

### 6. 🛡️ Admin Dashboard (`/api/admin`)
* `GET /api/admin/metrics` — KPI counts (live vacancies, pending queue, companies, etc.)
* `GET /api/admin/audit-logs` — Privacy and access audit logs
* `GET /api/admin/jobs/pending` — Get vacancies awaiting moderation
* `PUT /api/admin/jobs/{id}/approve` — Approve & publish job
* `PUT /api/admin/jobs/{id}/reject` — Reject job

### 7. ⚙️ Site Settings (`/api/settings`)
* `GET /api/settings` — Get public contact info, WhatsApp number, security notice
* `PUT /api/settings` — Admin update site settings

---

## 💻 How to Run

1. Make sure PostgreSQL service is running and database `thakur_jobs_db` exists:
   ```sql
   CREATE DATABASE thakur_jobs_db;
   ```
2. Run backend:
   ```powershell
   Set-Location -Path "D:\thakur-job-consultancy-backend"
   mvn spring-boot:run
   ```
   Or simply double-click **`run.bat`**!
