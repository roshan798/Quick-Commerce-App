import CONFIG from "../config.ts";
import { Product } from "../types/index";
import api from "./index.ts";
const url = CONFIG.PRODUCTS;

const PRODUCTS = {
    one : (productId:number)=> `${url}/${productId}`
}

// /api/v1/products?page=1&size=10&orderBy=createdAt
export const getAllProducts = (
    page: number = 1,
    size: number = 10,
    orderBy: string = "createdAt"
) => {
    return api.get(url, {
        params: { page, size, orderBy }
    });
};

// /api/v1/products
export const addProduct = (data : Product) => {
    return api.post(url,data);
}

// /api/v1/products/1
export const getProductById = (produtId: number) => {
    return api.get(PRODUCTS.one(produtId));
}
