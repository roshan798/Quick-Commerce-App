import { ApiResponse, User } from '.';

export type LoginRequest = {
    email: string;
    password: string;
};

export type SignupRequest = {
    name: string;
    email: string;
    password: string;
};

export type LoginResponse = ApiResponse<User>;
export type SignupResponse = ApiResponse<User>;
