import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Search, Check, ListFilter } from "lucide-react";

import {
    Utensils,
    Briefcase,
    ShoppingCart,
    Home,
    Car,
    PiggyBank,
    MoreHorizontal,
} from "lucide-react";

import { setFilters } from "@/store/slice/expenseSlice";
import { getCategoriesData } from "@/store/slice/categorySlice";

const TransactionFilters = () => {
    const dispatch = useDispatch();

    const { categories, } = useSelector(
        (state) => state.category
    );

    const { filters, loading } = useSelector((state) => state.expense);
    // console.log(categories);

    const [openCategory, setOpenCategory] = useState(false);
    const [openType, setOpenType] = useState(false);

    useEffect(() => {
        dispatch(getCategoriesData());
    }, [dispatch]);

    const categoryIcons = {
        food: Utensils,
        salary: Briefcase,
        shopping: ShoppingCart,
        rent: Home,
        transport: Car,
        investment: PiggyBank,
        default: MoreHorizontal,
    };

    const selectedCategory = filters.category || "all";
    const selectedType = filters.type || "all";

    return (
        <div className="p-2 mt-2">
            <div className="grid gap-4 md:grid-cols-4">

                {/* SEARCH */}
                <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-2 text-muted-foreground" />
                    <Input
                        placeholder="Search transaction..."
                        className="pl-9"
                        value={filters.search}
                        onChange={(e) =>
                            dispatch(setFilters({ search: e.target.value }))
                        }
                    />
                </div>

                {/* CATEGORY DROPDOWN */}
                <Popover open={openCategory} onOpenChange={setOpenCategory}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                        >
                            <ListFilter className="h-4 w-4" />
                            {selectedCategory === "all"
                                ? "All Categories"
                                : selectedCategory}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-2 w-60">
                        <button
                            onClick={() => {
                                dispatch(setFilters({ category: "all" }));
                                setOpenCategory(false);
                            }}
                            className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-muted"
                        >
                            All Categories
                            {selectedCategory === "all" && (
                                <Check className="h-4 w-4" />
                            )}
                        </button>

                        {loading ? (
                            <div className="px-2 py-1 text-sm text-muted-foreground">
                                Loading...
                            </div>
                        ) : (
                            categories?.map((cat) => {
                                const key = cat.name?.toLowerCase();
                                const Icon =
                                    categoryIcons[key] ||
                                    categoryIcons.default;

                                return (
                                    <button
                                        key={cat._id}
                                        onClick={() => {
                                            dispatch(
                                                setFilters({
                                                    category: cat.name,
                                                })
                                            );
                                            setOpenCategory(false);
                                        }}
                                        className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-muted"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Icon className="h-4 w-4 text-primary" />
                                            {cat.name}
                                        </div>

                                        {selectedCategory === cat.name && (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </PopoverContent>
                </Popover>

                {/* TYPE DROPDOWN */}
                <Popover open={openType} onOpenChange={setOpenType}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2"
                        >
                            <ListFilter className="h-4 w-4" />
                            {selectedType === "all"
                                ? "All Types"
                                : selectedType}
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-2 w-60">
                        {[
                            { label: "All Types", value: "all" },
                            { label: "Income", value: "income" },
                            { label: "Expense", value: "expense" },
                        ].map((t) => (
                            <button
                                key={t.value}
                                onClick={() => {
                                    dispatch(
                                        setFilters({ type: t.value })
                                    );
                                    setOpenType(false);
                                }}
                                className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-muted"
                            >
                                {t.label}
                                {selectedType === t.value && (
                                    <Check className="h-4 w-4" />
                                )}
                            </button>
                        ))}
                    </PopoverContent>
                </Popover>

                {/* MONTH */}
                <div className="relative">
                    <Input
                        type="date"
                        className="w-full"
                        value={filters.date || ""}
                        onChange={(e) =>
                            dispatch(
                                setFilters({
                                    date: e.target.value,
                                })
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default TransactionFilters;