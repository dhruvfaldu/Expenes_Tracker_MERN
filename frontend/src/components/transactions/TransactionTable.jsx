import { useSelector } from "react-redux";
import {
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

// shadcn components (assumed installed)
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog } from "radix-ui";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

const TransactionTable = ({ transactions, setSelectedTransaction, setOpen, setDeleteDialogOpen, setTransactionToDelete }) => {
    // console.log(transactions);

    return (
        <div className="space-y-4">
            {/* TABLE */}
            <Table>
                {/* HEADER */}
                <TableHeader>
                    <TableRow className="bg-muted/40">
                        <TableHead>Transaction</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {transactions?.length > 0 ? (
                        transactions?.map((t, i) => {
                            const isIncome = t?.type === "income";

                            return (
                                <TableRow key={i} className="hover:bg-muted/50">

                                    {/* TITLE + ICON */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "h-9 w-9 rounded-full flex items-center justify-center",
                                                    isIncome ? "bg-green-100" : "bg-red-100"
                                                )}
                                            >
                                                {isIncome ? (
                                                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                                                ) : (
                                                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                                                )}
                                            </div>

                                            <div>
                                                <p className="font-medium">{t.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Transaction entry
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* CATEGORY */}
                                    <TableCell>
                                        <Badge variant="secondary">{t.category}</Badge>
                                    </TableCell>

                                    {/* TYPE */}
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                isIncome
                                                    ? "bg-green-500/10 text-green-600"
                                                    : "bg-red-500/10 text-red-600"
                                            )}
                                        >
                                            {t.type}
                                        </Badge>
                                    </TableCell>

                                    {/* AMOUNT */}
                                    <TableCell className="text-right font-semibold">
                                        <span className={isIncome ? "text-green-600" : "text-red-600"}>
                                            {isIncome ? "+" : "-"}
                                            {Number(t.amount).toLocaleString()}
                                        </span>
                                    </TableCell>

                                    {/* DATE */}
                                    <TableCell className="text-muted-foreground">
                                        {t.date.slice(0, 10).split("-").reverse().join("-")}
                                    </TableCell>

                                    {/* ACTIONS */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedTransaction(t);
                                                    setOpen(true);
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                onClick={() => {
                                                    setDeleteDialogOpen(true);
                                                    setTransactionToDelete(t);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                No transactions found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>


        </div>
    );
};

export default TransactionTable;