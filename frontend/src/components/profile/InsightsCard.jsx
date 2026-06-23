import { Card, CardContent } from "@/components/ui/card";
import {
    Lightbulb,
    Wallet,
    TrendingUp,
    AlertTriangle,
} from "lucide-react";

function InsightsCard({
    totalIncome = 0,
    totalExpense = 0,
    transactions = [],
}) {
    const savings = totalIncome - totalExpense;

    const highestTransaction =
        transactions.length > 0
            ? Math.max(
                ...transactions.map((t) =>
                    Number(t.amount)
                )
            )
            : 0;

    const spendingStatus =
        totalExpense > totalIncome * 0.8
            ? {
                title: "High Spending",
                message:
                    "Your expenses are consuming most of your income.",
                icon: AlertTriangle,
                color:
                    "bg-red-50 border-red-200 text-red-600",
            }
            : {
                title: "Spending Under Control",
                message:
                    "You are managing expenses efficiently.",
                icon: TrendingUp,
                color:
                    "bg-green-50 border-green-200 text-green-600",
            };

    const insights = [
        {
            title: "Total Savings",
            value: `₹${savings.toLocaleString()}`,
            icon: Wallet,
            color:
                "bg-blue-50 border-blue-200 text-blue-600",
        },
        {
            title: "Highest Transaction",
            value: `₹${highestTransaction.toLocaleString()}`,
            icon: TrendingUp,
            color:
                "bg-purple-50 border-purple-200 text-purple-600",
        },
    ];

    return (
        <Card className="overflow-hidden border-0 shadow-lg p-0 gap-0">
            {/* Header */}

            <div className="p-5 pb-0 text-primary">
                <div className="flex items-center gap-3">
                    <Lightbulb size={22} />

                    <div>
                        <h2 className="text-lg font-semibold">
                            Smart Insights
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Personalized financial observations
                        </p>
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                {/* Main Insight Cards */}

                <div className="space-y-4">
                    {insights.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className={`rounded-xl border p-4 ${item.color}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-80">
                                            {item.title}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-bold">
                                            {item.value}
                                        </h3>
                                    </div>

                                    <Icon size={28} />
                                </div>
                            </div>
                        );
                    })}

                    {/* Spending Status */}

                    <div
                        className={`rounded-xl border p-4 ${spendingStatus.color}`}
                    >
                        <div className="flex gap-3">
                            <spendingStatus.icon
                                className="mt-1 shrink-0"
                                size={22}
                            />

                            <div>
                                <h4 className="font-semibold">
                                    {spendingStatus.title}
                                </h4>

                                <p className="text-sm opacity-80">
                                    {spendingStatus.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}

                <div className="mt-5 rounded-xl bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                        💡 Keep tracking expenses regularly to
                        improve your financial habits and
                        maximize savings.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

export default InsightsCard;