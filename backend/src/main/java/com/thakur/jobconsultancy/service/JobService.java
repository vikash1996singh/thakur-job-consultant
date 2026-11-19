package com.thakur.jobconsultancy.service;

import com.thakur.jobconsultancy.entity.Job;
import com.thakur.jobconsultancy.entity.Role;
import com.thakur.jobconsultancy.entity.User;
import com.thakur.jobconsultancy.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getJobs(String status, String search, String category, String workMode, String location) {
        // If no filter, return all or active
        return jobRepository.filterJobs(status, search, category, workMode, location);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job vacancy not found with ID: " + id));
    }

    public Job createJob(Job job, User currentUser) {
        job.setCreatedAt(LocalDateTime.now());
        job.setPostedDate("Just now");

        if (currentUser.getRole() == Role.ROLE_ADMIN) {
            // Admin can publish directly as active
            if (job.getStatus() == null || job.getStatus().isEmpty()) {
                job.setStatus("active");
            }
        } else if (currentUser.getRole() == Role.ROLE_EMPLOYER) {
            // Employer postings can require admin approval or default to active
            if (job.getStatus() == null || job.getStatus().isEmpty()) {
                job.setStatus("pending");
            }
            if (job.getCompany() == null || job.getCompany().isEmpty()) {
                job.setCompany(currentUser.getCompanyName() != null ? currentUser.getCompanyName() : currentUser.getFullName());
            }
        }

        return jobRepository.save(job);
    }

    public Job updateJob(Long id, Job updated) {
        Job existing = getJobById(id);

        existing.setTitle(updated.getTitle());
        existing.setLocation(updated.getLocation());
        existing.setWorkMode(updated.getWorkMode());
        existing.setJobType(updated.getJobType());
        existing.setExperience(updated.getExperience());
        existing.setSalary(updated.getSalary());
        existing.setCategory(updated.getCategory());
        existing.setOpenings(updated.getOpenings());
        existing.setDeadline(updated.getDeadline());
        existing.setDescription(updated.getDescription());
        existing.setResponsibilities(updated.getResponsibilities());
        existing.setSkills(updated.getSkills());
        existing.setEducation(updated.getEducation());
        existing.setScreeningQuestions(updated.getScreeningQuestions());

        return jobRepository.save(existing);
    }

    public Job updateJobStatus(Long id, String newStatus) {
        Job job = getJobById(id);
        job.setStatus(newStatus.toLowerCase());
        return jobRepository.save(job);
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    public List<Job> getJobsByCompany(Long companyId) {
        return jobRepository.findByCompanyId(companyId);
    }
}
