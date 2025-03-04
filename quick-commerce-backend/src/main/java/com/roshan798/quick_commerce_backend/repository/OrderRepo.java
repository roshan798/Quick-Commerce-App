package com.roshan798.quick_commerce_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan798.quick_commerce_backend.models.Order;
import com.roshan798.quick_commerce_backend.models.User;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
	List<Order> findAllByUser(User user);
}
