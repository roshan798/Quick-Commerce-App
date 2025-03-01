package com.roshan798.quick_commerce_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan798.quick_commerce_backend.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
	Optional<User> findByEmailAndEnabledTrue(String email);
}
