package com.thakur.jobconsultancy.service;

import com.thakur.jobconsultancy.dto.AdminMetricsDto;
import com.thakur.jobconsultancy.entity.AuditLog;
import com.thakur.jobconsultancy.entity.SiteSettings;
import com.thakur.jobconsultancy.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CandidateProfileRepository profileRepository;

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private SiteSettingsRepository siteSettingsRepository;

    public AdminMetricsDto getMetrics() {
        long live = jobRepository.countByStatus("active");
        long pending = jobRepository.countByStatus("pending");
        long companies = companyRepository.count();
        long resumes = profileRepository.count();
        long applications = applicationRepository.count();

        return new AdminMetricsDto(live, pending, companies, resumes, applications);
    }

    public List<AuditLog> getAuditLogs() {
        return auditLogRepository.findTop50ByOrderByTimestampDesc();
    }

    public void logAction(String actorName, String actorRole, String action, String target, String ipAddress) {
        AuditLog log = new AuditLog(actorName, actorRole, action, target, ipAddress);
        auditLogRepository.save(log);
    }

    public SiteSettings getSettings() {
        return siteSettingsRepository.findById(1L).orElseGet(() -> {
            SiteSettings def = new SiteSettings();
            return siteSettingsRepository.save(def);
        });
    }

    public SiteSettings updateSettings(SiteSettings updated) {
        updated.setId(1L);
        return siteSettingsRepository.save(updated);
    }
}
