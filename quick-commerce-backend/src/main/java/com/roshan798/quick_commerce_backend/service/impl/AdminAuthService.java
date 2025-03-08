package com.roshan798.quick_commerce_backend.service.impl;

import com.roshan798.quick_commerce_backend.dto.user.UserLoginDTO;
import com.roshan798.quick_commerce_backend.dto.user.UserRegisterDTO;
import com.roshan798.quick_commerce_backend.models.User;
import com.roshan798.quick_commerce_backend.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AdminAuthService implements AuthService {

	@Override
	public User login(UserLoginDTO userData, HttpServletResponse response) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User register(UserRegisterDTO userData) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean logout(HttpServletRequest request) {

		return false;
	}

	@Override
	public User refreshTokens(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		return null;
	}

}
