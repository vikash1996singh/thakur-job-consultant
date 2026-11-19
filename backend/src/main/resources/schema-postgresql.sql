-- ====================================================================
-- THAKUR JOB CONSULTANCY — POSTGRESQL ENTERPRISE DATABASE SCHEMA & SEED
-- Database Name: thakur_jobs_db
-- ====================================================================

-- 1. Create Database (Run if database doesn't exist)
-- CREATE DATABASE thakur_jobs_db;
-- \c thakur_jobs_db;

-- 2. Drop existing tables if re-initializing
DROP TABLE IF EXISTS job_screening_questions CASCADE;
DROP TABLE IF EXISTS job_skills CASCADE;
DROP TABLE IF EXISTS job_responsibilities CASCADE;
DROP TABLE IF EXISTS candidate_skills CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS candidate_profiles CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 3. Users Table (Authentication & Role Management)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200),
    mobile VARCHAR(30),
    company_name VARCHAR(200),
    role VARCHAR(50) NOT NULL, -- ROLE_CANDIDATE, ROLE_EMPLOYER, ROLE_ADMIN
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Companies Table
CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    industry VARCHAR(150),
    location VARCHAR(200),
    verified BOOLEAN DEFAULT FALSE,
    logo VARCHAR(1000),
    open_jobs INT DEFAULT 0,
    description TEXT
);

-- 5. Jobs Table (Vacancies)
CREATE TABLE jobs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_id BIGINT,
    company VARCHAR(255) NOT NULL,
    verified_company BOOLEAN DEFAULT FALSE,
    location VARCHAR(200),
    work_mode VARCHAR(50), -- On-site, Hybrid, Remote
    job_type VARCHAR(50),  -- Full-Time, Part-Time, Contract
    experience VARCHAR(100),
    salary VARCHAR(100),
    category VARCHAR(100),
    source VARCHAR(100) DEFAULT 'Company Verified',
    source_type VARCHAR(50) DEFAULT 'company',
    apply_mode VARCHAR(50) DEFAULT 'onsite',
    external_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'active', -- active, pending, paused, closed
    openings INT DEFAULT 1,
    deadline VARCHAR(50),
    posted_date VARCHAR(50) DEFAULT 'Just now',
    description TEXT,
    education VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE job_responsibilities (
    job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
    responsibility TEXT
);

CREATE TABLE job_skills (
    job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
    skill VARCHAR(100)
);

CREATE TABLE job_screening_questions (
    job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
    question TEXT
);

-- 6. Candidate Profiles Table (Resume Center)
CREATE TABLE candidate_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE,
    ref_code VARCHAR(50),
    full_name VARCHAR(200),
    email VARCHAR(255),
    phone VARCHAR(30),
    headline VARCHAR(255),
    city VARCHAR(150),
    experience_years INT DEFAULT 0,
    resume_file_name VARCHAR(255),
    resume_file_url VARCHAR(500),
    resume_file_size VARCHAR(50),
    scan_status VARCHAR(50) DEFAULT 'Passed',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidate_skills (
    profile_id BIGINT REFERENCES candidate_profiles(id) ON DELETE CASCADE,
    skill VARCHAR(100)
);

