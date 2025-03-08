import { configureStore} from '@reduxjs/toolkit';
import userReducer from './user.slice';
import cartReducer from "./cart.slice"
// Configure the Redux store
export const store = configureStore({
    reducer: {
        auth: userReducer,
        cart : cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch } from "react-redux";
// import type { AppDispatch } from "../store"; // Adjust path if needed

export const useAppDispatch = () => useDispatch<AppDispatch>();
