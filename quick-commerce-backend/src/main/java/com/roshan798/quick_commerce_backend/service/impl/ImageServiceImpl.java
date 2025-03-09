package com.roshan798.quick_commerce_backend.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.roshan798.quick_commerce_backend.models.Product;
import com.roshan798.quick_commerce_backend.models.ProductImage;
import com.roshan798.quick_commerce_backend.repository.ProductImageRepo;
import com.roshan798.quick_commerce_backend.repository.ProductRepo;
import com.roshan798.quick_commerce_backend.service.ImageService;

@Service
public class ImageServiceImpl implements ImageService {

	private static final Logger log = LoggerFactory.getLogger(ImageServiceImpl.class);

	private static final String IMAGE_DIR = "src/main/resources/static/images/";
	private static final String DELETED_DIR = "src/main/resources/static/deleted/";

	@Autowired
	private ProductRepo productRepo;

	@Autowired
	private ProductImageRepo productImageRepo;

	@Override
	public List<String> uploadImages(MultipartFile[] files, Long productId) throws IllegalStateException, IOException {
		log.info("Uploading images for product ID: {}", productId);

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

		File directory = new File(IMAGE_DIR + productId);
		if (!directory.exists()) {
			directory.mkdirs();
			log.info("Created directory: {}", directory.getAbsolutePath());
		}

		List<String> imageUrls = new ArrayList<>();

		for (MultipartFile file : files) {
			if (file.isEmpty()) {
				log.warn("Skipped empty file.");
				continue;
			}

			String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
			Path filePath = Paths.get(directory.getAbsolutePath(), fileName);
			file.transferTo(filePath.toFile());

			log.info("Image uploaded successfully: {}", filePath.toString());

			String imageUrl = "/images/" + productId + "/" + fileName;
			ProductImage productImage = ProductImage.builder().imageUrl(imageUrl).product(product).build();

			productImageRepo.save(productImage);
			imageUrls.add(imageUrl);
		}

		log.info("Total {} images uploaded successfully.", imageUrls.size());
		return imageUrls;
	}

	@Override
	public boolean deleteImage(Long productId, String fileName) {
		log.info("Deleting image '{}' for product ID: {}", fileName, productId);

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

		Path imagePath = Paths.get(IMAGE_DIR + productId, fileName);
		Path deletedPath = Paths.get(DELETED_DIR + productId, fileName);

		try {
			Files.createDirectories(deletedPath.getParent());
			Files.move(imagePath, deletedPath);
			log.info("Image moved to deleted folder: {}", deletedPath.toString());

			productImageRepo.deleteByProductAndImageUrl(product, "/images/" + productId + "/" + fileName);
			log.info("Image removed from database: {}", fileName);

			return true;
		} catch (IOException e) {
			log.error("Failed to delete image '{}': {}", fileName, e.getMessage());
			return false;
		}
	}

	@Override
	public boolean deleteAllImages(Long productId) {
		log.info("Deleting all images for product ID: {}", productId);

		Product product = productRepo.findById(productId)
				.orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));

		File productFolder = new File(IMAGE_DIR + productId);
		File deletedFolder = new File(DELETED_DIR + productId);

		if (productFolder.exists()) {
			if (!deletedFolder.exists()) {
				deletedFolder.mkdirs();
				log.info("Created deleted images directory: {}", deletedFolder.getAbsolutePath());
			}

			File[] files = productFolder.listFiles();
			if (files != null) {
				for (File file : files) {
					boolean moved = file.renameTo(new File(deletedFolder, file.getName()));
					if (moved) {
						log.info("Moved image to deleted folder: {}", file.getName());
					} else {
						log.warn("Failed to move image: {}", file.getName());
					}
				}
			}

			productImageRepo.deleteByProduct(product);
			log.info("All images removed from database for product ID: {}", productId);
			return true;
		}

		log.warn("No images found for product ID: {}", productId);
		return false;
	}
}
