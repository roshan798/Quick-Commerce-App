import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.slice';

// Configure the Redux store
export const store = configureStore({
    reducer: {
        auth: userReducer,
    },
});

// Define TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;