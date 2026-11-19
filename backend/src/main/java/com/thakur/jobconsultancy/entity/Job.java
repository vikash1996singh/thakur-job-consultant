package com.thakur.jobconsultancy.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private Long companyId;
    private String company;
    private boolean verifiedCompany = false;

    private String location;
    private String workMode; // "On-site", "Hybrid", "Remote"
    private String jobType;  // "Full-Time", "Part-Time", "Contract"
    private String experience; // e.g. "3 - 6 Years"
    private String salary;     // e.g. "₹12,00,000 - ₹18,00,000 P.A."
    private String category;   // e.g. "IT Software"

    private String source = "Company Verified";
    private String sourceType = "company";
    private String applyMode = "onsite"; // "onsite" or "external"
    private String externalUrl;

    @Column(nullable = false)
    private String status = "active"; // "active", "pending", "paused", "closed"

    private int openings = 1;
    private String deadline;
    private String postedDate = "Just now";

    @Column(length = 4000)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_responsibilities", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "responsibility", length = 1000)
    private List<String> responsibilities = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    private String education;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_screening_questions", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "question", length = 1000)
    private List<String> screeningQuestions = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public Job() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public boolean isVerifiedCompany() { return verifiedCompany; }
    public void setVerifiedCompany(boolean verifiedCompany) { this.verifiedCompany = verifiedCompany; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getWorkMode() { return workMode; }
    public void setWorkMode(String workMode) { this.workMode = workMode; }

    public String getJobType() { return jobType; }
    public void setJobType(String jobType) { this.jobType = jobType; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getSalary() { return salary; }
    public void setSalary(String salary) { this.salary = salary; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getSourceType() { return sourceType; }
    public void setSourceType(String sourceType) { this.sourceType = sourceType; }

    public String getApplyMode() { return applyMode; }
    public void setApplyMode(String applyMode) { this.applyMode = applyMode; }

    public String getExternalUrl() { return externalUrl; }
    public void setExternalUrl(String externalUrl) { this.externalUrl = externalUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getOpenings() { return openings; }
    public void setOpenings(int openings) { this.openings = openings; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getPostedDate() { return postedDate; }
    public void setPostedDate(String postedDate) { this.postedDate = postedDate; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getResponsibilities() { return responsibilities; }
    public void setResponsibilities(List<String> responsibilities) { this.responsibilities = responsibilities; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public List<String> getScreeningQuestions() { return screeningQuestions; }
    public void setScreeningQuestions(List<String> screeningQuestions) { this.screeningQuestions = screeningQuestions; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
