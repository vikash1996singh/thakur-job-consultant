package com.thakur.jobconsultancy.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .headers(headers -> headers.frameOptions(frame -> frame.disable())) // for H2 Console
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public authentication & static
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/settings/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()

                // Public Job browsing (GET is open, POST/PUT requires auth)
                .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/companies/**").permitAll()

                // Public Resume upload simulation
                .requestMatchers("/api/resumes/upload").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/applications/public-apply").permitAll()

                // Admin endpoints strictly protected
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                // All other API calls require valid JWT
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
