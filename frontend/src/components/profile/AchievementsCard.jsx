import { Card, CardContent } from "@/components/ui/card";
import {
    Medal,
    Trophy,
    Lock,
    Star,
    Award,
    Sparkles,
} from "lucide-react";

function AchievementsCard({
    transactions = [],
    categories = [],
}) {
    const achievements = [
        {
            title: "First Transaction",
            description: "Add your first transaction",
            unlocked: transactions.length >= 1,
            icon: Trophy,
        },
        {
            title: "Transaction Master",
            description: "Complete 10 transactions",
            unlocked: transactions.length >= 10,
            icon: Star,
        },
        {
            title: "Category Creator",
            description: "Create 5 categories",
            unlocked: categories.length >= 5,
            icon: Award,
        },
        {
            title: "Finance Pro",
            description: "Complete 50 transactions",
            unlocked: transactions.length >= 50,
            icon: Medal,
        },
    ];

    const unlockedCount = achievements.filter(
        (item) => item.unlocked
    ).length;

    return (
        <Card className="overflow-hidden border-0 shadow-lg gap-0 p-0">
            {/* Header */}

            <div className=" p-4 text-primary pb-0">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="flex items-center gap-2 text-xl font-bold">
                            <Sparkles size={22} />
                            Achievements
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Unlock milestones as you manage your finances
                        </p>
                    </div>

                    <div className="rounded-full bg-white/20 px-4 py-2 backdrop-blur">
                        <span className="font-semibold">
                            {unlockedCount}/{achievements.length}
                        </span>
                    </div>
                </div>
            </div>

            <CardContent className="p-5">
                <div className="grid gap-4">
                    {achievements.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className={`group flex items-center justify-between rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${item.unlocked
                                        ? "border-green-200 bg-green-50"
                                        : "border-slate-200 bg-slate-50"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`rounded-full p-3 ${item.unlocked
                                                ? "bg-green-100 text-green-600"
                                                : "bg-slate-200 text-slate-500"
                                            }`}
                                    >
                                        <Icon size={22} />
                                    </div>

                                    <div>
                                        <h3
                                            className={`font-semibold ${item.unlocked
                                                    ? "text-green-700"
                                                    : "text-slate-700"
                                                }`}
                                        >
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {item.unlocked ? (
                                    <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                        🏆 Unlocked
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-600">
                                        <Lock size={14} />
                                        Locked
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export default AchievementsCard;