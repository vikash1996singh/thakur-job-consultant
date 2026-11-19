package com.thakur.jobconsultancy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "site_settings")
public class SiteSettings {

    @Id
    private Long id = 1L;

    private String consultancyName = "Thakur Job Consultant";
    private String whatsappNumber = "+91 88522 49966";
    private String whatsappDigits = "918852249966";
    private String email = "info@thakurconsultancy.in";
    private String employerEmail = "employers@thakurconsultancy.in";
    private String officeAddress = "Sector 62, Electronic City, Noida, Uttar Pradesh - 201309";
    private String supportHours = "Monday to Saturday: 9:30 AM to 6:30 PM IST";

    @Column(length = 2000)
    private String securityNotice = "Thakur Job Consultant never charges any unofficial placement or registration fees from candidates. Always verify employer badges before attending offline interviews.";

    private String heroTagline = "100% Free for Candidates";

    public SiteSettings() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getConsultancyName() { return consultancyName; }
    public void setConsultancyName(String consultancyName) { this.consultancyName = consultancyName; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public String getWhatsappDigits() { return whatsappDigits; }
    public void setWhatsappDigits(String whatsappDigits) { this.whatsappDigits = whatsappDigits; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getEmployerEmail() { return employerEmail; }
    public void setEmployerEmail(String employerEmail) { this.employerEmail = employerEmail; }

    public String getOfficeAddress() { return officeAddress; }
    public void setOfficeAddress(String officeAddress) { this.officeAddress = officeAddress; }

    public String getSupportHours() { return supportHours; }
    public void setSupportHours(String supportHours) { this.supportHours = supportHours; }

    public String getSecurityNotice() { return securityNotice; }
    public void setSecurityNotice(String securityNotice) { this.securityNotice = securityNotice; }

    public String getHeroTagline() { return heroTagline; }
    public void setHeroTagline(String heroTagline) { this.heroTagline = heroTagline; }
}
