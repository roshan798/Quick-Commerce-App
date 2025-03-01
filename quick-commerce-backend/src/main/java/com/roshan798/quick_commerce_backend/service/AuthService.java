package com.roshan798.quick_commerce_backend.service;

import com.roshan798.quick_commerce_backend.dto.user.UserLoginDTO;
import com.roshan798.quick_commerce_backend.dto.user.UserRegisterDTO;
import com.roshan798.quick_commerce_backend.models.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
	User login(UserLoginDTO userData, HttpServletResponse response);

	User register(UserRegisterDTO userData);

	boolean logout(HttpServletRequest request);

	User refreshTokens(HttpServletRequest request, HttpServletResponse response);
}
