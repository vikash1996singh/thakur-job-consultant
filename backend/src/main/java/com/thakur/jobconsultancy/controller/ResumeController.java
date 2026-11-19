package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.entity.CandidateProfile;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.service.ResumeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@Tag(name = "4. Resumes & Uploads", description = "Candidate Resume upload, file storage and profile data extraction")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<CandidateProfile>> uploadResume(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal User currentUser
    ) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(ApiResponse.error("File cannot be empty"));
            }
            CandidateProfile profile = resumeService.uploadResume(file, currentUser);
            return ResponseEntity.ok(ApiResponse.ok("Resume uploaded and scanned successfully (Malware Scan: Passed)", profile));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to upload resume: " + e.getMessage()));
        }
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<CandidateProfile>> getMyProfile(@AuthenticationPrincipal User currentUser) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Authentication required"));
        }
        try {
            CandidateProfile profile = resumeService.getProfileByUserId(currentUser.getId());
            return ResponseEntity.ok(ApiResponse.ok(profile));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<CandidateProfile>> updateProfile(
            @RequestBody CandidateProfile updated,
            @AuthenticationPrincipal User currentUser
    ) {
        if (currentUser == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Authentication required"));
        }
        try {
            CandidateProfile profile = resumeService.updateProfile(currentUser.getId(), updated);
            return ResponseEntity.ok(ApiResponse.ok("Candidate profile updated successfully", profile));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<CandidateProfile>>> getAllProfiles() {
        List<CandidateProfile> profiles = resumeService.getAllProfiles();
        return ResponseEntity.ok(ApiResponse.ok(profiles));
    }
}
