type UserRole = 'ROLE_ADMIN' | 'ROLE_CUSTOMER' | 'ROLE_DELIVERY_PERSON';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
}
export interface Cart {
    cartId: number;
    userId: number;
    cartItems: CartItem[];
    totalPrice: number;
}

export interface CartItem {
    productId: number;
    cartItemId: number;
    productName: string;
    productDescription: string;
    productImages?: string[];
    quantity: number;
    price: number;
}

export interface Product {
    productId: number;
    name: string;
    description: string;
    images: ?string[];
    price: number;
    updatedAt: string;
    createdAt: string;
}
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface ImageUploadResultDTO {
    fileName: string;
    success: boolean;
    imageUrl?: string; // Optional, only present if success is true
    errorMessage?: string; // Optional, only present if success is false
    sizeInBytes: number;
}

export type PagesData = {
    path: string;
    name: string;
    component: React.LazyExoticComponent<React.ComponentType<unknown>>;
};
