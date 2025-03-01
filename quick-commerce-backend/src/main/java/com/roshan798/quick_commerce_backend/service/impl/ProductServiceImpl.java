package com.roshan798.quick_commerce_backend.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.dto.product.ProductDTO;
import com.roshan798.quick_commerce_backend.exceptions.product.ProductNotFound;
import com.roshan798.quick_commerce_backend.models.Product;
import com.roshan798.quick_commerce_backend.repository.ProductRepo;
import com.roshan798.quick_commerce_backend.service.ProductService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepo repo;

	@Override
	public Product addProduct(ProductDTO product) {
		log.info("Adding new product: {}", product);
		Product newProduct = Product.builder().name(product.getName()).price(product.getPrice())
				.description(product.getDescription()).build();

		Product savedProduct = repo.save(newProduct);
		log.info("Product saved successfully: {}", savedProduct);
		return savedProduct;
	}

	@Override
	public Product getProductById(Long id) {
		log.info("Fetching product with ID: {}", id);
		Optional<Product> product = repo.findById(id);

		if (product.isEmpty()) {
			log.error("Product with ID {} not found", id);
			throw new ProductNotFound("No product with this ID: " + id);
		}

		log.info("Product found: {}", product.get());
		return product.get();
	}

	@Override
	public Page<Product> getProducts(int page, int size, String orderBy) {
		log.info("Fetching products with page: {}, size: {}, orderBy: {}", page, size, orderBy);

		// converts negative page number to positive
		if (page < 1) {
			page = 1;
		}
		// page - 1 // since using 1 based indexing for page
		Pageable pageable = PageRequest.of(page - 1, size, Sort.by(orderBy));
		Page<Product> products = repo.findAll(pageable);

		// incase of invalid page number]
		if (page > products.getTotalPages() && products.getTotalPages() > 0) {
			pageable = PageRequest.of(products.getTotalPages() - 1, size, Sort.by(orderBy));
			products = repo.findAll(pageable);
		}

		log.info("products : {}", products);
		log.info("Products fetched successfully: {} records found", products.getTotalElements());

		return products;
	}

	@Override
	public boolean deleteProductById(Long id) {
		log.info("fetching product with id: " + id);
		Optional<Product> product = repo.findById(id);
		if (product.isEmpty()) {
			log.error("Product with ID {} not found", id);
			throw new ProductNotFound("No product with this ID: " + id);
		}
		repo.deleteById(id);
		log.info("product deleted with id: " + id);
		return true;
	}

	@Override
	public Product updateProductById(Long id, ProductDTO productDTO) {
		log.info("Fetching product with ID: {}", id);
		Product existingProduct = repo.findById(id).orElseThrow(() -> new ProductNotFound("No product with ID: " + id));

		if (productDTO.getName() != null) {
			existingProduct.setName(productDTO.getName());
		}
		if (productDTO.getPrice() != null) {
			existingProduct.setPrice(productDTO.getPrice());
		}
		if (productDTO.getDescription() != null) {
			existingProduct.setDescription(productDTO.getDescription());
		}
//	    if (productDTO.getStock() != null) {
//	        existingProduct.setStock(productDTO.getStock());
//	    }

		Product updatedProduct = repo.save(existingProduct);
		log.info("Updated product with ID: {}", id);

		return updatedProduct;
	}

}
