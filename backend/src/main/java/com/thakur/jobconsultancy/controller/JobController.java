package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.dto.StatusUpdateRequest;
import com.thakur.jobconsultancy.entity.Job;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Job>>> getJobs(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String workMode,
            @RequestParam(required = false) String location
    ) {
        List<Job> jobs = jobService.getJobs(status, search, category, workMode, location);
        return ResponseEntity.ok(ApiResponse.ok(jobs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> getJobById(@PathVariable Long id) {
        try {
            Job job = jobService.getJobById(id);
            return ResponseEntity.ok(ApiResponse.ok(job));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Job>> createJob(
            @RequestBody Job job,
            @AuthenticationPrincipal User currentUser
    ) {
        try {
            Job created = jobService.createJob(job, currentUser);
            return ResponseEntity.ok(ApiResponse.ok("Job vacancy created successfully", created));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Job>> updateJob(
            @PathVariable Long id,
            @RequestBody Job job
    ) {
        try {
            Job updated = jobService.updateJob(id, job);
            return ResponseEntity.ok(ApiResponse.ok("Job vacancy updated", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Job>> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest req
    ) {
        try {
            Job updated = jobService.updateJobStatus(id, req.getStatus());
            return ResponseEntity.ok(ApiResponse.ok("Job status changed to " + req.getStatus(), updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteJob(@PathVariable Long id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.ok(ApiResponse.ok("Job vacancy deleted successfully", "Deleted ID: " + id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = Arrays.asList(
                "IT Software",
                "Banking & Financial Services",
                "Human Resources",
                "Digital Marketing",
                "Sales & Business Development",
                "Supply Chain & Logistics",
                "Operations & Support",
                "Manufacturing & Engineering"
        );
        return ResponseEntity.ok(ApiResponse.ok(categories));
    }

    @GetMapping("/locations")
    public ResponseEntity<ApiResponse<List<String>>> getLocations() {
        List<String> locations = Arrays.asList(
                "Noida / Greater Noida",
                "New Delhi / NCR",
                "Gurugram, Haryana",
                "Bangalore, Karnataka",
                "Hyderabad, Telangana",
                "Mumbai / Pune",
                "Remote / Pan India"
        );
        return ResponseEntity.ok(ApiResponse.ok(locations));
    }
}
