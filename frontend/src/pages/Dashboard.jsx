import {
    Wallet,
    TrendingUp,
    TrendingDown,
    Plus,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getDashboardData, getMonthlySummaryData, getTransactionsData } from "../store/slice/expenseSlice";
import { getExpenseByCategoryData } from "../store/slice/categorySlice"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart";
import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import { useMemo } from "react";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function Dashboard({ setSelectedTransaction, setOpen }) {

    const dispatch = useDispatch();

    const { monthlySummary, transactions, totalExpense, totalIncome, balance, loading } = useSelector((state) => state.expense);
    const { expenseCategories } = useSelector((state) => state.category);
    const { user } = useSelector((state) => state.auth);

    const recentTransactions = useMemo(() => {
        return [...transactions].reverse().slice(0, 5);
    }, [transactions]);

    useEffect(() => {
        dispatch(getDashboardData());
        dispatch(getMonthlySummaryData());
        dispatch(getExpenseByCategoryData());
        dispatch(getTransactionsData());
    }, []);

    const total = (totalExpense || 0) + (totalIncome || 0);
    const expensePercentage = total > 0 ? (totalExpense / total) * 100 : 0;
    const incomePercentage = total > 0 ? (totalIncome / total) * 100 : 0;
    const balancePercentage = total > 0 ? (balance / total) * 100 : 0;



    return (
        <div className="space-y-6 p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-semibold">
                        Welcome Back {user?.name}👋
                    </h1>

                    <p className="text-muted-foreground mt-1">
                        Here's your financial overview
                    </p>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
                {/* Balance */}
                <Card className=" overflow-hidden border-0 shadow-lg bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="opacity-90">
                                    YOUR BALANCE
                                </p>

                                <h2 className="mt-2 text-3xl font-semibold">
                                    ₹{Number(balance || 0).toLocaleString()}
                                </h2>

                                <p className="mt-2 text-sm">
                                    {balancePercentage.toFixed(2)}% from last month
                                </p>
                            </div>

                            <div className="rounded-xl bg-white/20 p-3">
                                <Wallet className="h-7 w-7" />
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <Card className="shadow-md border-l-4 border-green-500 ">
                    <CardContent className="p-6">

                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-muted-foreground">
                                    TOTAL INCOME
                                </p>

                                <h3 className="mt-2 text-3xl font-semibold">
                                    ₹{Number(totalIncome || 0).toLocaleString()}
                                </h3>

                                <p className="text-sm text-green-500 mt-2">
                                    +{incomePercentage.toFixed(2)}%
                                </p>
                            </div>

                            <div className="rounded-xl bg-green-500/10 p-3">
                                <TrendingUp className="h-6 w-6 text-green-500" />
                            </div>

                        </div>

                    </CardContent>
                </Card>

                <Card className="shadow-md border-l-4  border-red-500">
                    <CardContent className="p-6">

                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-muted-foreground">
                                    TOTAL EXPENSE
                                </p>

                                <h3 className=" text-3xl font-semibold mt-2">
                                    ₹{Number(totalExpense || 0).toLocaleString()}
                                </h3>

                                <p className="text-sm text-red-500 mt-2">
                                    -{expensePercentage.toFixed(2)}%
                                </p>
                            </div>

                            <div className="rounded-xl bg-red-500/10 p-3">
                                <TrendingDown className="h-6 w-6 text-red-500" />
                            </div>

                        </div>

                    </CardContent>
                </Card>
            </div>

            {/* Chart */}

            <Card className="">
                <CardHeader>
                    <CardTitle>
                        Monthly Income vs Expense
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <MonthlyBarChart data={monthlySummary} />
                </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3 min-w-0">

                {/* Recent Transactions */}
                <Card className="lg:col-span-2 shadow-md border-0">
                    <CardContent>
                        <RecentTransactions transactions={recentTransactions} />
                    </CardContent>
                </Card>
                <Card className="">

                    <CardContent>
                        <ExpensePieChart data={expenseCategories} />
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}