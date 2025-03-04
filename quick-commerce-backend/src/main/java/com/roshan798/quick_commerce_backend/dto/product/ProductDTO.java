package com.roshan798.quick_commerce_backend.dto.product;

import java.time.Instant;

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
	private Long productId;
	private String name;
	private String description;
	private Double price;
	private Instant updatedAt;
	private Instant createdAt;

	public ProductDTO(Product product) {
		this.productId = product.getId();
		this.name = product.getName();
//		this.image = product.getImage();
		this.description = product.getDescription();
		this.price = product.getPrice();
		this.createdAt = product.getCreatedAt();
		this.updatedAt = product.getUpdatedAt();

	}

}
