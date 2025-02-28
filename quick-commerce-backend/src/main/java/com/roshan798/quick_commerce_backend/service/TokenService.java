package com.roshan798.quick_commerce_backend.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.security.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class TokenService {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserDetailsService userDetailsService;

	public boolean isTokenValid(String token) {
		return token != null && jwtUtil.validateToken(token);
	}

	public String getTokenFromCookies(HttpServletRequest request, String cookieName) {
		Cookie[] cookies = request.getCookies();
		if (cookies == null) {
			return null;
		}

		return Arrays.stream(cookies).filter(cookie -> cookieName.equals(cookie.getName())).map(Cookie::getValue)
				.findFirst().orElse(null);
	}

	public void refreshTokenIfNeeded(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = getTokenFromCookies(request, "refresh_token");

		if (refreshToken != null && jwtUtil.validateToken(refreshToken)) {
			String userEmail = jwtUtil.extractEmail(refreshToken);
			String userRole = jwtUtil.extractRole(refreshToken);

			// Generate new access token
			String newAccessToken = jwtUtil.generateAccessToken(userEmail, userRole);

			Cookie newAccessTokenCookie = new Cookie("access_token", newAccessToken);
			newAccessTokenCookie.setHttpOnly(true);
			newAccessTokenCookie.setSecure(true);
			newAccessTokenCookie.setPath("/");

			response.addCookie(newAccessTokenCookie);

			// Authenticate user after refreshing token
			authenticateUser(userEmail);
		}
	}

	private void authenticateUser(String email) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(email);
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(authentication);
	}
}
