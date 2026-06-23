import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import { TrendingUp } from "lucide-react";

const COLORS = [
    "var(--chart-1)",
    "var(--chart-3)",
];

export default function MonthlyBarChart({ data }) {

    if (!data?.length) {
        return (
            <div className="flex h-[350px] items-center justify-center rounded-2xl border bg-card">
                <div className="text-center">
                    <p className="font-medium">
                        No Monthly Data
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Add transactions to view analytics
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className=" bg-card shadow-sm">
            {/* Header */}

            <div className="flex items-center justify-between border-b px-6 py-4">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <TrendingUp size={20} />
                        Monthly Overview
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Income vs Expense comparison
                    </p>
                </div>
            </div>

            {/* Chart */}

            <div className="h-[350px] p-6">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        barGap={8}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                            opacity={0.3}
                            vertical={false}
                        />

                        <XAxis
                            dataKey="month"
                            tick={{
                                fill: "var(--muted-foreground)",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            tick={{
                                fill: "var(--muted-foreground)",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) =>
                                `₹${value}`
                            }
                        />

                        <Tooltip
                            formatter={(value) => [
                                `₹${Number(
                                    value
                                ).toLocaleString()}`,
                            ]}
                            contentStyle={{
                                background:
                                    "var(--popover)",
                                border:
                                    "1px solid var(--border)",
                                borderRadius: "12px",
                            }}
                        />

                        <Legend
                            iconType="circle"
                            wrapperStyle={{
                                paddingTop: "10px",
                            }}
                        />

                        <Bar
                            dataKey="income"
                            name="Income"
                            fill={COLORS[0]}
                            radius={[8, 8, 0, 0]}
                            animationDuration={1000}
                        />

                        <Bar
                            dataKey="expense"
                            name="Expense"
                            fill={COLORS[1]}
                            radius={[8, 8, 0, 0]}
                            animationDuration={1000}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}