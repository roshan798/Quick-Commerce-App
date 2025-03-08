import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./types";
import { ApiResponse, Cart, CartItem } from "../types";
import { addToCart, removeFromCart, getUserCart, clearUserCart } from "../http/cart";
import { AppDispatch } from "../store";

const initialState: CartState = {
    cart: null,
};

const updateTotalPrice = (state: CartState) => {
    if (state.cart) {
        state.cart = {
            ...state.cart,
            totalPrice: state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
        };
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Cart | null>) => {
            state.cart = action.payload;
            updateTotalPrice(state);
        },
        addAProduct: (state, action: PayloadAction<CartItem>) => {
            if (state.cart) {
                state.cart = {
                    ...state.cart,
                    cartItems: [...state.cart.cartItems, action.payload]
                };
                updateTotalPrice(state);
            }
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            if (state.cart) {
                state.cart = {
                    ...state.cart,
                    cartItems: state.cart.cartItems.map(item =>
                        item.productId === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
                updateTotalPrice(state);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            if (state.cart) {
                state.cart = {
                    ...state.cart,
                    cartItems: state.cart.cartItems
                        .map(item =>
                            item.productId === action.payload 
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter(item => item.quantity > 0)
                };
                updateTotalPrice(state);
            }
        },
        clearCart: (state) => {
            state.cart = null;
        },
    },
});
const { setCart, increaseQuantity, decreaseQuantity, clearCart, addAProduct } = cartSlice.actions;

export const fetchCart = () => async (dispatch: AppDispatch) => {
    try {
        const response = await getUserCart();
        dispatch(setCart(response.data.data));
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
};

export const addProductToCart = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await addToCart(productId);
        const data: ApiResponse<Cart> = res.data;
        const addedProduct = data.data.cartItems.find(a => a.productId === productId);
        if (addedProduct) {
            if (addedProduct.quantity === 1) {
                dispatch(addAProduct(addedProduct));
            } else {
                dispatch(increaseQuantity(productId));
            }
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

export const removeProductFromCart = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        await removeFromCart(productId);
        dispatch(decreaseQuantity(productId));
    } catch (error) {
        console.error("Error removing product from cart:", error);
    }
};

export const clearCartItems = () => async (dispatch: AppDispatch) => {
    try {
        await clearUserCart();
        dispatch(clearCart());
    } catch (error) {
        console.error("Error clearing cart:", error);
    }
};
export { clearCart };
export default cartSlice.reducer;
