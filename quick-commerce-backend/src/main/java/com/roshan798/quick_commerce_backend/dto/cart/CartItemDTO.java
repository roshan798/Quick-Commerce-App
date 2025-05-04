package com.roshan798.quick_commerce_backend.dto.cart;

import java.util.List;

import com.roshan798.quick_commerce_backend.models.CartItem;
import com.roshan798.quick_commerce_backend.models.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {

	private Long productId;
	private Long cartItemId;
	private String productName;
	String productDescription;
	private List<String> productImages;
	private Integer quantity;
	private Double price;

	public CartItemDTO(CartItem cartItem) {
		Product product = cartItem.getProduct();
		this.cartItemId = cartItem.getId();
		this.productId = product.getId();
		this.productName = product.getName();
		this.productDescription = product.getDescription();
		this.productImages = product.getImageUrls();
		this.quantity = cartItem.getQuantity();
		this.price = product.getPrice();

	}
}
