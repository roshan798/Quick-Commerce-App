import CONFIG from "../config.ts";
// import { Product } from "../types/index";
import api from "./index.ts";
const url = CONFIG.PRODUCTS;

const PRODUCTS = {
    one: (productId: number) => `${url}/${productId}`,
}

// /api/v1/products?page=1&size=10&orderBy=createdAt-desc
// /api/v1/products?page=1&size=10&orderBy=createdAt-asc
export const getAllProducts = (
    page: number = 1,
    size: number = 10,
    orderBy?: string,
    orderDir: string = "desc",
) => {
    const sortingOrder = (orderBy ? `${orderBy}-${orderDir}` : orderBy);
    return api.get(url, {
        params: { page, size, sortingOrder }
    });
};


// /api/v1/products
export const addProduct = (data: ProductDTO) => {
    return api.post(url, data);
}

// /api/v1/products/1
export const getProductById = (productId: number) => {
    return api.get(PRODUCTS.one(productId));
}

// /api/v1/products/1
export const updateProductById = (productId: number, data: ProductDTO) => {
    return api.put(PRODUCTS.one(productId), data);
}

// /api/v1/products/1
export const deleteProductById = (productId: number) => {
    return api.delete(PRODUCTS.one(productId));
}

export type ProductDTO = {
    name: string,
    description: string,
    price: number,
}