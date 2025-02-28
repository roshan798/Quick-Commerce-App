package com.roshan798.quick_commerce_backend.exceptions;

public class InvalidTokenException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L; // to remove warning

	public InvalidTokenException(String message) {
		super(message);
	}
}
