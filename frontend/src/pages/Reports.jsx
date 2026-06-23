import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsData } from "../store/slice/expenseSlice";
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    Trophy,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Reports() {

    const [period, setPeriod] = useState("all");
    const dispatch = useDispatch();

    const { transactions, monthlySummary } = useSelector((state) => state.expense);
    const { expenseCategories } = useSelector((state) => state.category);

    const topCategories = [...expenseCategories].sort((a, b) => b.amount - a.amount).slice(0, 5);

    const filteredTransactions = transactions.filter(
        (transaction) => {
            const date = new Date(transaction.date);
            const now = new Date();

            switch (period) {
                case "month":
                    return (
                        date.getMonth() ===
                        now.getMonth() &&
                        date.getFullYear() ===
                        now.getFullYear()
                    );

                case "3months": {
                    const past = new Date();
                    past.setMonth(
                        now.getMonth() - 3
                    );

                    return date >= past;
                }

                case "6months": {
                    const past = new Date();
                    past.setMonth(
                        now.getMonth() - 6
                    );

                    return date >= past;
                }

                case "year":
                    return (
                        date.getFullYear() ===
                        now.getFullYear()
                    );

                default:
                    return true;
            }
        }
    );

    useEffect(() => {
        dispatch(getTransactionsData());
    }, [dispatch]);

    const totalIncome = filteredTransactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filteredTransactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const savings = totalIncome - totalExpense;

    const monthlyChartData = filteredTransactions.reduce(
        (acc, transaction) => {
            const month = new Date(
                transaction.date
            ).toLocaleString("default", {
                month: "short",
            });

            let existing = acc.find(
                (item) => item.month === month
            );

            if (!existing) {
                existing = {
                    month,
                    income: 0,
                    expense: 0,
                };

                acc.push(existing);
            }

            if (transaction.type === "income") {
                existing.income += transaction.amount;
            } else {
                existing.expense += transaction.amount;
            }

            return acc;
        }, []);

    const expenseCategoryData = Object.values(
        filteredTransactions
            .filter((t) => t.type === "expense")
            .reduce((acc, transaction) => {
                const category =
                    transaction.category?.name ||
                    transaction.category ||
                    "Other";

                if (!acc[category]) {
                    acc[category] = {
                        category,
                        amount: 0,
                    };
                }

                acc[category].amount += transaction.amount;

                return acc;
            }, {})
    );

    return (
        <>
            <div className="space-y-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Reports
                        </h1>

                        <p className="text-muted-foreground">
                            Analyze your income and expenses
                        </p>
                    </div>

                    <Select
                        value={period}
                        onValueChange={setPeriod}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">
                                All Time
                            </SelectItem>

                            <SelectItem value="month">
                                This Month
                            </SelectItem>

                            <SelectItem value="3months">
                                Last 3 Months
                            </SelectItem>

                            <SelectItem value="6months">
                                Last 6 Months
                            </SelectItem>

                            <SelectItem value="year">
                                This Year
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-5 md:grid-cols-3">

                    {/* Income */}
                    <Card className="group border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    TOTAL INCOME
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-green-600">
                                    ₹{totalIncome}
                                </h2>
                            </div>

                            <div className="rounded-full bg-green-100 p-4 text-green-600 transition-transform duration-300 group-hover:scale-110">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Expense */}
                    <Card className="group border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    TOTAL EXPENSE
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-red-600">
                                    ₹{totalExpense}
                                </h2>
                            </div>

                            <div className="rounded-full bg-red-100 p-4 text-red-600 transition-transform duration-300 group-hover:scale-110">
                                <TrendingDown className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Savings */}
                    <Card className="group border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    SAVINGS
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                                    ₹{savings}
                                </h2>
                            </div>

                            <div className="rounded-full bg-blue-100 p-4 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                <Wallet className="h-6 w-6" />
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Monthly Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Monthly Income vs Expense
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <MonthlyBarChart data={monthlyChartData} />
                    </CardContent>
                </Card>

                <div className="grid gap-5 md:grid-cols-2">
                    {/* Category Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Expense By Category
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <ExpensePieChart data={expenseCategoryData} />
                        </CardContent>
                    </Card>

                    {/* Top Categories */}
                    <Card>
                        <CardHeader className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                Top Spending Categories
                            </CardTitle>

                            <Trophy className="h-5 w-5 text-amber-500" />
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <CardContent>
                                    {topCategories.length === 0 ? (
                                        <div className="flex h-[250px] items-center justify-center">
                                            <p className="text-sm text-muted-foreground">
                                                No expense data available
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {topCategories.map((category, index) => (
                                                <div
                                                    key={category.category}
                                                    className="flex items-center justify-between rounded-lg border p-3 transition-all hover:bg-muted/50"
                                                >
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                                            #{index + 1}
                                                        </div>

                                                        <div>
                                                            <p className="font-medium">
                                                                {category.category}
                                                            </p>

                                                            <p className="text-xs text-muted-foreground">
                                                                Expense Category
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1 text-red-500">
                                                            <TrendingUp className="h-4 w-4" />
                                                            <span className="font-semibold">
                                                                ₹{category.amount.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Reports