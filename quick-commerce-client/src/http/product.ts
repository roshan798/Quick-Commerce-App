import CONFIG from "../config.ts";
import api from "./index.ts";

export const getAllProducts = (
    page: number = 1,
    size: number = 10,
    orderBy: string = "createdAt"
) => {
    return api.get(CONFIG.PRODUCTS, {
        params: { page, size, orderBy }
    });
};
