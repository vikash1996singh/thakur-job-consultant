package com.thakur.jobconsultancy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ThakurJobConsultancyApplication {

    public static void main(String[] args) {
        SpringApplication.run(ThakurJobConsultancyApplication.class, args);
        System.out.println("==================================================================");
        System.out.println("  THAKUR JOB CONSULTANCY ENTERPRISE BACKEND REST API IS READY!   ");
        System.out.println("  Port: 8080 | Context Path: /                                    ");
        System.out.println("  H2 Console: http://localhost:8080/h2-console                    ");
        System.out.println("==================================================================");
    }
}
