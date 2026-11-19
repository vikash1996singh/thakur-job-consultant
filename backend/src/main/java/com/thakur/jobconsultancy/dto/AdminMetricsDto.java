package com.thakur.jobconsultancy.dto;

public class AdminMetricsDto {
    private long liveVacancies;
    private long pendingApprovalQueue;
    private long totalCompanies;
    private long uploadedResumes;
    private long activeApplications;

    public AdminMetricsDto() {}

    public AdminMetricsDto(long liveVacancies, long pendingApprovalQueue, long totalCompanies, long uploadedResumes, long activeApplications) {
        this.liveVacancies = liveVacancies;
        this.pendingApprovalQueue = pendingApprovalQueue;
        this.totalCompanies = totalCompanies;
        this.uploadedResumes = uploadedResumes;
        this.activeApplications = activeApplications;
    }

    public long getLiveVacancies() { return liveVacancies; }
    public void setLiveVacancies(long liveVacancies) { this.liveVacancies = liveVacancies; }

    public long getPendingApprovalQueue() { return pendingApprovalQueue; }
    public void setPendingApprovalQueue(long pendingApprovalQueue) { this.pendingApprovalQueue = pendingApprovalQueue; }

    public long getTotalCompanies() { return totalCompanies; }
    public void setTotalCompanies(long totalCompanies) { this.totalCompanies = totalCompanies; }

    public long getUploadedResumes() { return uploadedResumes; }
    public void setUploadedResumes(long uploadedResumes) { this.uploadedResumes = uploadedResumes; }

    public long getActiveApplications() { return activeApplications; }
    public void setActiveApplications(long activeApplications) { this.activeApplications = activeApplications; }
}
