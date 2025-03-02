package com.roshan798.quick_commerce_backend.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.exceptions.UserNotFoundException;
import com.roshan798.quick_commerce_backend.models.User;
import com.roshan798.quick_commerce_backend.repository.UserRepo;
import com.roshan798.quick_commerce_backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo repo;

	@Override
	public User getUserById(Long id) {
		log.info("Fetching user by ID: {}", id);
		return repo.findByIdAndEnabledTrue(id).orElseThrow(() -> {
			log.warn("User with ID {} not found", id);
			return new UserNotFoundException("User with ID: " + id + " does not exist.");
		});
	}

	@Override
	public User getUserByEmail(String email) {
		log.info("Fetching user by Email: {}", email);
		return repo.findByEmailAndEnabledTrue(email).orElseThrow(() -> {
			log.warn("User with Email {} not found", email);
			return new UserNotFoundException("User with Email: " + email + " does not exist.");
		});
	}

	@Override
	public User deleteUserById(Long id) {
		log.info("Deleting user by ID: {}", id);
		Optional<User> user = repo.findById(id);
		if (user.isEmpty()) {
			log.warn("User with ID {} not found", id);
			throw new UserNotFoundException("User with ID: " + id + " does not exist.");
		}
		repo.deleteById(id);
		log.info("User with ID {} deleted successfully", id);
		return user.get();
	}

	@Override
	public User updateUserById(Long id) {
		log.info("Updating user by ID: {}", id);
		Optional<User> user = repo.findById(id);
		if (user.isEmpty()) {
			log.warn("User with ID {} not found", id);
			throw new UserNotFoundException("User with ID: " + id + " does not exist.");
		}
		// Add logic to update user details here
		log.info("User with ID {} updated successfully", id);
		return user.get();
	}
}
