package com.roshan798.quick_commerce_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan798.quick_commerce_backend.models.Cart;
import com.roshan798.quick_commerce_backend.models.User;

@Repository
public interface CartRepo extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUser(User user);
}
