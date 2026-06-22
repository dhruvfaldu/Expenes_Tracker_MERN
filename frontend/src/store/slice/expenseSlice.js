import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createTranstion, getTransactions, getCategories, updateTransaction, deleteTransaction } from "../../api/expenses";
import { getDashboard, getMonthlySummary } from "../../api/dashboard";

// CREATE TRANSACTION
export const createTran = createAsyncThunk(
    "expense/createTran",
    async (transactionData, { rejectWithValue }) => {
        try {
            const data = await createTranstion(transactionData);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
);

//UPDATE TRANSACTION
export const updateTran = createAsyncThunk(
    "expense/updateTran",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await updateTransaction(id, data);
            return res;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)

//DELETE TRANSACTION
export const deleteTran = createAsyncThunk(
    "expense/deleteTran",
    async (id, { rejectWithValue }) => {
        try {
            const data = await deleteTransaction(id);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)

//GET TRANSACTIONS
export const getTransactionsData = createAsyncThunk(
    "expense/getTransactionsData",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const data = await getTransactions(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

//GET DASHBOARD DATA
export const getDashboardData = createAsyncThunk(
    "expense/getDashboardData",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getDashboard();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
)

//GET DASHBOARD MONTHLY_SUMMARY
export const getMonthlySummaryData = createAsyncThunk(
    "expense/getMonthlySummaryData",
    async (_, { rejectWithValue }) => {
        try {
            const data = await getMonthlySummary();
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    }
);


const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        monthlySummary: [],
        transactions: [],
        totalPages: 0,
        currentPage: 1,

        loading: false,
        error: null,

        filters: {
            search: "",
            category: "all",
            type: "all",
            month: ""
        },

        totalExpense: 0,
        totalIncome: 0,
        balance: 0,
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = {
                ...state.filters,
                ...action.payload,
            };
        }
    },
    extraReducers: (builder) => {

        // CREATE TRANSACTION
        builder
            .addCase(createTran.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTran.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions.push(action.payload.transaction);
            })
            .addCase(createTran.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //UPDATE TRANSACTION
        builder
            .addCase(updateTran.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTran.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.map((item) =>
                    item._id === action.payload.data._id
                        ? action.payload.data
                        : item
                );
            })
            .addCase(updateTran.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        //DELETE TRANSACTION
        builder
            .addCase(deleteTran.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTran.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = state.transactions.filter(item => item._id !== action.payload.deletedID);
            })
            .addCase(deleteTran.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        //GET DASHBOARD 
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.loading = false;
                state.totalExpense = action.payload.totalExpense;
                state.totalIncome = action.payload.totalIncome;
                state.balance = action.payload.balance;
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //GET TRANSACTIONS
        builder
            .addCase(getTransactionsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTransactionsData.fulfilled, (state, action) => {
                state.loading = false;

                state.transactions = action.payload.transactions || [];

                state.totalIncome = action.payload.totalIncome || 0;
                state.totalExpense = action.payload.totalExpense || 0;
                state.balance = action.payload.balance || 0;
            })
            .addCase(getTransactionsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        //GET MONTH_SUMMARY
        builder
            .addCase(
                getMonthlySummaryData.pending,
                (state) => {
                    state.loading = true;
                }
            )
            .addCase(
                getMonthlySummaryData.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.monthlySummary =
                        action.payload.data;
                }
            )
            .addCase(
                getMonthlySummaryData.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const { setFilters } = expenseSlice.actions;

export default expenseSlice.reducer;