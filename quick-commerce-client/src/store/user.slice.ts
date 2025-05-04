import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './types';
import { User } from '../types';

// Initial state
const initialState: UserState = {
    user: null,
};

// Create the slice with proper typing
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        logoutUser(state) {
            state.user = null;
        },
    },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
