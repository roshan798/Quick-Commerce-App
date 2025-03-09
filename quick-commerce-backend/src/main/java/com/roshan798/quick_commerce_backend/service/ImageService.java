package com.roshan798.quick_commerce_backend.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

	public List<String> uploadImages(MultipartFile[] files, Long productId) throws Exception;

	boolean deleteImage(Long productId, String fileName);

	boolean deleteAllImages(Long productId);

}
