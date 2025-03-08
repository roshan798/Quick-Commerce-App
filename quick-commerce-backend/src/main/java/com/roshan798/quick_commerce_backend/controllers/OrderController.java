package com.roshan798.quick_commerce_backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.roshan798.quick_commerce_backend.dto.ResponseDTO;
import com.roshan798.quick_commerce_backend.dto.order.OrderDTO;
import com.roshan798.quick_commerce_backend.dto.order.OrderRequestDto;
import com.roshan798.quick_commerce_backend.models.Order;
import com.roshan798.quick_commerce_backend.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/v1/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping
	public ResponseEntity<ResponseDTO<OrderDTO>> createOrder(@RequestBody OrderRequestDto orderRequest,
			HttpServletRequest req) {
		String userEmail = (String) req.getAttribute("email");
		Order createdOrder = orderService.createOrder(orderRequest, userEmail);

		ResponseDTO<OrderDTO> response = new ResponseDTO<>(true, "Order placed Successfully",
				new OrderDTO(createdOrder));
		return ResponseEntity.ok(response);
	}

	// ✅ 2️⃣ Get all orders (Admin)

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping
	// TODO
	public ResponseEntity<ResponseDTO<List<OrderDTO>>> getAllOrders() {
		List<OrderDTO> orders = orderService.getAllOrders().stream().map(OrderDTO::new).collect(Collectors.toList());

		return ResponseEntity.ok(new ResponseDTO<>(true, "Success", orders));
	}

	/*
	 * // Get order details (User/Admin)
	 * 
	 * @GetMapping("/{id}") public ResponseEntity<Order> getOrderById(@PathVariable
	 * Long id, @AuthenticationPrincipal String userEmail) { Order order =
	 * orderService.getOrderById(id, userEmail); return ResponseEntity.ok(order); }
	 * 
	 * //Update order status (Admin)
	 * 
	 * @PatchMapping("/{id}/status") public ResponseEntity<Order>
	 * updateOrderStatus(@PathVariable Long id, @RequestParam String status) { Order
	 * updatedOrder = orderService.updateOrderStatus(id, status); return
	 * ResponseEntity.ok(updatedOrder); }
	 **/
	@GetMapping("/me")
	public ResponseEntity<ResponseDTO<List<OrderDTO>>> getMyOrders(HttpServletRequest req) {
		String userEmail = (String) req.getAttribute("email");
		List<OrderDTO> orders = orderService.getOrdersByUser(userEmail).stream().map(OrderDTO::new)
				.collect(Collectors.toList());
		return ResponseEntity.ok(new ResponseDTO<>(true, "Success", orders));
	}

}
