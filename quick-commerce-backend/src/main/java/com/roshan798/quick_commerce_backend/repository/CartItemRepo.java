package com.roshan798.quick_commerce_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.roshan798.quick_commerce_backend.models.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}
