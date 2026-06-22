import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, getExpenseByCategory, updateCategory } from "@/api/categoryService";
import { getCategories } from "@/api/categoryService";

//GET CATEGORIES
export const getCategoriesData = createAsyncThunk(
    "expense/getCategories",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getCategories();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

//CREATE CATEGORY
export const createCategoryData = createAsyncThunk(
    "expense/createCategory",
    async (categoryData, { rejectWithValue }) => {
        try {
            const data = await createCategory(categoryData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

//UPDATE CATEGORY
export const updateCategoryData = createAsyncThunk(
    "expense/updateCategory",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateCategory(id, data);
            return res;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

//DELETE CATEGORY
export const deleteCategoryData = createAsyncThunk(
    "expense/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            const data = await deleteCategory(id);
            return {
                id,
                ...data,
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

//GET DASHBOARD CATEGORAY_SUMMARY
export const getExpenseByCategoryData = createAsyncThunk(
    "expense/getExpenseByCategoryData",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getExpenseByCategory();

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState: { 
        categories: [],
        expenseCategories: [],
        loading: false,
        error: null,
        categoriesLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesData.pending, (state) => {
                state.categoriesLoading = true;
            })

            .addCase(getCategoriesData.fulfilled, (state, action) => {
                state.categoriesLoading = false;
                state.categories = action.payload.data;
            })

            .addCase(getCategoriesData.rejected, (state) => {
                state.categoriesLoading = false;
            })

        //create category
        builder
            .addCase(createCategoryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload.data);
            })
            .addCase(createCategoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //delete category
        builder
            .addCase(deleteCategoryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload.id
                );
            })
            .addCase(deleteCategoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //update category
        builder
            .addCase(updateCategoryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.map((category) =>
                    category._id === action.payload.data._id
                        ? action.payload.data
                        : category
                );
            })
            .addCase(updateCategoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //GET DASHBOARD CATEGORAY_SUMMARY
        builder
            .addCase(getExpenseByCategoryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExpenseByCategoryData.fulfilled, (state, action) => {
                state.loading = false;
                state.expenseCategories = action.payload.data;
            })
            .addCase(getExpenseByCategoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categorySlice.reducer;