package com.roshan798.quick_commerce_backend.exceptions;

public class UserAlreadyExist extends RuntimeException {
	public UserAlreadyExist(String msg) {
		super(msg);
	}
}
