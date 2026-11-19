package com.thakur.jobconsultancy.repository;

import com.thakur.jobconsultancy.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByVerified(boolean verified);
    long countByVerified(boolean verified);
}
