import React, { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, Trash2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionTable from "@/components/transactions/TransactionTable";
import TransactionForm from "@/components/transactions/TransactionForm";

import { useDispatch, useSelector } from "react-redux";
import { deleteTran, getTransactionsData } from "@/store/slice/expenseSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Transactions = () => {
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const dispatch = useDispatch();

    const { transactions, loading, filters, } = useSelector((state) => state.expense);

    const filteredTransactions = transactions.filter((t) => {
        const matchesSearch = !filters.search || t.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesCategory = filters.category === "all" || t.category === filters.category;
        const matchesType = filters.type === "all" || t.type === filters.type;
        const matchesDate = !filters.date || t.date.slice(0, 10) === filters.date;
        return (matchesSearch && matchesCategory && matchesType && matchesDate);
    });

    const handleDeleteConfirm = async () => {
        if (!transactionToDelete) return;

        await dispatch(deleteTran(transactionToDelete._id));

        setDeleteDialogOpen(false);
    };

    const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    const totalIncome = transactions.filter(item => item.type === "income").reduce((acc, item) => acc + item.amount, 0);

    const totalExpense = transactions.filter(item => item.type === "expense").reduce((acc, item) => acc + item.amount, 0);

    return (
        <div className="space-y-5 p-6">
            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Transactions
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Track, manage and analyze all your financial activities.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="h-11"
                    onClick={() => {
                        setSelectedTransaction(null);
                        setOpen(true);
                    }}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Transaction
                </Button>
            </div>

            {/* ================= STATS ================= */}

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border bg-card p-5">
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Total Transactions
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Wallet className="h-5 w-5 text-primary" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold">
                        {transactions?.length || 0}
                    </h3>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Income
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                            <ArrowUpRight className="h-5 w-5 text-green-500" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-green-600">
                        {`${totalIncome > 0 ? "+" : ""}${totalIncome}`}
                    </h3>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Expenses
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                            <ArrowDownRight className="h-5 w-5 text-red-500" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-red-600">
                        {`${totalExpense > 0 ? "-" : ""}${totalExpense}`}
                    </h3>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                            Net Balance
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <Wallet className="h-5 w-5 text-primary" />
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold">
                        {`${totalBalance > 0 ? "+" : ""}${totalBalance}`}
                    </h3>
                </div>
            </div>

            {/* ================= FILTER CARD ================= */}

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="mb-2">
                    <h3 className="font-semibold">
                        Filters
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        Filter transactions by category, type and date.
                    </p>
                </div>

                <TransactionFilters />
            </div>

            {/* ================= TABLE CARD ================= */}

            <div className="rounded-2xl border bg-card shadow-sm">
                <div className="border-b px-6 py-4">
                    <h3 className="font-semibold">
                        Transaction History
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        View and manage all transactions.
                    </p>
                </div>

                <div className="p-3">
                    <TransactionTable
                        transactions={filteredTransactions}
                        loading={loading}
                        setSelectedTransaction={setSelectedTransaction}
                        setOpen={setOpen}
                        setDeleteDialogOpen={setDeleteDialogOpen}
                        setTransactionToDelete={setTransactionToDelete}
                    />
                </div>
            </div>

            {/* ================= MODAL ================= */}

            <TransactionForm
                open={open}
                onOpenChange={(value) => {
                    setOpen(value);

                    if (!value) {
                        setSelectedTransaction(null);
                    }
                }}
                transaction={selectedTransaction}
            />

            {/* DELETE DIALOG */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md rounded-2xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-red-500" />
                            Delete Transaction
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-2">
                            Are you sure you want to delete this transaction? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {transactionToDelete && (
                        <div className="my-4 rounded-xl border bg-muted/40 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-foreground">
                                        {transactionToDelete.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {transactionToDelete.category} • {transactionToDelete.date ? new Date(transactionToDelete.date).toLocaleDateString() : "-"}
                                    </p>
                                </div>
                                {/* <div className={cn(
                                    "text-lg font-bold",
                                    transactionToDelete.type === "income" ? "text-green-600" : "text-red-600"
                                )}>
                                    {transactionToDelete.type === "income" ? "+" : "-"} ₹{Number(transactionToDelete.amount).toLocaleString()}
                                </div> */}
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex flex-row gap-3 justify-end mt-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(false);
                                setTransactionToDelete(null);
                            }}
                            className="flex-1 sm:flex-initial"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            className="flex-1 sm:flex-initial"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Transactions;