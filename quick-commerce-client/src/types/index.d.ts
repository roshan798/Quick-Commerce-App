export interface User {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

