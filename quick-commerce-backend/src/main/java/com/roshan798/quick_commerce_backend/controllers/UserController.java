package com.roshan798.quick_commerce_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roshan798.quick_commerce_backend.dto.ResponseDTO;
import com.roshan798.quick_commerce_backend.dto.UserDTO;
import com.roshan798.quick_commerce_backend.models.User;
import com.roshan798.quick_commerce_backend.service.UserService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("api/v1/users")
//@CrossOrigin("**")
public class UserController {

	@Autowired
	private UserService service;

	@GetMapping("/{id}")
	protected ResponseEntity<ResponseDTO<UserDTO>> getUserById(@RequestParam Long id) {
		log.info("Fetching user with ID: {}", id);
		User user = service.getUserById(id);
		ResponseDTO<UserDTO> response = new ResponseDTO<>(true, "success", new UserDTO(user));
		log.info("User fetched successfully: {}", user.getId());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@RequestMapping("/debug/cookies")
	public ResponseEntity<?> debugCookies(HttpServletRequest request) {
		log.info("Entering cookie debug endpoint");
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				log.info("Cookie: {} = {}", cookie.getName(), cookie.getValue());
			}
		} else {
			log.info("No cookies found");
		}
		return ResponseEntity.ok("Check server logs for cookies.");
	}
}
