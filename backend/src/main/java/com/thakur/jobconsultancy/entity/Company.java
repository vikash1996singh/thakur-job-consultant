package com.thakur.jobconsultancy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String website;
    private String industry;
    private String location;
    private boolean verified = false;

    @Column(length = 1000)
    private String logo;

    private int openJobs = 0;

    @Column(length = 2000)
    private String description;

    public Company() {}

    public Company(String name, String website, String industry, String location, boolean verified, String logo, int openJobs, String description) {
        this.name = name;
        this.website = website;
        this.industry = industry;
        this.location = location;
        this.verified = verified;
        this.logo = logo;
        this.openJobs = openJobs;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getLogo() { return logo; }
    public void setLogo(String logo) { this.logo = logo; }

    public int getOpenJobs() { return openJobs; }
    public void setOpenJobs(int openJobs) { this.openJobs = openJobs; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
