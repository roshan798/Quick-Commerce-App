package com.roshan798.quick_commerce_backend.service;

import java.util.List;

import com.roshan798.quick_commerce_backend.dto.order.OrderRequestDto;
import com.roshan798.quick_commerce_backend.models.Order;

public interface OrderService {

	Order createOrder(OrderRequestDto orderReq, String userEmail);

	List<Order> getAllOrders();

	List<Order> getOrdersByUser(String userEmail);

}
