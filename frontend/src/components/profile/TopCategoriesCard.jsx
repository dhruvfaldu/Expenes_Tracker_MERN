import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Trophy,
    Crown,
    Medal,
    Award,
} from "lucide-react";

function TopCategoriesCard({ transactions = [] }) {
    const categoryTotals = {};

    transactions.forEach((transaction) => {
        if (transaction.type === "expense") {
            const category =
                transaction.category || "Other";

            categoryTotals[category] =
                (categoryTotals[category] || 0) +
                Number(transaction.amount);
        }
    });

    const topCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const totalExpense = topCategories.reduce(
        (sum, [, amount]) => sum + amount,
        0
    );

    const getRankIcon = (index) => {
        if (index === 0)
            return (
                <Crown
                    size={18}
                    className="text-yellow-500"
                />
            );

        if (index === 1)
            return (
                <Medal
                    size={18}
                    className="text-slate-500"
                />
            );

        if (index === 2)
            return (
                <Award
                    size={18}
                    className="text-amber-600"
                />
            );

        return (
            <span className="text-xs font-bold text-muted-foreground">
                #{index + 1}
            </span>
        );
    };

    if (!topCategories.length) {
        return (
            <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-5 text-white">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Trophy size={20} />
                        Top Categories
                    </h2>
                </div>

                <CardContent className="flex h-[250px] items-center justify-center">
                    <p className="text-muted-foreground">
                        No expense data available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden border-0 shadow-lg p-0 gap-0">
            {/* Header */}

            <div className="p-5 text-primary">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <Trophy size={20} />
                            Top Spending Categories
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Where most of your money goes
                        </p>
                    </div>

                    <div className=" flex gap-1 items-center justify-center h-8 w-22  bg-primary/20 rounded-full  px-2   py-2 backdrop-blur">
                        {topCategories.length}<span className="text-xs">Categories</span>
                    </div>
                </div>
            </div>

            <CardContent className="p-4 ">
                <div className="space-y-5">
                    {topCategories.map(
                        ([name, amount], index) => {
                            const percentage =
                                totalExpense > 0
                                    ? (
                                        (amount /
                                            totalExpense) *
                                        100
                                    ).toFixed(0)
                                    : 0;

                            return (
                                <div
                                    key={name}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {getRankIcon(
                                                index
                                            )}

                                            <span className="font-medium">
                                                {name}
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ₹
                                                {amount.toLocaleString()}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    percentage
                                                }
                                                %
                                            </p>
                                        </div>
                                    </div>

                                    <Progress
                                        value={
                                            percentage
                                        }
                                        className="h-2"
                                    />
                                </div>
                            );
                        }
                    )}
                </div>

                {/* Footer */}

                <div className="mt-6 rounded-xl bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                        Highest spending category:
                        <span className="ml-1 font-semibold text-foreground">
                            {topCategories[0][0]}
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default TopCategoriesCard;