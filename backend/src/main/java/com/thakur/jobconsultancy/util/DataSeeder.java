package com.thakur.jobconsultancy.util;

import com.thakur.jobconsultancy.entity.*;
import com.thakur.jobconsultancy.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CandidateProfileRepository profileRepository;

    @Autowired
    private SiteSettingsRepository settingsRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedCompanies();
        seedJobs();
        seedSettings();
        seedAuditLogs();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            // 1. Super Admin
            User admin = new User(
                    "admin@thakurconsultancy.in",
                    passwordEncoder.encode("admin@123"),
                    "Super",
                    "Admin",
                    "8852249966",
                    "Thakur Job Consultant",
                    Role.ROLE_ADMIN
            );
            userRepository.save(admin);

            // 2. Default Candidate
            User candidate = new User(
                    "rahul.verma@example.com",
                    passwordEncoder.encode("password123"),
                    "Rahul",
                    "Verma",
                    "9876543210",
                    null,
                    Role.ROLE_CANDIDATE
            );
            User savedCand = userRepository.save(candidate);

            // 3. Candidate Profile
            CandidateProfile cp = new CandidateProfile();
            cp.setUserId(savedCand.getId());
            cp.setRefCode("TK-CV-2026-0001");
            cp.setFullName("Rahul Verma");
            cp.setEmail("rahul.verma@example.com");
            cp.setPhone("9876543210");
            cp.setHeadline("Software Developer | React & Spring Boot");
            cp.setCity("Noida / Delhi NCR");
            cp.setExperienceYears(3);
            cp.setSkills(Arrays.asList("Java", "Spring Boot", "React.js", "MySQL", "REST APIs"));
            cp.setResumeFileName("Rahul_Verma_Resume_2026.pdf");
            cp.setResumeFileUrl("/uploads/resumes/Rahul_Verma_Resume_2026.pdf");
            cp.setResumeFileSize("1.4 MB");
            cp.setScanStatus("Passed");
            profileRepository.save(cp);

            // 4. Default Employer
            User employer = new User(
                    "hr@company.com",
                    passwordEncoder.encode("password123"),
                    "Vikram",
                    "Thakur",
                    "9876500000",
                    "Thakur Corporate Solutions",
                    Role.ROLE_EMPLOYER
            );
            userRepository.save(employer);
        }
    }

    private void seedCompanies() {
        if (companyRepository.count() == 0) {
            companyRepository.save(new Company(
                    "Tata Consultancy Services (TCS)",
                    "https://www.tcs.com",
                    "Information Technology",
                    "Noida / Delhi NCR",
                    true,
                    "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=60",
                    4,
                    "Global leader in IT services, consulting, and enterprise business solutions."
            ));

            companyRepository.save(new Company(
                    "HCL Technologies",
                    "https://www.hcltech.com",
                    "IT & Services",
                    "Noida, Sector 126",
                    true,
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=60",
                    2,
                    "Next-generation global technology company helping enterprises reimagine business."
            ));

            companyRepository.save(new Company(
                    "Apex Logistics India",
                    "https://apexlogistics.example.in",
                    "Supply Chain & Logistics",
                    "Gurugram, Haryana",
                    true,
                    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop&q=60",
                    3,
                    "Leading warehouse logistics and domestic freight services in North India."
            ));

            companyRepository.save(new Company(
                    "Thakur Corporate Services (Direct Placement)",
                    "https://thakurconsultancy.com",
                    "Recruitment & Staffing",
                    "Noida / Greater Noida",
                    true,
                    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&auto=format&fit=crop&q=60",
                    5,
                    "Official consultancy placement drives for manufacturing, finance, and operations roles."
            ));

            companyRepository.save(new Company(
                    "FinEdge Wealth Advisory",
                    "https://finedge.example.com",
                    "Banking & Financial Services",
                    "New Delhi (Connaught Place)",
                    false,
                    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=60",
                    1,
                    "Independent boutique wealth advisory and mutual fund distribution firm."
            ));
        }
    }

    private void seedJobs() {
        if (jobRepository.count() == 0) {
            Job job1 = new Job();
            job1.setTitle("Senior Full-Stack React & Spring Boot Developer");
            job1.setCompany("Tata Consultancy Services (TCS)");
            job1.setVerifiedCompany(true);
            job1.setLocation("Noida / Delhi NCR");
            job1.setWorkMode("Hybrid");
            job1.setJobType("Full-Time");
            job1.setExperience("3 - 6 Years");
            job1.setSalary("₹12,00,000 - ₹18,00,000 P.A.");
            job1.setCategory("IT Software");
            job1.setSource("Company Verified");
            job1.setApplyMode("onsite");
            job1.setStatus("active");
            job1.setOpenings(3);
            job1.setDeadline("2026-12-15");
            job1.setPostedDate("2 days ago");
            job1.setDescription("We are seeking an experienced Full Stack Engineer proficient with modern React.js, Spring Boot, and PostgreSQL to lead web product development.");
            job1.setResponsibilities(Arrays.asList(
                    "Architect and build high-performance, responsive React web applications",
                    "Design robust REST APIs with Spring Security and manage database schemas",
                    "Collaborate with product managers and UX designers to refine features",
                    "Conduct peer code reviews and ensure high code quality"
            ));
            job1.setSkills(Arrays.asList("React.js", "Spring Boot", "Java", "Tailwind CSS", "PostgreSQL", "REST APIs"));
            job1.setEducation("B.Tech / B.E. / MCA in Computer Science or related field");
            job1.setScreeningQuestions(Arrays.asList(
                    "How many years of hands-on Spring Boot experience do you have?",
                    "What is your current notice period?"
            ));
            jobRepository.save(job1);

            Job job2 = new Job();
            job2.setTitle("HR Executive / Talent Acquisition Associate");
            job2.setCompany("Thakur Corporate Services (Direct Placement)");
            job2.setVerifiedCompany(true);
            job2.setLocation("Noida, Sector 62");
            job2.setWorkMode("On-site");
            job2.setJobType("Full-Time");
            job2.setExperience("1 - 3 Years");
            job2.setSalary("₹3,50,000 - ₹5,00,000 P.A.");
            job2.setCategory("Human Resources");
            job2.setSource("Consultancy Listed");
            job2.setApplyMode("onsite");
            job2.setStatus("active");
            job2.setOpenings(2);
            job2.setDeadline("2026-11-30");
            job2.setPostedDate("1 day ago");
            job2.setDescription("Manage end-to-end recruitment lifecycle for manufacturing, retail, and corporate partner vacancies.");
            job2.setResponsibilities(Arrays.asList(
                    "Screen candidate profiles across job portals and offline walk-in drives",
                    "Coordinate interview rounds and issue interview call letters",
                    "Maintain candidate tracking records in ATS"
            ));
            job2.setSkills(Arrays.asList("Talent Sourcing", "Interview Coordination", "MS Excel", "Vendor Management"));
            job2.setEducation("Graduate / MBA in HR preferred");
            job2.setScreeningQuestions(Arrays.asList(
                    "Are you comfortable working on-site at Noida Sector 62?",
                    "Do you have experience in bulk hiring?"
            ));
            jobRepository.save(job2);

            Job job3 = new Job();
            job3.setTitle("Supply Chain & Logistics Operations Officer");
            job3.setCompany("Apex Logistics India");
            job3.setVerifiedCompany(true);
            job3.setLocation("Gurugram, Haryana");
            job3.setWorkMode("On-site");
            job3.setJobType("Full-Time");
            job3.setExperience("2 - 5 Years");
            job3.setSalary("₹5,00,000 - ₹7,50,000 P.A.");
            job3.setCategory("Supply Chain & Logistics");
            job3.setSource("Company Verified");
            job3.setApplyMode("onsite");
            job3.setStatus("active");
            job3.setOpenings(4);
            job3.setDeadline("2026-12-10");
            job3.setPostedDate("3 days ago");
            job3.setDescription("Supervise warehouse inbound/outbound freight dispatch, vehicle routing, and inventory tracking.");
            job3.setResponsibilities(Arrays.asList(
                    "Monitor real-time fleet GPS tracking and transit schedules",
                    "Resolve delivery exceptions and coordinate with hub supervisors",
                    "Generate daily dispatch and stock variance reports"
            ));
            job3.setSkills(Arrays.asList("Logistics Management", "Warehouse Operations", "ERP Software", "Route Optimization"));
            job3.setEducation("Graduate in any stream");
            job3.setScreeningQuestions(Arrays.asList(
                    "Do you have prior experience with warehouse inventory management?",
                    "Can you handle rotational day/night shifts?"
            ));
            jobRepository.save(job3);
        }
    }

    private void seedSettings() {
        if (settingsRepository.count() == 0) {
            settingsRepository.save(new SiteSettings());
        }
    }

    private void seedAuditLogs() {
        if (auditLogRepository.count() == 0) {
            auditLogRepository.save(new AuditLog("System", "SYSTEM", "DATABASE_INITIALIZED", "Seed data inserted", "127.0.0.1"));
            auditLogRepository.save(new AuditLog("Super Admin", "ADMIN", "SETTINGS_UPDATED", "Security notice verified", "127.0.0.1"));
        }
    }
}
