import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../store/slice/expenseSlice";
import authReducer from "../store/slice/authSlice";
import categorySlice from "../store/slice/categorySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseSlice,
        category: categorySlice
    },
});
