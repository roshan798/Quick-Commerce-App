package com.roshan798.quick_commerce_backend.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.roshan798.quick_commerce_backend.dto.product.ProductDTO;
import com.roshan798.quick_commerce_backend.models.Product;

@Service
public interface ProductService {
	Product addProduct(ProductDTO product);

	Product getProductById(Long id);

	Page<Product> getProducts(int page, int size, String orderBy, String direction);

	boolean deleteProductById(Long id);

	Product updateProductById(Long id, ProductDTO product);

}
