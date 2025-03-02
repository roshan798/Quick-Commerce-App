package com.roshan798.quick_commerce_backend.dto.cart;

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
	private String productImage;
	private Integer quantity;
	private Double price;

	public CartItemDTO(CartItem cartItem) {
		Product product = cartItem.getProduct();
		this.cartItemId = cartItem.getId();
		this.productId = product.getId();
		this.productName = product.getName();
		this.productImage = product.getImage();
		this.quantity = cartItem.getQuantity();
		this.price = product.getPrice();
	}
}
