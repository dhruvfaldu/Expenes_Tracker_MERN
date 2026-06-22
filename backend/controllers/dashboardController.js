import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getDashboardData = async (req, res) => {
    try {
        console.log(req.user);
        const transactions = await Transaction.find({ user: req.user.userId });
        console.log(transactions);

        const totalIncome = transactions.filter(item => item.type === "income").reduce((acc, item) => acc + item.amount, 0);

        const totalExpense = transactions
            .filter(item => item.type === "expense")
            .reduce((acc, item) => acc + item.amount, 0);

        const balance = totalIncome - totalExpense;

        res.status(200).json({
            totalIncome,
            totalExpense,
            balance,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMonthlySummary = async (req, res) => {
    try {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const currentYear = new Date().getFullYear();

        const startDate = new Date(currentYear, 0, 1);
        const endDate = new Date(currentYear + 1, 0, 1);

        const monthlyData = await Transaction.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.userId),
                    date: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$date",
                        },
                    },

                    income: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0,
                            ],
                        },
                    },

                    expense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                },
            },
            {
                $sort: {
                    "_id.month": 1,
                },
            },
        ]);

        const result = months.map((month) => ({
            month,
            income: 0,
            expense: 0,
        }));

        monthlyData.forEach((item) => {
            const monthIndex = item._id.month - 1;

            result[monthIndex] = {
                month: months[monthIndex],
                income: item.income,
                expense: item.expense,
            };
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Monthly Summary Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getExpenseByCategory = async (req, res) => {
    try {
        const data = await Transaction.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(req.user.userId),
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                },
            },
        ]);

        const formattedData = data.map((item) => ({
            category: item._id,
            amount: item.total,
        }));

        res.status(200).json({
            success: true,
            data: formattedData,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};