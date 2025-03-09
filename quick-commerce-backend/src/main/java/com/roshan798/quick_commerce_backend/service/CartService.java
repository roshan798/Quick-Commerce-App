package com.roshan798.quick_commerce_backend.service;

import com.roshan798.quick_commerce_backend.models.Cart;

public interface CartService {
	Cart updateCartItemQuantity(long productId, String userEmail, String operationType);

	Cart removeProductFromCart(Long productId, String userEmail);

	public Cart getUserCart(String userEmail);

	public void clearCart(String userEmail);
}
