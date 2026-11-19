package com.thakur.jobconsultancy.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "candidate_profiles")
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    private String refCode;
    private String fullName;
    private String email;
    private String phone;
    private String headline;
    private String city;
    private int experienceYears = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "candidate_skills", joinColumns = @JoinColumn(name = "profile_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

    private String resumeFileName;
    private String resumeFileUrl;
    private String resumeFileSize;
    private String scanStatus = "Passed"; // Scanning, Passed, Flagged
    private LocalDateTime uploadedAt = LocalDateTime.now();

    public CandidateProfile() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getRefCode() { return refCode; }
    public void setRefCode(String refCode) { this.refCode = refCode; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getHeadline() { return headline; }
    public void setHeadline(String headline) { this.headline = headline; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public int getExperienceYears() { return experienceYears; }
    public void setExperienceYears(int experienceYears) { this.experienceYears = experienceYears; }

    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }

    public String getResumeFileUrl() { return resumeFileUrl; }
    public void setResumeFileUrl(String resumeFileUrl) { this.resumeFileUrl = resumeFileUrl; }

    public String getResumeFileSize() { return resumeFileSize; }
    public void setResumeFileSize(String resumeFileSize) { this.resumeFileSize = resumeFileSize; }

    public String getScanStatus() { return scanStatus; }
    public void setScanStatus(String scanStatus) { this.scanStatus = scanStatus; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
