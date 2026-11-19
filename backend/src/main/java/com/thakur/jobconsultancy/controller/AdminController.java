package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.AdminMetricsDto;
import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.entity.AuditLog;
import com.thakur.jobconsultancy.entity.Job;
import com.thakur.jobconsultancy.entity.JobApplication;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.service.AdminService;
import com.thakur.jobconsultancy.service.ApplicationService;
import com.thakur.jobconsultancy.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JobService jobService;

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/metrics")
    public ResponseEntity<ApiResponse<AdminMetricsDto>> getMetrics() {
        AdminMetricsDto metrics = adminService.getMetrics();
        return ResponseEntity.ok(ApiResponse.ok(metrics));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<ApiResponse<List<AuditLog>>> getAuditLogs() {
        List<AuditLog> logs = adminService.getAuditLogs();
        return ResponseEntity.ok(ApiResponse.ok(logs));
    }

    @GetMapping("/jobs/pending")
    public ResponseEntity<ApiResponse<List<Job>>> getPendingJobs() {
        List<Job> pending = jobService.getJobs("pending", null, null, null, null);
        return ResponseEntity.ok(ApiResponse.ok(pending));
    }

    @PutMapping("/jobs/{id}/approve")
    public ResponseEntity<ApiResponse<Job>> approveJob(
            @PathVariable Long id,
            @AuthenticationPrincipal User adminUser
    ) {
        Job job = jobService.updateJobStatus(id, "active");
        adminService.logAction(
                adminUser != null ? adminUser.getFullName() : "Super Admin",
                "ADMIN",
                "APPROVED_JOB",
                "Job ID: " + id + " (" + job.getTitle() + ")",
                "127.0.0.1"
        );
        return ResponseEntity.ok(ApiResponse.ok("Job vacancy approved and published live", job));
    }

    @PutMapping("/jobs/{id}/reject")
    public ResponseEntity<ApiResponse<Job>> rejectJob(
            @PathVariable Long id,
            @AuthenticationPrincipal User adminUser
    ) {
        Job job = jobService.updateJobStatus(id, "rejected");
        adminService.logAction(
                adminUser != null ? adminUser.getFullName() : "Super Admin",
                "ADMIN",
                "REJECTED_JOB",
                "Job ID: " + id + " (" + job.getTitle() + ")",
                "127.0.0.1"
        );
        return ResponseEntity.ok(ApiResponse.ok("Job vacancy rejected", job));
    }

    @GetMapping("/applications")
    public ResponseEntity<ApiResponse<List<JobApplication>>> getAllApplications() {
        return ResponseEntity.ok(ApiResponse.ok(applicationService.getAllApplications()));
    }
}
