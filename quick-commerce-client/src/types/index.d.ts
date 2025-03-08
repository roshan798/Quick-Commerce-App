export interface User {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}
export interface Cart {
    cartId: number
    userId: number
    cartItems: CartItem[]
    totalPrice: number
}

export interface CartItem {
    productId: number
    cartItemId: number
    productName: string
    productImage?: string
    quantity: number
    price: number
}


export interface Product {
    productId: number
    name: string
    description: string
    price: number
    updatedAt: string
    createdAt: string
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



