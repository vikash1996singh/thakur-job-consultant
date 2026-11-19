package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.dto.ApplicationRequest;
import com.thakur.jobconsultancy.dto.StatusUpdateRequest;
import com.thakur.jobconsultancy.entity.JobApplication;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.service.ApplicationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Tag(name = "3. Job Applications", description = "Candidate Applications, Public Apply and Application Status Management")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<ApiResponse<JobApplication>> apply(
            @Valid @RequestBody ApplicationRequest request,
            @AuthenticationPrincipal User currentUser
    ) {
        try {
            JobApplication app = applicationService.apply(request, currentUser);
            return ResponseEntity.ok(ApiResponse.ok("Application submitted successfully", app));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/public-apply")
    public ResponseEntity<ApiResponse<JobApplication>> publicApply(@RequestBody JobApplication application) {
        try {
            JobApplication app = applicationService.publicApply(application);
            return ResponseEntity.ok(ApiResponse.ok("Application submitted successfully", app));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<JobApplication>>> getMyApplications(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Authentication required"));
        }
        List<JobApplication> apps = applicationService.getApplicationsByCandidate(currentUser.getId());
        return ResponseEntity.ok(ApiResponse.ok(apps));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<ApiResponse<List<JobApplication>>> getJobApplications(@PathVariable Long jobId) {
        List<JobApplication> apps = applicationService.getApplicationsByJob(jobId);
        return ResponseEntity.ok(ApiResponse.ok(apps));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<JobApplication>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request
    ) {
        try {
            JobApplication updated = applicationService.updateStatus(id, request.getStatus());
            return ResponseEntity.ok(ApiResponse.ok("Application status updated to: " + request.getStatus(), updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<JobApplication>>> getAllApplications() {
        List<JobApplication> apps = applicationService.getAllApplications();
        return ResponseEntity.ok(ApiResponse.ok(apps));
    }
}
