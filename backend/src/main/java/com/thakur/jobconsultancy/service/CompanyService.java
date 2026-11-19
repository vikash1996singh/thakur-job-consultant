package com.thakur.jobconsultancy.service;

import com.thakur.jobconsultancy.entity.Company;
import com.thakur.jobconsultancy.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(Long id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found: " + id));
    }

    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company toggleVerification(Long id) {
        Company comp = getCompanyById(id);
        comp.setVerified(!comp.isVerified());
        return companyRepository.save(comp);
    }
}
