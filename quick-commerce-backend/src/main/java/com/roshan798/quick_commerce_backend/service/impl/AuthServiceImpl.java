package com.roshan798.quick_commerce_backend.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.dto.user.UserLoginDTO;
import com.roshan798.quick_commerce_backend.dto.user.UserRegisterDTO;
import com.roshan798.quick_commerce_backend.exceptions.InvalidTokenException;
import com.roshan798.quick_commerce_backend.exceptions.UserAlreadyExist;
import com.roshan798.quick_commerce_backend.exceptions.UserNotFoundException;
import com.roshan798.quick_commerce_backend.models.User;
import com.roshan798.quick_commerce_backend.repository.UserRepo;
import com.roshan798.quick_commerce_backend.security.JwtUtil;
import com.roshan798.quick_commerce_backend.service.AuthService;
import com.roshan798.quick_commerce_backend.service.TokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private TokenService tokenService;

	@Override
	public User login(UserLoginDTO userData, HttpServletResponse response) {
		log.info("Entering login method for email: {}", userData.getEmail());

		String email = userData.getEmail();
		String password = userData.getPassword();
		Optional<User> user = userRepo.findByEmailAndEnabledTrue(email);

		if (user.isEmpty() || !passwordEncoder.matches(password, user.get().getPassword())) {
			log.warn("Invalid login attempt for email: {}", email);
			throw new UserNotFoundException("Invalid credentials");
		}

		String accessToken = jwtUtil.generateAccessToken(email, String.valueOf(user.get().getRole()));
		String refreshToken = jwtUtil.generateRefreshToken(email, String.valueOf(user.get().getRole()));

		addCookie(response, "access_token", accessToken);
		addCookie(response, "refresh_token", refreshToken);

		log.info("User logged in successfully: {}", email);
		return user.get();
	}

	@Override
	public User register(UserRegisterDTO userData) {
		log.info("Entering register method for email: {}", userData.getEmail());

		String email = userData.getEmail();
		String password = userData.getPassword();
		Optional<User> user = userRepo.findByEmailAndEnabledTrue(email);

		if (user.isPresent()) {
			log.warn("User with email {} already exists", email);

			throw new UserAlreadyExist("User with email: " + email + " already exists. Please Login.");
		}

		User newUser = User.builder().name(userData.getName()).email(userData.getEmail())
				.password(passwordEncoder.encode(password)).role(userData.getRole()).enabled(true).build();

		User savedUser = userRepo.save(newUser);
		log.info("User registered successfully: {}", savedUser.getEmail());

		return savedUser;
	}

	@Override
	public boolean logout(HttpServletRequest request) {
		log.info("Entering logout");
		Cookie[] cookies = request.getCookies();

		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("access_token".equals(cookie.getName()) || "refresh_token".equals(cookie.getName())) {
					cookie.setMaxAge(0);
					cookie.setPath("/");
				}
			}
		}

		log.info("Exit logout");
		return true;
	}

	@Override
	public User refreshTokens(HttpServletRequest request, HttpServletResponse response) {
		log.info("Entering refreshTokens");

		String refreshToken = tokenService.getTokenFromCookies(request, "refresh_token");

		if (refreshToken == null || !jwtUtil.validateToken(refreshToken)) {
			log.warn("Invalid or missing refresh token");
			throw new InvalidTokenException("Invalid refresh token");
		}

		String email = jwtUtil.extractEmail(refreshToken);
		Optional<User> userOpt = userRepo.findByEmailAndEnabledTrue(email);

		if (userOpt.isEmpty()) {
			log.warn("User not found for refresh token");
			throw new UserNotFoundException("User not found");
		}

		User user = userOpt.get();
		String newAccessToken = jwtUtil.generateAccessToken(email, String.valueOf(user.getRole()));
		String newRefreshToken = jwtUtil.generateRefreshToken(email, String.valueOf(user.getRole()));

		addCookie(response, "access_token", newAccessToken);
		addCookie(response, "refresh_token", newRefreshToken);

		log.info("Tokens refreshed successfully for user: {}", email);
		return user;
	}

	private void addCookie(HttpServletResponse response, String name, String value) {
		Cookie cookie = new Cookie(name, value);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
}
