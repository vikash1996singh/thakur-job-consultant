package com.thakur.jobconsultancy.controller;

import com.thakur.jobconsultancy.dto.ApiResponse;
import com.thakur.jobconsultancy.dto.AuthRequest;
import com.thakur.jobconsultancy.dto.AuthResponse;
import com.thakur.jobconsultancy.dto.RegisterRequest;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(ApiResponse.ok("Registration successful", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/admin-login")
    public ResponseEntity<ApiResponse<AuthResponse>> adminLogin(@Valid @RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.adminLogin(request);
            return ResponseEntity.ok(ApiResponse.ok("Admin authentication successful", response));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        return ResponseEntity.ok(ApiResponse.ok(user));
    }
}
