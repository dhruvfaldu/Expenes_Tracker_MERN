import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, IndianRupee, Tag, ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createTran, updateTran, } from "@/store/slice/expenseSlice";
import { Textarea } from "../ui/textarea";

const TransactionForm = ({ open, onOpenChange, transaction }) => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
        description: "",
    });

    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        if (transaction) {
            setForm({
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                category: transaction.category,
                date: transaction.date
                    ? transaction.date.split("T")[0]
                    : "",
                description: transaction.description || "",
            });
        }
    }, [transaction]);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value, }));
        setErrors((prev) => ({ ...prev, [key]: "", }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!form.amount) {
            newErrors.amount = "Amount is required";
        } else if (Number(form.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }

        if (!form.category) {
            newErrors.category = "Category is required";
        }

        if (!form.date) {
            newErrors.date = "Date is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        if (transaction) {
            const result = await dispatch(
                updateTran({
                    id: transaction._id,
                    data: {
                        title: form.title,
                        amount: Number(form.amount),
                        type: form.type,
                        category: form.category,
                        date: form.date,
                        description: form.description,
                    }
                })
            );

            if (updateTran.fulfilled.match(result)) {
                onOpenChange(false);
                setForm({
                    title: "",
                    amount: "",
                    type: "expense",
                    category: "",
                    date: "",
                    description: "",
                });
            }
        } else {
            await dispatch(
                createTran({
                    title: form.title,
                    amount: Number(form.amount),
                    type: form.type,
                    category: form.category,
                    date: form.date,
                    description: form.description,
                })
            );
        }

        setForm({
            title: "",
            amount: "",
            type: "expense",
            category: "",
            date: "",
            description: "",
        });

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl rounded-3xl p-3 overflow-hidden">
                {/* HEADER */}

                <div className="flex items-center justify-between gap-0 border-b px-4 py-3">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            {transaction
                                ? "Edit Transaction"
                                : "Add Transaction"}
                        </DialogTitle>

                        <DialogDescription>
                            Record a new income or expense.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="space-y-4 p-4">
                    {/* TYPE */}
                    <div>
                        <label className="mb-3 block text-sm font-medium">
                            Transaction Type
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant={
                                    form.type === "expense"
                                        ? "destructive"
                                        : "outline"
                                }
                                onClick={() => handleChange("type", "expense")}
                                className="h-10 "
                            >
                                <ArrowDownCircle className="mr-2 h-4 w-4" />
                                Expense
                            </Button>

                            <Button
                                type="button"
                                variant={
                                    form.type === "income"
                                        ? "default"
                                        : "outline"
                                }
                                onClick={() =>
                                    handleChange("type", "income")
                                }
                                className="h-10"
                            >
                                <ArrowUpCircle className="mr-2 h-4 w-4" />
                                Income
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col w-full sm:flex-row gap-9 justify-start  items-center">
                        <div className="flex flex-col  items-start">
                            {/* AMOUNT */}

                            <label className="mb-2 block text-sm font-medium">
                                Amount
                            </label>

                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={form.amount}
                                    onChange={(e) =>
                                        handleChange(
                                            "amount",
                                            e.target.value
                                        )
                                    }
                                    className="h-11 pl-8 text-2xl font-bold"
                                />
                            </div>

                            {errors.amount && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.amount}
                                </p>
                            )}
                        </div>

                        {/* TITLE */}
                        <div className="flex flex-col justify-center items-start">

                            <label className="mb-2 block text-sm font-medium">
                                Title
                            </label>

                            <div className="relative">
                                <Receipt className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    placeholder="Restaurant"
                                    value={form.title}
                                    onChange={(e) =>
                                        handleChange(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="pl-10 h-11"
                                />
                            </div>

                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* CATEGORY */}
                    <div className="flex flex-col w-full sm:flex-row gap-9 items-center">
                        <div className="flex flex-col gap-1 w-[45%]">
                            <label className="mb-2 block text-sm font-medium">
                                Category
                            </label>

                            <Select
                                value={form.category}
                                onValueChange={(value) => handleChange("category", value)}
                            >
                                <SelectTrigger className="h-11 w-full">
                                    <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-muted-foreground" />
                                        <SelectValue placeholder="Select category" />
                                    </div>
                                </SelectTrigger>

                                <SelectContent position="popper" sideOffset={8}>
                                    {categories.map((cat, index) => (
                                        <SelectItem
                                            key={index}
                                            value={cat.name}
                                        >
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.category && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        {/* DATE */}
                        <div className="flex flex-col gap-1">
                            <label className="mb-2 block text-sm font-medium">
                                Date
                            </label>
                            <Input
                                type="date"
                                value={form.date}
                                onChange={(e) =>
                                    handleChange("date", e.target.value)
                                }
                            />
                            {errors.date && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                        <Textarea
                            rows={4}
                            placeholder="Add description..."
                            value={form.description}
                            onChange={(e) =>
                                handleChange(
                                    "description",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    {/* PREVIEW */}

                    <div className="rounded-2xl border bg-muted/40 p-4">
                        <p className="mb-3 text-sm font-medium text-muted-foreground">
                            Preview
                        </p>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold">
                                    {form.title ||
                                        "Transaction Title"}
                                </h4>

                                <p className="text-sm text-muted-foreground">
                                    {form.category ||
                                        "Category"}
                                </p>
                            </div>

                            <div
                                className={`text-xl font-bold ${form.type === "income"
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {form.type === "income"
                                    ? "+"
                                    : "-"}
                                ₹
                                {form.amount || 0}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            className="flex-1"
                            onClick={handleSubmit}
                        >
                            {transaction
                                ? "Update Transaction"
                                : "Save Transaction"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionForm;