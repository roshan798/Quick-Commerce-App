package com.roshan798.quick_commerce_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.roshan798.quick_commerce_backend.dto.ResponseDTO;
import com.roshan798.quick_commerce_backend.dto.product.PaginatedResponseDTO;
import com.roshan798.quick_commerce_backend.dto.product.ProductDTO;
import com.roshan798.quick_commerce_backend.models.Product;
import com.roshan798.quick_commerce_backend.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

	@Autowired
	private ProductService service;

	// @PreAuthorize("hasRole('ADMIN')") // Uncomment when role-based access is
	// added
	@PostMapping
	public ResponseEntity<ResponseDTO<ProductDTO>> createProduct(@RequestBody ProductDTO product) {
		log.info("Entering createProduct with request body: {}", product);
		Product savedProduct = service.addProduct(product);
		ProductDTO responseProduct = new ProductDTO(savedProduct);

		ResponseDTO<ProductDTO> response = new ResponseDTO<>(true, "Product added successfully", responseProduct);
		log.info("Exiting createProduct with response: {}", response);

		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	@GetMapping("/{id}")
	public ResponseEntity<ResponseDTO<ProductDTO>> getProductById(@PathVariable Long id) {
		log.info("Entering getProductById with ID: {}", id);
		Product product = service.getProductById(id);
		ProductDTO responseProduct = new ProductDTO(product);

		ResponseDTO<ProductDTO> response = new ResponseDTO<>(true, "Success", responseProduct);
		log.info("Exiting getProductById with response: {}", response);

		return ResponseEntity.ok(response);
	}

	@GetMapping
	public ResponseEntity<PaginatedResponseDTO<ProductDTO>> getProducts(@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "name") String orderBy) {

		log.info("Fetching products - Page: {}, Size: {}, OrderBy: {}", page, size, orderBy);

		Page<Product> productPage = service.getProducts(page, size, orderBy);

		// Convert Product to DTO
		List<ProductDTO> productDTOs = productPage.getContent().stream().map(ProductDTO::new).toList();

		PaginatedResponseDTO<ProductDTO> responseDTO = new PaginatedResponseDTO<>(true, "Products fetched successfully",
				productDTOs, productPage.getNumber() + 1, // Convert back to 1-based index for response
				productPage.getSize(), productPage.getTotalElements(), productPage.getTotalPages(),
				productPage.isFirst(), productPage.isLast());

		return ResponseEntity.ok(responseDTO);
	}
}
