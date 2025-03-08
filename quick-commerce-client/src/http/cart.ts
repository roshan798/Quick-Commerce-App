import CONFIG from "../config.ts";
import api from "./index.ts";
const url = CONFIG.CART;
const CART = {
    ME: `${url}/me`,
    CLEAR: `${url}/clear`,
    add: (productId: number) => `${url}/add?productId=${productId}`,
    remove: (productId: number) => `${url}/remove?productId=${productId}`,
}

// "api/v1/cart/me"
export const getUserCart = () => {
    return api.get(CART.ME);
}

// "api/v1/cart/add?productId=1"
export const addToCart = (productId: number) => {
    return api.post(CART.add(productId), {});
}

// "api/v1/cart/remove?productId=1"
export const removeFromCart = (productId: number) => {
    return api.post(CART.remove(productId), {});
}

export const clearUserCart = () => {
    return api.delete(CART.CLEAR);
}