import CONFIG from "../config.ts";
import { Product } from "../types/index";
import api from "./index.ts";

// const PRODUCTS
export const getAllProducts = (
    page: number = 1,
    size: number = 10,
    orderBy: string = "createdAt"
) => {
    return api.get(CONFIG.PRODUCTS, {
        params: { page, size, orderBy }
    });
};
export const addProduct = (data : Product) => {
    const URL = "/api/v1/products" 
    return api.post(URL,data);
}
