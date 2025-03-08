package com.roshan798.quick_commerce_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
//	@PatchMapping("/add")
	@PostMapping("/add")
	public ResponseEntity<ResponseDTO<CartDTO>> addAProductToCart(@RequestParam Long productId,
			HttpServletRequest request) {
		String email = (String) request.getAttribute("email");
		@SuppressWarnings("unused")
		Cart cart = cartService.updateCartItemQuantity(productId, email, "ADD");
		CartDTO cartDTO = new CartDTO(cart);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Success", cartDTO));
	}

//	@PatchMapping("/remove")
	@PostMapping("/remove")
	public ResponseEntity<ResponseDTO<CartDTO>> removeAProductToCart(@RequestParam Long productId,
			HttpServletRequest request) {
		String email = (String) request.getAttribute("email");
		@SuppressWarnings("unused")
		Cart cart = cartService.updateCartItemQuantity(productId, email, "REMOVE");
		CartDTO cartDTO = new CartDTO(cart);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Success", cartDTO));
	}

	@GetMapping("/me")
	public ResponseEntity<ResponseDTO<CartDTO>> getUserCart(HttpServletRequest request) {
		String email = (String) request.getAttribute("email");
		Cart cart = cartService.getUserCart(email);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Success", new CartDTO(cart)));
	}

//	@PatchMapping("/{cartItemId}")
//	public ResponseEntity<ResponseDTO<String>> updateCartItemQuantity(@PathVariable Long cartItemId,
//			@RequestParam Integer quantity, HttpServletRequest req) {
//		String userEmail = (String) req.getAttribute("email");
//		cartService.updateCartItemQuantity(cartItemId, quantity, userEmail);
//		return ResponseEntity.ok(new ResponseDTO<>(true, "Cart item updated successfully.", null));
//	}

//	@DeleteMapping("/{cartItemId}")
//	public ResponseEntity<ResponseDTO<String>> removeProductFromCart(@PathVariable Long cartItemId,
//			HttpServletRequest req) {
//		String userEmail = (String) req.getAttribute("email");
//		cartService.removeProductFromCart(cartItemId, userEmail);
//		return ResponseEntity.ok(new ResponseDTO<>(true, "Product removed from cart.", null));
//	}

	@DeleteMapping("/clear")
	public ResponseEntity<ResponseDTO<String>> clearCart(HttpServletRequest req) {

		String userEmail = (String) req.getAttribute("email");
		cartService.clearCart(userEmail);
		return ResponseEntity.ok(new ResponseDTO<>(true, "Cart cleared successfully.", null));
	}

}
