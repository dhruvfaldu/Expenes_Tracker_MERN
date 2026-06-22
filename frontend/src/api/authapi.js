import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest =
            error.config;

        if (
            error.response?.status ===
                401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry =
                true;

            await api.post(
                "/auth/refresh-token"
            );

            return api(
                originalRequest
            );
        }

        return Promise.reject(
            error
        );
    }
);

export const login = async (data) => {
    const response = await API.post("auth/login", data);
    return response.data;
}

export const register = async (data) => {
    const response = await API.post("auth/register", data);
    return response.data;
}

export const logout = async () => {
    const response = await API.post("auth/logout");
    return response.data;
}

export const getMe = async () => {
    const response = await API.get("auth/me");
    return response.data;
}