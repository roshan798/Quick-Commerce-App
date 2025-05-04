import CONFIG from '../config.ts';
import type { LoginRequest, SignupRequest } from '../types/auth.d.ts';
import api from './index.ts';

const { AUTH } = CONFIG;

// /api/v1/auth/register
export const signup = (data: SignupRequest) => {
    return api.post(AUTH.SIGNUP, data);
};
// /api/v1/auth/login
export const login = (data: LoginRequest) => {
    return api.post(AUTH.LOGIN, data);
};
// /api/v1/auth/logout
export const logout = () => {
    return api.post(AUTH.LOGOUT);
};

// /api/v1/auth/refresh
export const refresh = () => {
    return api.post(AUTH.REFRESH);
};
