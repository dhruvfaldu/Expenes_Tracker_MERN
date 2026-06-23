import {
    User,
    Mail,
    Calendar,
    Wallet,
    TrendingUp,
    TrendingDown,
    Receipt,
    Tags,
    LogOut,
    Edit,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {

    const { categories } = useSelector((state) => state.category);
    console.log(categories);
    // Dummy data for now
    const user = {
        name: "Dhruv Faldu",
        email: "dhruv@gmail.com",
        createdAt: "Jan 2026",
    };

    const stats = {
        transactions: 245,
        // categories: 12,
        income: 50000,
        expense: 35000,
    };

    const balance = stats.income - stats.expense;

    const recentActivity = [
        {
            title: "Salary Added",
            amount: "+₹20,000",
            type: "income",
        },
        {
            title: "Grocery Expense",
            amount: "-₹1,500",
            type: "expense",
        },
        {
            title: "Fuel Expense",
            amount: "-₹800",
            type: "expense",
        },
    ];

    return (
        <div className="space-y-6 p-4 md:p-6">
            {/* Header */}

            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="h-28 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <CardContent className="relative">
                    <div className="-mt-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg">
                                <User size={42} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold">
                                    {user.name}
                                </h1>

                                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                    <Mail size={16} />
                                    {user.email}
                                </div>

                                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                    <Calendar size={16} />
                                    Member Since {user.createdAt}
                                </div>
                            </div>
                        </div>

                        <Button className="gap-2">
                            <Edit size={16} />
                            Edit Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Cards */}

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Transactions
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {stats.transactions}
                                </h2>
                            </div>

                            <div className="rounded-full bg-blue-100 p-3">
                                <Receipt className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Categories
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {categories.length}
                                </h2>
                            </div>

                            <div className="rounded-full bg-purple-100 p-3">
                                <Tags className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Balance
                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-green-600">
                                    ₹{balance.toLocaleString()}
                                </h2>
                            </div>

                            <div className="rounded-full bg-green-100 p-3">
                                <Wallet className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Financial Summary */}

            <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                    <h2 className="mb-6 text-xl font-semibold">
                        Financial Summary
                    </h2>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border p-5">
                            <div className="mb-3 flex items-center gap-2 text-green-600">
                                <TrendingUp size={20} />
                                <span className="font-medium">
                                    Total Income
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold">
                                ₹{stats.income.toLocaleString()}
                            </h3>
                        </div>

                        <div className="rounded-xl border p-5">
                            <div className="mb-3 flex items-center gap-2 text-red-600">
                                <TrendingDown size={20} />
                                <span className="font-medium">
                                    Total Expense
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold">
                                ₹{stats.expense.toLocaleString()}
                            </h3>
                        </div>

                        <div className="rounded-xl border p-5">
                            <div className="mb-3 flex items-center gap-2 text-blue-600">
                                <Wallet size={20} />
                                <span className="font-medium">
                                    Current Balance
                                </span>
                            </div>

                            <h3 className="text-3xl font-bold">
                                ₹{balance.toLocaleString()}
                            </h3>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Bottom Section */}

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}

                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            Recent Activity
                        </h2>

                        <div className="space-y-4">
                            {recentActivity.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-lg border p-4"
                                >
                                    <span>{item.title}</span>

                                    <span
                                        className={`font-semibold ${item.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {item.amount}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Account Actions */}

                <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                        <h2 className="mb-5 text-xl font-semibold">
                            Account Actions
                        </h2>

                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2"
                            >
                                <Edit size={18} />
                                Edit Profile
                            </Button>

                            <Button
                                variant="destructive"
                                className="w-full justify-start gap-2"
                            >
                                <LogOut size={18} />
                                Logout
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Profile;