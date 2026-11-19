package com.thakur.jobconsultancy.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long jobId;

    private String jobTitle;
    private String companyName;

    private Long candidateId;
    private String candidateName;
    private String candidateEmail;
    private String candidatePhone;

    private String resumeFileName;
    private String resumeFileUrl;

    @Column(length = 2000)
    private String coverNote;

    @Column(length = 2000)
    private String screeningAnswers; // JSON or formatted string

    private String status = "Submitted"; // Submitted, Viewed, Shortlisted, Interview, Hired, Rejected

    private LocalDateTime appliedAt = LocalDateTime.now();

    public JobApplication() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getJobTitle() { return jobTitle; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public Long getCandidateId() { return candidateId; }
    public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getCandidateEmail() { return candidateEmail; }
    public void setCandidateEmail(String candidateEmail) { this.candidateEmail = candidateEmail; }

    public String getCandidatePhone() { return candidatePhone; }
    public void setCandidatePhone(String candidatePhone) { this.candidatePhone = candidatePhone; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }

    public String getResumeFileUrl() { return resumeFileUrl; }
    public void setResumeFileUrl(String resumeFileUrl) { this.resumeFileUrl = resumeFileUrl; }

    public String getCoverNote() { return coverNote; }
    public void setCoverNote(String coverNote) { this.coverNote = coverNote; }

    public String getScreeningAnswers() { return screeningAnswers; }
    public void setScreeningAnswers(String screeningAnswers) { this.screeningAnswers = screeningAnswers; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
}
