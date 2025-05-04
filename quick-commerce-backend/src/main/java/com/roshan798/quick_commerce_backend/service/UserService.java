package com.roshan798.quick_commerce_backend.service;

import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.models.User;

@Service
public interface UserService {
	public User getUserById(Long id);

	public User getUserByEmail(String email);

	public User deleteUserById(Long id);

	public User updateUserById(Long id);
}
