package com.thakur.jobconsultancy.service;

import com.thakur.jobconsultancy.dto.ApplicationRequest;
import com.thakur.jobconsultancy.entity.CandidateProfile;
import com.thakur.jobconsultancy.entity.Job;
import com.thakur.jobconsultancy.entity.JobApplication;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.repository.CandidateProfileRepository;
import com.thakur.jobconsultancy.repository.JobApplicationRepository;
import com.thakur.jobconsultancy.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private JobApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CandidateProfileRepository profileRepository;

    public JobApplication apply(ApplicationRequest req, User candidate) {
        Job job = jobRepository.findById(req.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found: " + req.getJobId()));

        Optional<CandidateProfile> profileOpt = profileRepository.findByUserId(candidate.getId());

        JobApplication app = new JobApplication();
        app.setJobId(job.getId());
        app.setJobTitle(job.getTitle());
        app.setCompanyName(job.getCompany());
        app.setCandidateId(candidate.getId());
        app.setCandidateName(candidate.getFullName());
        app.setCandidateEmail(candidate.getEmail());
        app.setCandidatePhone(candidate.getMobile());

        // Resume info
        if (req.getResumeFileUrl() != null && !req.getResumeFileUrl().isEmpty()) {
            app.setResumeFileName(req.getResumeFileName());
            app.setResumeFileUrl(req.getResumeFileUrl());
        } else if (profileOpt.isPresent() && profileOpt.get().getResumeFileUrl() != null) {
            app.setResumeFileName(profileOpt.get().getResumeFileName());
            app.setResumeFileUrl(profileOpt.get().getResumeFileUrl());
        }

        app.setCoverNote(req.getCoverNote());
        app.setScreeningAnswers(req.getScreeningAnswers());
        app.setStatus("Submitted");
        app.setAppliedAt(LocalDateTime.now());

        return applicationRepository.save(app);
    }

    public JobApplication publicApply(JobApplication app) {
        if (app.getJobId() != null) {
            jobRepository.findById(app.getJobId()).ifPresent(job -> {
                if (app.getJobTitle() == null) app.setJobTitle(job.getTitle());
                if (app.getCompanyName() == null) app.setCompanyName(job.getCompany());
            });
        }
        app.setStatus("Submitted");
        app.setAppliedAt(LocalDateTime.now());
        return applicationRepository.save(app);
    }

    public List<JobApplication> getApplicationsByCandidate(Long candidateId) {
        return applicationRepository.findByCandidateId(candidateId);
    }

    public List<JobApplication> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<JobApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    public JobApplication updateStatus(Long id, String status) {
        JobApplication app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found: " + id));
        app.setStatus(status);
        return applicationRepository.save(app);
    }
}
