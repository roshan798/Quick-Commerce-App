package com.roshan798.quick_commerce_backend.dto.order;

import com.roshan798.quick_commerce_backend.dto.product.ProductDTO;
import com.roshan798.quick_commerce_backend.models.OrderItem;

import lombok.Data;

@Data
public class OrderItemDTO {
	private Long orderItemId;
	private ProductDTO product;
	private Integer quantity;
	private Double price;

	public OrderItemDTO(OrderItem item) {
		this.orderItemId = item.getId();
		this.product = new ProductDTO(item.getProduct());
		this.quantity = item.getQuantity();
		this.price = item.getProduct().getPrice() * item.getQuantity();
	}

}
