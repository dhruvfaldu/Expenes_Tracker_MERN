import FinancialHealthCard from "@/components/profile/FinancialHealthCard";
import TopCategoriesCard from "@/components/profile/TopCategoriesCard";
import InsightsCard from "@/components/profile/InsightsCard";
import AchievementsCard from "@/components/profile/AchievementsCard";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    User,
    Mail,
    Calendar,
    ShieldCheck,
} from "lucide-react";

function Profile() {

    const { totalIncome, totalExpense, transactions } = useSelector(state => state.expense);
    const { categories } = useSelector(state => state.category);
    const { user } = useSelector(state => state.auth);

    return (
        <>
            <div className="space-y-6 p-4">
                <h2 className="text-3xl font-bold tracking-tight">
                    Profile
                </h2>

                <Card className=" border-0 shadow-lg p-0 gap-0">
                    {/* Cover */}
                    {/* <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" /> */}

                    <CardContent className=" p-6">
                        <div className=" flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            {/* Left */}

                            <div className="flex items-center gap-4">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg">
                                    <User size={40} />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {user.name}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                                        <Mail size={16} />
                                        <span>{user.email}</span>
                                    </div>

                                    <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                        <Calendar size={16} />
                                        <span>
                                            Member since 2026
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right */}

                            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
                                <ShieldCheck size={18} />
                                Verified Account
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 p-4">
                <FinancialHealthCard
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                />

                <TopCategoriesCard
                    transactions={transactions}
                />

                <InsightsCard
                    totalIncome={totalIncome}
                    totalExpense={totalExpense}
                    transactions={transactions}
                />

                <AchievementsCard
                    transactions={transactions}
                    categories={categories}
                />
            </div>
        </>
    )
}

export default Profile