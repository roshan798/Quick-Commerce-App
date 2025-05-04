package com.roshan798.quick_commerce_backend.service;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.web.multipart.MultipartFile;

import com.roshan798.quick_commerce_backend.dto.image.ImageUploadResultDTO;

@Lazy
public interface ImageService {

	public List<ImageUploadResultDTO> uploadImages(MultipartFile[] files, Long productId) throws Exception;

	boolean deleteImage(Long productId, String fileName);

	boolean deleteAllImages(Long productId);

}
