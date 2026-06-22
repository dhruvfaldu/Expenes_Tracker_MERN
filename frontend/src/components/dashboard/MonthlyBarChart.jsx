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
import { useSelector } from "react-redux";

const COLORS = ["var(--chart-1)", "var(--chart-3)"];


export default function MonthlyBarChart({ data }) {

    if (!data?.length) {
        return (
            <div className="h-[320px] flex items-center justify-center">
                No data available
            </div>
        );
    }

    return (
        <div className="w-full h-[320px] bg-card border border-border rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>

                    {/* 🌐 Theme-aware grid */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        opacity={0.4}
                    />

                    {/* 📊 Axis styling */}
                    <XAxis
                        dataKey="month"
                        stroke="var(--muted-foreground)"
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />

                    <YAxis
                        stroke="var(--muted-foreground)"
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                    />

                    {/* 💬 Tooltip (theme-aware) */}
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "var(--popover)",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            color: "var(--popover-foreground)",
                        }}
                        cursor={{ fill: "var(--muted)" }}
                    />

                    {/* 📌 Legend styling */}
                    <Legend
                        wrapperStyle={{
                            color: "var(--foreground)",
                            fontSize: "13px",
                        }}
                    />

                    {/* 📈 Bars */}
                    <Bar
                        dataKey="income"
                        fill={COLORS[0]}
                        radius={[6, 6, 0, 0]}
                    />

                    <Bar
                        dataKey="expense"
                        fill={COLORS[1]}
                        radius={[6, 6, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}