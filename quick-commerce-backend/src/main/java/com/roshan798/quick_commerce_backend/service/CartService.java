package com.roshan798.quick_commerce_backend.service;

import com.roshan798.quick_commerce_backend.models.Cart;

public interface CartService {
	public Cart addProductToCart(long productId, int quantity, String userEmail);

	public Cart getUserCart(String userEmail);

	public void updateCartItemQuantity(Long cartItemId, Integer quantity, String userEmail);

	public void removeProductFromCart(Long cartItemId, String userEmail);

	public void clearCart(String userEmail);
}
