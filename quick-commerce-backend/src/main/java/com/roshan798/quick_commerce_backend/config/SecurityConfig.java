package com.roshan798.quick_commerce_backend.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.roshan798.quick_commerce_backend.security.CustomUserDetailsService;
import com.roshan798.quick_commerce_backend.security.JwtFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

	@Autowired
	private JwtFilter jwtFilter;
	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable) // Disable CSRF since we use JWT
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No
																												// sessions
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/v1/auth/**").permitAll() // Allow
						.anyRequest().authenticated() // Require authentication for all other requests
				).cors(cors -> cors.configurationSource(request -> {
					CorsConfiguration config = new CorsConfiguration();
					config.setAllowedOriginPatterns(List.of("*")); // Use this instead of setAllowedOrigins('client
																	// url')
					config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
					config.setAllowedHeaders(List.of("*")); // Allow all headers
					config.setAllowCredentials(true); // Allow cookies or Authorization header
					return config;
				})).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return new ProviderManager(authProvider);
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
