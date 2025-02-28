package com.roshan798.quick_commerce_backend.dto;

import com.roshan798.quick_commerce_backend.models.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRegisterDTO {
    private String name;
    private String email;
    private String password;
    private Role role;
}
