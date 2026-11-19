package com.thakur.jobconsultancy.dto;

import jakarta.validation.constraints.NotNull;

public class ApplicationRequest {

    @NotNull(message = "Job ID is required")
    private Long jobId;

    private String resumeFileName;
    private String resumeFileUrl;
    private String coverNote;
    private String screeningAnswers;

    public ApplicationRequest() {}

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }

    public String getResumeFileName() { return resumeFileName; }
    public void setResumeFileName(String resumeFileName) { this.resumeFileName = resumeFileName; }

    public String getResumeFileUrl() { return resumeFileUrl; }
    public void setResumeFileUrl(String resumeFileUrl) { this.resumeFileUrl = resumeFileUrl; }

    public String getCoverNote() { return coverNote; }
    public void setCoverNote(String coverNote) { this.coverNote = coverNote; }

    public String getScreeningAnswers() { return screeningAnswers; }
    public void setScreeningAnswers(String screeningAnswers) { this.screeningAnswers = screeningAnswers; }
}
