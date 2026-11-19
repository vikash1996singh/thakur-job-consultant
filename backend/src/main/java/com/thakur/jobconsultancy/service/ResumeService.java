package com.thakur.jobconsultancy.service;

import com.thakur.jobconsultancy.entity.CandidateProfile;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.repository.CandidateProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ResumeService {

    @Autowired
    private CandidateProfileRepository profileRepository;

    @Value("${app.upload.dir:./uploads/resumes}")
    private String uploadDir;

    public CandidateProfile uploadResume(MultipartFile file, User user) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename() != null ? file.getOriginalFilename() : "resume.pdf";
        String extension = originalFilename.contains(".") ? originalFilename.substring(originalFilename.lastIndexOf(".")) : ".pdf";
        String uniqueFilename = UUID.randomUUID().toString() + extension;

        Path targetPath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        String fileUrl = "/uploads/resumes/" + uniqueFilename;
        String fileSize = String.format("%.1f MB", file.getSize() / (1024.0 * 1024.0));

        Long userId = (user != null) ? user.getId() : 0L;
        Optional<CandidateProfile> profileOpt = (user != null) ? profileRepository.findByUserId(userId) : Optional.empty();

        CandidateProfile profile = profileOpt.orElseGet(() -> {
            CandidateProfile cp = new CandidateProfile();
            cp.setUserId(userId);
            cp.setRefCode("TK-CV-2026-" + UUID.randomUUID().toString().substring(0, 5).toUpperCase());
            if (user != null) {
                cp.setFullName(user.getFullName());
                cp.setEmail(user.getEmail());
                cp.setPhone(user.getMobile());
            }
            return cp;
        });

        profile.setResumeFileName(originalFilename);
        profile.setResumeFileUrl(fileUrl);
        profile.setResumeFileSize(fileSize);
        profile.setScanStatus("Passed");
        profile.setUploadedAt(LocalDateTime.now());

        return profileRepository.save(profile);
    }

    public CandidateProfile getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Candidate profile not found for user ID: " + userId));
    }

    public CandidateProfile updateProfile(Long userId, CandidateProfile updated) {
        CandidateProfile profile = profileRepository.findByUserId(userId)
                .orElseGet(() -> {
                    CandidateProfile cp = new CandidateProfile();
                    cp.setUserId(userId);
                    return cp;
                });

        if (updated.getFullName() != null) profile.setFullName(updated.getFullName());
        if (updated.getHeadline() != null) profile.setHeadline(updated.getHeadline());
        if (updated.getCity() != null) profile.setCity(updated.getCity());
        if (updated.getPhone() != null) profile.setPhone(updated.getPhone());
        if (updated.getExperienceYears() >= 0) profile.setExperienceYears(updated.getExperienceYears());
        if (updated.getSkills() != null) profile.setSkills(updated.getSkills());

        return profileRepository.save(profile);
    }

    public List<CandidateProfile> getAllProfiles() {
        return profileRepository.findAll();
    }
}
