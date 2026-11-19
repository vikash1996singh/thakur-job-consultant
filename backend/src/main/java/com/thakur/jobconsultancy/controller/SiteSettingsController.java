package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.entity.SiteSettings;
import com.thakur.jobconsultancy.service.AdminService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@Tag(name = "6. Site Settings", description = "Public website configuration, contact information & social links")
public class SiteSettingsController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<ApiResponse<SiteSettings>> getSettings() {
        return ResponseEntity.ok(ApiResponse.ok(adminService.getSettings()));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<SiteSettings>> updateSettings(@RequestBody SiteSettings settings) {
        try {
            SiteSettings updated = adminService.updateSettings(settings);
            return ResponseEntity.ok(ApiResponse.ok("Site settings updated successfully", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
