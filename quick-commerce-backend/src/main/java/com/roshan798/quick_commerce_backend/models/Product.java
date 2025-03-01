package com.roshan798.quick_commerce_backend.models;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String image;
	private String description;
	private Integer price;

	@CreationTimestamp
	@Column(updatable = false, nullable = false)
	private Instant createdAt;

	@UpdateTimestamp
	@Column(nullable = false)
	private Instant updatedAt;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order> orders;

	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Inventory> inventories;
}
