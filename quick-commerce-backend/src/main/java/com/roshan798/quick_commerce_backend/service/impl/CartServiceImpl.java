package com.roshan798.quick_commerce_backend.service.impl;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.models.Cart;
import com.roshan798.quick_commerce_backend.models.CartItem;
import com.roshan798.quick_commerce_backend.models.Product;
import com.roshan798.quick_commerce_backend.models.User;
import com.roshan798.quick_commerce_backend.repository.CartItemRepo;
import com.roshan798.quick_commerce_backend.repository.CartRepo;
import com.roshan798.quick_commerce_backend.service.CartService;
import com.roshan798.quick_commerce_backend.service.ProductService;
import com.roshan798.quick_commerce_backend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartRepo cartRepo;

	@Autowired
	CartItemRepo cartItemRepo;

	@Autowired
	UserService userService;

	@Autowired
	ProductService productService;

	@Override
	public Cart getUserCart(String userEmail) {
		log.info("Fetching cart for user: {}", userEmail);
		User user = userService.getUserByEmail(userEmail);
		Cart cart = cartRepo.findByUser(user).orElseGet(() -> {
			log.info("Cart not found for user: {}. Creating a new cart.", user.getEmail());
			Cart newCart = Cart.builder().user(user).cartItems(new ArrayList<>()).build();
			return cartRepo.save(newCart);
		});
		log.info("Cart fetched successfully for user: {}", user.getEmail());
		return cart;
	}

	@Override
	public Cart updateCartItemQuantity(long productId, String userEmail, String operationType) {

		log.info("Adding product {}  to cart for user: {}", productId, userEmail);

		Cart cart = this.getUserCart(userEmail);

		Optional<CartItem> existingItem = cart.getCartItems().stream()
				.filter(item -> item.getProduct().getId().equals(productId)).findFirst();
		// TODO
		// when adding a product to cart so check the availablility first

		if (existingItem.isPresent()) {
			log.info("Product {} already exists in cart. Updating quantity.", productId);
			if (operationType.equals("ADD")) {
				existingItem.get().setQuantity(existingItem.get().getQuantity() + 1); // adding one
			} else if (operationType.equals("REMOVE")) {
				existingItem.get().setQuantity(existingItem.get().getQuantity() - 1); // removing one
				if (existingItem.get().getQuantity() == 0) {
					// remove the item from the cart
					cart.getCartItems().remove(existingItem.get());
					log.info("REMOVE THE ITEM FROM THE CART");
				}
			}
		} else {
			log.info("Product {} not found in cart. Adding new item.", productId);
			if (operationType.equals("ADD")) {
				Product product = productService.getProductById(productId);
				CartItem newItem = CartItem.builder().cart(cart).product(product).quantity(1).build();
				cart.getCartItems().add(newItem);
			}
		}
		Cart updatedCart = cartRepo.save(cart);
		log.info("Cart updated successfully for user: {}", userEmail);
		return updatedCart;
	}

//	@Override
//	public void updateCartItemQuantity(Long cartItemId, Integer quantity, String loggedInUserEmail) {
//		log.info("Updating quantity of cart item {} to {}", cartItemId, quantity);
//
//		// change type of exception
//		CartItem cartItem = cartItemRepo.findById(cartItemId)
//				.orElseThrow(() -> new RuntimeException("Cart item not found"));
//
//		// Validate that the cart item belongs to the logged-in user
//		User user = cartItem.getCart().getUser();
////	    String loggedInUserEmail = userService.getAuthenticatedUserEmail();
//		if (!user.getEmail().equals(loggedInUserEmail)) {
//			throw new RuntimeException("Unauthorized to modify this cart item");
//		}
//
//		// If quantity is 0 or negative, remove the item from the cart
//		if (quantity < 1) {
//			log.info("Quantity is {}. Removing cart item {}", quantity, cartItemId);
//			cartItem.getCart().getCartItems().remove(cartItem);
//			cartRepo.save(cartItem.getCart());
//			return;
//		}
//
//		// TODO: Check if the requested quantity is within stock limits in the users
//		// specific area or pincode
//
//		// Update the quantity
//		cartItem.setQuantity(quantity);
//		cartRepo.save(cartItem.getCart());
//
//		log.info("Cart item {} updated successfully to quantity {}", cartItemId, quantity);
//	}

//	@Override
//	public void removeProductFromCart(Long cartItemId, String userEmail) {
//		log.info("Removing product from cart. CartItem ID: {}, User: {}", cartItemId, userEmail);
//
//		CartItem cartItem = cartItemRepo.findById(cartItemId)
//				.orElseThrow(() -> new RuntimeException("Cart item not found"));
//
//		User user = cartItem.getCart().getUser();
//		if (!user.getEmail().equals(userEmail)) {
//			throw new RuntimeException("Unauthorized to remove this cart item");
//		}
//
//		Cart cart = cartItem.getCart();
//		cart.getCartItems().remove(cartItem);
//		cartRepo.save(cart);
//		cartItemRepo.delete(cartItem);
//
//		log.info("Cart item {} removed successfully for user {}", cartItemId, userEmail);
//	}

	@Override
	public void clearCart(String userEmail) {
		log.info("Clearing cart for user: {}", userEmail);
		Cart cart = this.getUserCart(userEmail);
		if (cart.getCartItems().isEmpty()) {
			log.info("Cart is already empty for user: {}", userEmail);
			return;
		}
		// first delete all from cartItem then save the cart
		cartItemRepo.deleteAll(cart.getCartItems());

		cart.getCartItems().clear();
		cartRepo.save(cart);

		log.info("Cart cleared successfully for user: {}", userEmail);
	}

}
