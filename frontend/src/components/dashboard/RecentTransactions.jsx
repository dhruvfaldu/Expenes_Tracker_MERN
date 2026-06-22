import {
    ArrowDownRight,
    ArrowUpRight,
    Pencil,
    Trash2,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { cn } from "@/lib/utils";

export default function RecentTransactions({
    transactions,
}) {
    return (
        <div className="">

            <div className="flex justify-between items-center mb-6">
                <h1 className="font-semibold">
                    Recent Transactions
                </h1>

                <span className="text-xs text-muted-foreground">
                    Last 5
                </span>
            </div>

            <div className="space-y-4">
                <Table className="w-full h-4 text-muted-foreground" >
                    <TableHeader className="bg-muted ">
                        <TableRow className="bg-muted/40">
                            <TableHead>Transaction</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-muted-foreground">
                        {transactions.map((item) => {

                            const isIncome = item.type === "income";

                            return (
                                <TableRow key={item._id} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center space-x-2">
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
                                            <span>{item.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {item.category}
                                    </TableCell>
                                    <TableCell>
                                        {item.type}
                                    </TableCell>
                                    <TableCell className="text-right">

                                        ₹{item.amount}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {item.date.slice(0, 10).split("-").reverse().join("-")}
                                    </TableCell>

                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>

            </div>
        </div>
    );
}