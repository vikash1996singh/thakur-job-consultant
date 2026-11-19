package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.entity.Company;
import com.thakur.jobconsultancy.service.CompanyService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@Tag(name = "5. Companies", description = "Featured partner companies and hiring organizations")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Company>>> getAllCompanies() {
        return ResponseEntity.ok(ApiResponse.ok(companyService.getAllCompanies()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Company>> getCompanyById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.ok(companyService.getCompanyById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Company>> createCompany(@RequestBody Company company) {
        try {
            Company created = companyService.createCompany(company);
            return ResponseEntity.ok(ApiResponse.ok("Company profile created", created));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<ApiResponse<Company>> toggleVerification(@PathVariable Long id) {
        try {
            Company updated = companyService.toggleVerification(id);
            return ResponseEntity.ok(ApiResponse.ok("Company verification status updated: " + (updated.isVerified() ? "Verified" : "Unverified"), updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
