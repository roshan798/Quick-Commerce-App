package com.roshan798.quick_commerce_backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return userRepo.findByEmailAndEnabledTrue(email).map(UserDetailsImpl::new)
				.orElseThrow(() -> new UsernameNotFoundException("No user found with email: " + email));
	}
}
