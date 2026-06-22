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

export const getDashboard = async () => {
    const response = await API.get("/dashboard");
    return response.data;
}

export const getMonthlySummary = async () => {
    const response = await API.get("/dashboard/monthly-summary");
    return response.data;
}
