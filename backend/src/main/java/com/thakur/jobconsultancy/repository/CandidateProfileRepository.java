package com.thakur.jobconsultancy.repository;

import com.thakur.jobconsultancy.entity.CandidateProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Long> {
    Optional<CandidateProfile> findByUserId(Long userId);
    Optional<CandidateProfile> findByEmail(String email);
    Optional<CandidateProfile> findByRefCode(String refCode);
}
