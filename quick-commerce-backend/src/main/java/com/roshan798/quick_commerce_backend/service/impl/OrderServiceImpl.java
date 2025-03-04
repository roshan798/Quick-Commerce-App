package com.roshan798.quick_commerce_backend.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.dto.order.OrderRequestDto;
import com.roshan798.quick_commerce_backend.models.Order;
import com.roshan798.quick_commerce_backend.models.OrderItem;
import com.roshan798.quick_commerce_backend.models.OrderStatus;
import com.roshan798.quick_commerce_backend.models.Product;
import com.roshan798.quick_commerce_backend.models.User;
import com.roshan798.quick_commerce_backend.repository.OrderItemRepo;
import com.roshan798.quick_commerce_backend.repository.OrderRepo;
import com.roshan798.quick_commerce_backend.service.OrderService;
import com.roshan798.quick_commerce_backend.service.ProductService;
import com.roshan798.quick_commerce_backend.service.UserService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	UserService userService;

	@Autowired
	ProductService productService;

	@Autowired
	OrderRepo orderRepo;

	@Autowired
	OrderItemRepo orderItemRepo;

	@Override
	@Transactional
	public Order createOrder(OrderRequestDto orderReq, String userEmail) {
		log.info("Entering createOrder for user: {}", userEmail);

		if (orderReq.getProducts() == null || orderReq.getProducts().isEmpty()) {
			log.error("Order must contain at least one product.");
			throw new IllegalArgumentException("Order must contain at least one product.");
		}

		User user = userService.getUserByEmail(userEmail);
		log.info("Fetched user: {}", user.getEmail());

		Order order = Order.builder().user(user).address(orderReq.getAddress()).type(orderReq.getType())
				.status(OrderStatus.PENDING).build();

		Order savedOrder = orderRepo.save(order);
		log.info("Order saved with ID: {}", savedOrder.getId());

		List<OrderItem> orderItems = orderReq.getProducts().stream().map(productDto -> {
			Product product = productService.getProductById(productDto.getProductId());
			log.info("Fetched product with ID: {}", product.getId());

			OrderItem orderItem = new OrderItem();
			orderItem.setOrder(savedOrder);
			orderItem.setProduct(product);
			orderItem.setQuantity(productDto.getQuantity());
			orderItem.setPrice(product.getPrice() * productDto.getQuantity());

			return orderItem;
		}).collect(Collectors.toList());

		List<OrderItem> savedItems = orderItemRepo.saveAll(orderItems);
		log.info("Order items saved for order ID: {}", savedOrder.getId());

		savedOrder.setItems(savedItems);
		return savedOrder;
	}

	@Override
//	TODO
	public List<Order> getAllOrders() {
		List<Order> orders = orderRepo.findAll();
		return orders;
	}

	@Override
	public List<Order> getOrdersByUser(String userEmail) {
		User user = userService.getUserByEmail(userEmail);
		List<Order> orders = orderRepo.findAllByUser(user);
		return orders;
	}

}