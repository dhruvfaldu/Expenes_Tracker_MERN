import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    HeartPulse,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

function FinancialHealthCard({
    totalIncome = 0,
    totalExpense = 0,
}) {
    const ratio =
        totalIncome > 0
            ? totalExpense / totalIncome
            : 1;

    let score = 50;

    if (ratio < 0.5) score = 90;
    else if (ratio < 0.7) score = 75;
    else if (ratio < 0.9) score = 60;

    const status =
        score >= 85
            ? "Excellent"
            : score >= 70
                ? "Good"
                : "Needs Improvement";

    const statusColor =
        score >= 85
            ? "bg-green-100 text-green-700"
            : score >= 70
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700";

    return (
        <Card className="overflow-hidden border-0 shadow-lg pt-0 gap-0">
            {/* Header */}

            <div className="p-5 text-primary">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <HeartPulse size={20} />
                            Financial Health
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Overview of your spending habits
                        </p>
                    </div>

                    <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                        Score
                    </div>
                </div>
            </div>

            <CardContent className="p-6">
                {/* Score */}

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl font-bold">
                            {score}
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            out of 100
                        </p>
                    </div>

                    <div
                        className={`rounded-full px-4 py-2 text-sm font-medium ${statusColor}`}
                    >
                        {status}
                    </div>
                </div>

                {/* Progress */}

                <Progress
                    value={score}
                    className="mb-6 h-3"
                />

                {/* Stats */}

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border bg-green-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-green-600">
                            <TrendingUp size={18} />
                            <span className="text-sm font-medium">
                                Income
                            </span>
                        </div>

                        <h3 className="font-bold">
                            ₹{totalIncome.toLocaleString()}
                        </h3>
                    </div>

                    <div className="rounded-xl border bg-red-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-red-600">
                            <TrendingDown size={18} />
                            <span className="text-sm font-medium">
                                Expense
                            </span>
                        </div>

                        <h3 className="font-bold">
                            ₹{totalExpense.toLocaleString()}
                        </h3>
                    </div>
                </div>

                {/* Footer Message */}

                <div className="mt-5 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    {score >= 85 &&
                        "Great job! You're maintaining healthy financial habits."}

                    {score >= 70 &&
                        score < 85 &&
                        "Your finances are stable, but there's room for improvement."}

                    {score < 70 &&
                        "Consider reducing expenses to improve your financial health score."}
                </div>
            </CardContent>
        </Card>
    );
}

export default FinancialHealthCard;