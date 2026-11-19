package com.thakur.jobconsultancy.repository;

import com.thakur.jobconsultancy.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByStatus(String status);
    long countByStatus(String status);
    List<Job> findByCompanyId(Long companyId);

    @Query("SELECT j FROM Job j WHERE " +
           "(:status IS NULL OR LOWER(j.status) = LOWER(:status)) AND " +
           "(:search IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(j.company) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "(:category IS NULL OR LOWER(j.category) = LOWER(:category)) AND " +
           "(:workMode IS NULL OR LOWER(j.workMode) = LOWER(:workMode)) AND " +
           "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))")
    List<Job> filterJobs(
        @Param("status") String status,
        @Param("search") String search,
        @Param("category") String category,
        @Param("workMode") String workMode,
        @Param("location") String location
    );
}
