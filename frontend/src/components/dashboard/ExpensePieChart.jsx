import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

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
        (acc, cur) => acc + cur.amount,
        0
    );

    if (!data.length) {
        return (
            <div className="w-full h-[360px] bg-card border border-border rounded-xl p-4 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    No expense data available
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-[360px] bg-card ">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-sm font-semibold text-foreground">
                    Expense Breakdown
                </h1>

                <span className="text-xs text-muted-foreground">
                    Categories
                </span>
            </div>

            <div className="relative w-full h-[260px]">

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={75}
                            outerRadius={105}
                            paddingAngle={3}
                            stroke="var(--background)"
                            strokeWidth={2}
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
                            contentStyle={{
                                backgroundColor: "var(--popover)",
                                border: "1px solid var(--border)",
                                borderRadius: "12px",
                                color: "var(--popover-foreground)",
                                fontSize: "12px",
                            }}
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString()}`,
                                "Amount",
                            ]}
                        />

                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            formatter={(value) => (
                                <span className="text-xs text-muted-foreground">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-xs text-muted-foreground">
                        Total Expense
                    </p>

                    <p className="text-xl font-bold text-foreground">
                        ₹{total.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}