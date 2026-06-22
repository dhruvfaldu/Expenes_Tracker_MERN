// import {
//     getMonthlySummary
// } from "../../api/dashboard";

// export const getMonthlySummaryData = createAsyncThunk(
//     "expense/getMonthlySummaryData",
//     async (_, { rejectWithValue }) => {
//         try {
//             const data = await getMonthlySummary();
//             return data;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message ||
//                 "Something went wrong"
//             );
//         }
//     }
// );

// const dashboardSlice