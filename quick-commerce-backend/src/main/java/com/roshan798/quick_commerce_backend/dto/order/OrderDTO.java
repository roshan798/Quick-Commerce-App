package com.roshan798.quick_commerce_backend.dto.order;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.roshan798.quick_commerce_backend.models.Order;
import com.roshan798.quick_commerce_backend.models.OrderStatus;

import lombok.Data;

@Data
public class OrderDTO {
	private Long orderId;
//	private UserDTO user;
	private OrderStatus status;

	private String type;
	private List<OrderItemDTO> items;
	private String address;

	private Instant createdAt;

	private Instant updatedAt;

	public OrderDTO(Order order) {
		this.orderId = order.getId();
//		this.user = new UserDTO(order.getUser());
		this.status = order.getStatus();
		this.address = order.getAddress();
		this.type = order.getType();
		if (order.getItems() != null) {
			this.items = order.getItems().stream().map(OrderItemDTO::new).collect(Collectors.toList());
		}
		this.createdAt = order.getCreatedAt();
		this.updatedAt = order.getUpdatedAt();
	}

	public double getTotalPrice() {
		return this.items.stream().mapToDouble(OrderItemDTO::getPrice).sum();
	}
}
