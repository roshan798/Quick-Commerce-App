package com.roshan798.quick_commerce_backend.dto.product;

import java.time.Instant;
import java.util.List;

import com.roshan798.quick_commerce_backend.models.Inventory;
import com.roshan798.quick_commerce_backend.models.Order;
import com.roshan798.quick_commerce_backend.models.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
	private Long id;
	private String name;
//	private String image;
	private String description;
	private Double price;
	private Instant updatedAt;
	private Instant createdAt;
	private List<Order> orders;
	private List<Inventory> inventories;

	public ProductDTO(Product product) {
		this.id = product.getId();
		this.name = product.getName();
//		this.image = product.getImage();
		this.description = product.getDescription();
		this.price = product.getPrice();
		this.createdAt = product.getCreatedAt();
		this.updatedAt = product.getUpdatedAt();
		this.orders = product.getOrders();
		this.inventories = product.getInventories();
	}

}
