package com.roshan798.quick_commerce_backend.service;

import com.roshan798.quick_commerce_backend.models.User;

public interface UserService {
	public User getUserById(Long id);

	public User getUserByEmail(String email);

	public User deleteUserById(Long id);

	public User updateUserById(Long id);
}
