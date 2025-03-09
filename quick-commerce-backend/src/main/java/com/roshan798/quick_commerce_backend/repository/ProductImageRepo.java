package com.roshan798.quick_commerce_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan798.quick_commerce_backend.models.Product;
import com.roshan798.quick_commerce_backend.models.ProductImage;

@Repository
public interface ProductImageRepo extends JpaRepository<ProductImage, Long> {
	void deleteByProductAndImageUrl(Product product, String imageUrl);

	void deleteByProduct(Product product);
}
