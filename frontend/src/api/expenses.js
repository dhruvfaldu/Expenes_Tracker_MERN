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

export const createTranstion = async (data) => {
    const response = await API.post("/transactions", data);
    return response.data;
};


export const getTransactions = async (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);

    if (filters.type && filters.type !== "all")
        params.append("type", filters.type);

    if (filters.category && filters.category !== "all")
        params.append("category", filters.category);

    if (filters.month)
        params.append("month", filters.month);

    const res = await API.get(`/transactions?${params.toString()}`); // ✅ FIX HERE

    return res.data;
};

export const deleteTransaction = async (id) => {
    const response = await API.delete(`/transactions/${id}`);
    return response.data;
};

export const updateTransaction = async (id, data) => {
    const response = await API.put(`/transactions/${id}`, data);
    return response.data;
};

export const getTransaction = async (id) => {
    const response = await API.get(`/transactions/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await API.get("/categories");
    return response.data;
}