-- 7. Job Applications Table (ATS Lifecycle)
CREATE TABLE job_applications (
    id BIGSERIAL PRIMARY KEY,
    job_id BIGINT NOT NULL,
    job_title VARCHAR(255),
    company_name VARCHAR(255),
    candidate_id BIGINT,
    candidate_name VARCHAR(200),
    candidate_email VARCHAR(255),
    candidate_phone VARCHAR(30),
    resume_file_name VARCHAR(255),
    resume_file_url VARCHAR(500),
    cover_note TEXT,
    screening_answers TEXT,
    status VARCHAR(50) DEFAULT 'Submitted', -- Submitted, Viewed, Shortlisted, Interview, Hired, Rejected
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Audit Logs Table (Candidate Privacy & Admin Logs)
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    actor_name VARCHAR(200),
    actor_role VARCHAR(50),
    action VARCHAR(100),
    target VARCHAR(255),
    ip_address VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Site Settings Table
CREATE TABLE site_settings (
    id BIGINT PRIMARY KEY,
    consultancy_name VARCHAR(200) DEFAULT 'Thakur Job Consultant',
    whatsapp_number VARCHAR(50) DEFAULT '+91 88522 49966',
    whatsapp_digits VARCHAR(50) DEFAULT '918852249966',
    email VARCHAR(255) DEFAULT 'info@thakurconsultancy.in',
    employer_email VARCHAR(255) DEFAULT 'employers@thakurconsultancy.in',
    office_address TEXT DEFAULT 'Sector 62, Electronic City, Noida, Uttar Pradesh - 201309',
    support_hours VARCHAR(200) DEFAULT 'Monday to Saturday: 9:30 AM to 6:30 PM IST',
    security_notice TEXT DEFAULT 'Thakur Job Consultant never charges any unofficial placement or registration fees from candidates. Always verify employer badges before attending offline interviews.',
    hero_tagline VARCHAR(200) DEFAULT '100% Free for Candidates'
);

-- ====================================================================
-- SEED INITIAL DATA
-- ====================================================================

-- Users: Passwords hashed with BCrypt
-- admin@123 => $2a$10$w8fA3jN5g5/X7E4J7qH1kOC4eC.4d1i8U1x4oU1x4oU1x4oU1x4o
-- password123 => $2a$10$w8fA3jN5g5/X7E4J7qH1kOC4eC.4d1i8U1x4oU1x4oU1x4oU1x4o
INSERT INTO users (email, password, first_name, last_name, full_name, mobile, company_name, role)
VALUES 
('admin@thakurconsultancy.in', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.', 'Super', 'Admin', 'Super Admin', '8852249966', 'Thakur Job Consultant', 'ROLE_ADMIN'),
('rahul.verma@example.com', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.', 'Rahul', 'Verma', 'Rahul Verma', '9876543210', NULL, 'ROLE_CANDIDATE'),
('hr@company.com', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.', 'Vikram', 'Thakur', 'Vikram Thakur', '9876500000', 'Thakur Corporate Solutions', 'ROLE_EMPLOYER');

-- Companies
INSERT INTO companies (name, website, industry, location, verified, logo, open_jobs, description)
VALUES 
('Tata Consultancy Services (TCS)', 'https://www.tcs.com', 'Information Technology', 'Noida / Delhi NCR', TRUE, 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60', 4, 'Global leader in IT services, consulting, and enterprise business solutions.'),
('HCL Technologies', 'https://www.hcltech.com', 'IT & Services', 'Noida, Sector 126', TRUE, 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=60', 2, 'Next-generation global technology company helping enterprises reimagine business.'),
('Apex Logistics India', 'https://apexlogistics.example.in', 'Supply Chain & Logistics', 'Gurugram, Haryana', TRUE, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=60', 3, 'Leading warehouse logistics and domestic freight services in North India.'),
('Thakur Corporate Services (Direct Placement)', 'https://thakurconsultancy.com', 'Recruitment & Staffing', 'Noida / Greater Noida', TRUE, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=60', 5, 'Official consultancy placement drives for manufacturing, finance, and operations roles.'),
('FinEdge Wealth Advisory', 'https://finedge.example.com', 'Banking & Financial Services', 'New Delhi (Connaught Place)', FALSE, 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=60', 1, 'Independent boutique wealth advisory and mutual fund distribution firm.');

-- Jobs
INSERT INTO jobs (title, company, verified_company, location, work_mode, job_type, experience, salary, category, source, apply_mode, status, openings, deadline, posted_date, description, education)
VALUES 
('Senior Full-Stack React & Spring Boot Developer', 'Tata Consultancy Services (TCS)', TRUE, 'Noida / Delhi NCR', 'Hybrid', 'Full-Time', '3 - 6 Years', '₹12,00,000 - ₹18,00,000 P.A.', 'IT Software', 'Company Verified', 'onsite', 'active', 3, '2026-12-15', '2 days ago', 'We are seeking an experienced Full Stack Engineer proficient with modern React.js, Spring Boot, and PostgreSQL to lead web product development.', 'B.Tech / B.E. / MCA in Computer Science or related field'),
('HR Executive / Talent Acquisition Associate', 'Thakur Corporate Services (Direct Placement)', TRUE, 'Noida, Sector 62', 'On-site', 'Full-Time', '1 - 3 Years', '₹3,50,000 - ₹5,00,000 P.A.', 'Human Resources', 'Consultancy Listed', 'onsite', 'active', 2, '2026-11-30', '1 day ago', 'Manage end-to-end recruitment lifecycle for manufacturing, retail, and corporate partner vacancies.', 'Graduate / MBA in HR preferred'),
('Supply Chain & Logistics Operations Officer', 'Apex Logistics India', TRUE, 'Gurugram, Haryana', 'On-site', 'Full-Time', '2 - 5 Years', '₹5,00,000 - ₹7,50,000 P.A.', 'Supply Chain & Logistics', 'Company Verified', 'onsite', 'active', 4, '2026-12-10', '3 days ago', 'Supervise warehouse inbound/outbound freight dispatch, vehicle routing, and inventory tracking.', 'Graduate in any stream');

-- Site Settings
INSERT INTO site_settings (id, consultancy_name, whatsapp_number, whatsapp_digits, email, employer_email, office_address, support_hours, security_notice, hero_tagline)
VALUES (1, 'Thakur Job Consultant', '+91 88522 49966', '918852249966', 'info@thakurconsultancy.in', 'employers@thakurconsultancy.in', 'Sector 62, Electronic City, Noida, Uttar Pradesh - 201309', 'Monday to Saturday: 9:30 AM to 6:30 PM IST', 'Thakur Job Consultant never charges any unofficial placement or registration fees from candidates. Always verify employer badges before attending offline interviews.', '100% Free for Candidates');
