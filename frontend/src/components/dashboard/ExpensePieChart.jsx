import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import {
    PieChart as PieChartIcon,
    IndianRupee,
} from "lucide-react";

const COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-6)",
];

export default function ExpensePieChart({ data = [] }) {

    const total = data.reduce(
        (acc, cur) => acc + Number(cur.amount),
        0
    );

    if (!data.length) {
        return (
            <div className="rounded-2xl border bg-card shadow-sm">
                <div className="flex h-[380px] flex-col items-center justify-center">
                    <PieChartIcon
                        size={48}
                        className="mb-3 text-muted-foreground"
                    />

                    <h3 className="font-semibold">
                        No Expense Data
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Add expense transactions to view category analysis
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-card shadow-sm">
            {/* Header */}

            <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 p-5 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-lg font-semibold">
                            <PieChartIcon size={20} />
                            Expense Breakdown
                        </h2>

                        <p className="text-sm text-violet-100">
                            Category-wise expense distribution
                        </p>
                    </div>

                    <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                        {data.length} Categories
                    </div>
                </div>
            </div>

            {/* Chart */}

            <div className="relative h-[360px] p-4">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={80}
                            outerRadius={115}
                            paddingAngle={4}
                            stroke="var(--background)"
                            strokeWidth={2}
                            animationDuration={1200}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index %
                                        COLORS.length
                                        ]
                                    }
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) => [
                                `₹${Number(
                                    value
                                ).toLocaleString()}`,
                                "Expense",
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
                            verticalAlign="bottom"
                            iconType="circle"
                            wrapperStyle={{
                                paddingTop: "20px",
                                fontSize: "12px",
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Content */}

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <div className="mb-2 flex items-center gap-1 text-muted-foreground">
                        <IndianRupee size={14} />
                        <span className="text-xs">
                            Total Expense
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold">
                        ₹{total.toLocaleString()}
                    </h2>

                    <p className="mt-1 text-xs text-muted-foreground">
                        Across {data.length} categories
                    </p>
                </div>
            </div>
        </div>
    );
}