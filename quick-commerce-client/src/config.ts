const CONFIG = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
    AUTH: {
        LOGIN: "/auth/login",
        SIGNUP: "/auth/signup",
        LOGOUT: "/auth/logout", 
        REFRESH: "/auth/refresh", 
    },
};

export default CONFIG;
