package com.roshan798.quick_commerce_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan798.quick_commerce_backend.models.CartItem;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}
