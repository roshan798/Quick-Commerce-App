package com.roshan798.quick_commerce_backend.models;

import java.time.Instant;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "warehouses")
@Data
public class Warehouse {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String pincode;

	@Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Instant updatedAt;

	@Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Instant createdAt;

	@OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Inventory> inventories;

	@OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DeliveryPerson> deliveryPersons;
}
