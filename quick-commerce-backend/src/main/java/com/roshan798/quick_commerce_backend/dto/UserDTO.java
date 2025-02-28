package com.roshan798.quick_commerce_backend.dto;

import java.time.Instant;

import com.roshan798.quick_commerce_backend.models.Role;
import com.roshan798.quick_commerce_backend.models.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
	private Long id;
	private String name;
	private String email;
	private Role role;
	private Instant created_at;
	private Instant updated_at;

	public UserDTO(User user) {
		this.id = user.getId();
		this.name = user.getName();
		this.email = user.getEmail();
		this.role = user.getRole();
		this.created_at = user.getCreatedAt();
		this.updated_at = user.getUpdatedAt();
	}

}
