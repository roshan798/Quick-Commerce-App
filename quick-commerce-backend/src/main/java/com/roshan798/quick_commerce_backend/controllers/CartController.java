package com.roshan798.quick_commerce_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roshan798.quick_commerce_backend.dto.ResponseDTO;
import com.roshan798.quick_commerce_backend.dto.cart.CartDTO;
import com.roshan798.quick_commerce_backend.models.Cart;
import com.roshan798.quick_commerce_backend.service.CartService;
import com.roshan798.quick_commerce_backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
class AddToCartRequest {
	long productId;
	int quantity;
}

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

	@Autowired
	CartService cartService;
	@Autowired
	UserService userService;

	// CRUD
	@PostMapping
	public ResponseEntity<ResponseDTO<Void>> addProductToCart(@RequestBody AddToCartRequest data,
			HttpServletRequest request) {
		String email = (String) request.getAttribute("email");
		@SuppressWarnings("unused")
		Cart cart = cartService.addProductToCart(data.getProductId(), data.getQuantity(), email);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Product added to cart successfully.", null));
	}

	@GetMapping
	public ResponseEntity<ResponseDTO<CartDTO>> getUserCart(HttpServletRequest request) {
		String email = (String) request.getAttribute("email");
		Cart cart = cartService.getUserCart(email);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Success", new CartDTO(cart)));
	}

	@PatchMapping("/{cartItemId}")
	public ResponseEntity<ResponseDTO<String>> updateCartItemQuantity(@PathVariable Long cartItemId,
			@RequestParam Integer quantity, HttpServletRequest req) {
		String userEmail = (String) req.getAttribute("email");
		cartService.updateCartItemQuantity(cartItemId, quantity, userEmail);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Cart item updated successfully.", null));
	}

	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<ResponseDTO<String>> removeProductFromCart(@PathVariable Long cartItemId,
			HttpServletRequest req) {
		String userEmail = (String) req.getAttribute("email");
		cartService.removeProductFromCart(cartItemId, userEmail);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Product removed from cart.", null));
	}

	@DeleteMapping("/clear")
	public ResponseEntity<ResponseDTO<String>> clearCart(HttpServletRequest req) {

		String userEmail = (String) req.getAttribute("email");
		cartService.clearCart(userEmail);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Cart cleared successfully.", null));
	}

}
