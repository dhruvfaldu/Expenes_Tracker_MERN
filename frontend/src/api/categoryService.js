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
    }
)

export const getCategories = async () => {
    const response = await API.get("/categories");
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await API.post("/categories", categoryData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
};

export const updateCategory = async (id, data) => {
    const response = await API.put(`/categories/${id}`, data);
    return response.data;
};

export const getExpenseByCategory = async () => {
    const response = await API.get("/dashboard/expense-category");
    return response.data;
};