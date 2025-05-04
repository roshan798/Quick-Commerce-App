import CONFIG from '../config.ts';
import api from './index.ts';
const url = CONFIG.CART;
const CART = {
    BASE: url,
    ME: `${url}`,
    CLEAR: `${url}`,
    add: (productId: number) => `${url}/items?productId=${productId}`,
    remove: (productId: number) =>
        `${url}/items/decrease?productId=${productId}`,
    removeItem: (productId: number) => `${url}/items/${productId}`,
};

export const getUserCart = () => {
    return api.get(CART.ME);
};

export const addToCart = (productId: number) => {
    return api.post(CART.add(productId), {});
};

export const removeFromCart = (productId: number) => {
    return api.post(CART.remove(productId), {});
};
export const removeItemFromCart = (productId: number) => {
    return api.delete(CART.removeItem(productId));
};

export const clearUserCart = () => {
    return api.delete(CART.CLEAR);
};
