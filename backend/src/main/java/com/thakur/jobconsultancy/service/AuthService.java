package com.thakur.jobconsultancy.service;

import com.thakur.jobconsultancy.dto.AuthRequest;
import com.thakur.jobconsultancy.dto.AuthResponse;
import com.thakur.jobconsultancy.dto.RegisterRequest;
import com.thakur.jobconsultancy.entity.CandidateProfile;
import com.thakur.jobconsultancy.entity.Role;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.repository.CandidateProfileRepository;
import com.thakur.jobconsultancy.repository.UserRepository;
import com.thakur.jobconsultancy.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateProfileRepository profileRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered: " + req.getEmail());
        }

        Role role = "employer".equalsIgnoreCase(req.getRole()) ? Role.ROLE_EMPLOYER : Role.ROLE_CANDIDATE;

        User user = new User(
                req.getEmail(),
                passwordEncoder.encode(req.getPassword()),
                req.getFirstName(),
                req.getLastName(),
                req.getMobile(),
                req.getCompanyName(),
                role
        );

        User saved = userRepository.save(user);

        // If candidate, initialize default candidate profile
        if (role == Role.ROLE_CANDIDATE) {
            CandidateProfile profile = new CandidateProfile();
            profile.setUserId(saved.getId());
            profile.setRefCode("TK-CV-2026-" + String.format("%04d", saved.getId()));
            profile.setFullName(saved.getFullName());
            profile.setEmail(saved.getEmail());
            profile.setPhone(saved.getMobile());
            profileRepository.save(profile);
        }

        String token = jwtUtil.generateToken(saved.getEmail(), saved.getRole().name(), saved.getId());
        return new AuthResponse(token, saved.getId(), saved.getEmail(), saved.getFullName(), saved.getRole().name(), saved.getMobile(), saved.getCompanyName());
    }

    public AuthResponse login(AuthRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()) && !req.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole().name(), user.getMobile(), user.getCompanyName());
    }

    public AuthResponse adminLogin(AuthRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty() || userOpt.get().getRole() != Role.ROLE_ADMIN) {
            // Check default admin fallback
            if ("admin@thakurconsultancy.in".equalsIgnoreCase(req.getEmail()) && "admin@123".equals(req.getPassword())) {
                User admin = new User(
                        "admin@thakurconsultancy.in",
                        passwordEncoder.encode("admin@123"),
                        "Super",
                        "Admin",
                        "8852249966",
                        "Thakur Job Consultant",
                        Role.ROLE_ADMIN
                );
                User saved = userRepository.save(admin);
                String token = jwtUtil.generateToken(saved.getEmail(), saved.getRole().name(), saved.getId());
                return new AuthResponse(token, saved.getId(), saved.getEmail(), saved.getFullName(), saved.getRole().name(), saved.getMobile(), saved.getCompanyName());
            }
            throw new RuntimeException("Unauthorized admin access");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()) && !req.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid admin credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name(), user.getId());
        return new AuthResponse(token, user.getId(), user.getEmail(), user.getFullName(), user.getRole().name(), user.getMobile(), user.getCompanyName());
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
