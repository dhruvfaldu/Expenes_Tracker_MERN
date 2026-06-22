import ExpensePieChart from "@/components/dashboard/ExpensePieChart";
import MonthlyBarChart from "@/components/dashboard/MonthlyBarChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsData } from "../store/slice/expenseSlice";
import {
    TrendingUp,
    TrendingDown,
    Wallet,
} from "lucide-react";

function Reports() {

    const dispatch = useDispatch();

    const { transactions, monthlySummary } = useSelector((state) => state.expense);

    useEffect(() => {
        dispatch(getTransactionsData());
    }, [dispatch]);
    const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const savings = totalIncome - totalExpense;

    return (
        <>
            <div className="space-y-6 p-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">
                        Reports
                    </h1>
                    <p className="text-muted-foreground">
                        Analyze your income and expenses
                    </p>
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
                        <MonthlyBarChart data={monthlySummary} />
                    </CardContent>
                </Card>

                {/* Category Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Expense By Category
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        Pie Chart Coming Soon
                    </CardContent>
                </Card>

                {/* Top Categories */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Top Spending Categories
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        Category List Coming Soon
                    </CardContent>
                </Card>

            </div>
        </>
    )
}

export default Reports