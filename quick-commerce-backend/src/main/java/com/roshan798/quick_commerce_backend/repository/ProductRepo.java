package com.roshan798.quick_commerce_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.roshan798.quick_commerce_backend.models.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

	@Override
	Page<Product> findAll(Pageable pageable);
}
