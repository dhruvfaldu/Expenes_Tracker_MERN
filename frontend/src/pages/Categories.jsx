import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Plus,
    Wallet,
    ArrowDownCircle,
    ArrowUpCircle,
    FolderOpen,
    Trash2,
    Tag,
    Utensils,
    Car,
    Home,
    Briefcase,
    Heart,
    Gift,
    ShoppingCart,
    PiggyBank,
} from "lucide-react";

import {
    getCategoriesData,
    createCategoryData,
    deleteCategoryData,
} from "@/store/slice/categorySlice";

const Categories = () => {
    const dispatch = useDispatch();

    const { categories, categoriesLoading } = useSelector(
        (state) => state.category
    );

    const [open, setOpen] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        type: "expense",
    });

    useEffect(() => {
        dispatch(getCategoriesData());
    }, [dispatch]);

    const handleCreateCategory = async () => {
        if (!formData.name.trim()) return;

        const result = await dispatch(
            createCategoryData(formData)
        );

        if (createCategoryData.fulfilled.match(result)) {
            setOpen(false);

            setFormData({
                name: "",
                type: "expense",
            });
        }
    };

    const handleDeleteCategory = async () => {
        if (!selectedCategory) return;

        const result = await dispatch(
            deleteCategoryData(selectedCategory._id)
        );

        if (deleteCategoryData.fulfilled.match(result)) {
            setDeleteDialogOpen(false);
            setSelectedCategory(null);
        }
    };

    const getCategoryIcon = (name) => {
        const category = name.toLowerCase();

        if (category.includes("food"))
            return <Utensils className="h-5 w-5" />;

        if (category.includes("travel"))
            return <Car className="h-5 w-5" />;

        if (category.includes("education"))
            return <ArrowUpCircle className="h-5 w-5" />;

        if (category.includes("rent"))
            return <Home className="h-5 w-5" />;

        if (category.includes("salary"))
            return <Briefcase className="h-5 w-5" />;

        if (category.includes("investment"))
            return <PiggyBank className="h-5 w-5" />;

        if (category.includes("shopping"))
            return <ShoppingCart className="h-5 w-5" />;

        if (category.includes("transport"))
            return <Car className="h-5 w-5" />;

        if (category.includes("other"))
            return <FolderOpen className="h-5 w-5" />;

        if (category.includes("loan"))
            return <Wallet className="h-5 w-5" />;

        if (category.includes("entertainment"))
            return <ArrowDownCircle className="h-5 w-5" />;

        if (category.includes("gift"))
            return <Gift className="h-5 w-5" />;

        if (category.includes("health"))
            return <Heart className="h-5 w-5" />;


        return <Tag className="h-5 w-5" />;
    };

    const expenseCount = categories.filter((c) => c.type === "expense").length;

    const incomeCount = categories.filter((c) => c.type === "income").length;

    if (categoriesLoading) {
        return (
            <div className="p-6">
                Loading Categories...
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">

            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Categories
                    </h1>

                    <p className="text-muted-foreground">
                        Manage income and expense categories
                    </p>
                </div>

                <Button
                    className="gap-2"
                    onClick={() => setOpen(true)}
                >
                    <Plus className="h-4 w-4" />
                    Add Category
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Categories
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {categories.length}
                                </h2>
                            </div>

                            <div className="flex justify-center h-12 w-12 rounded-full bg-primary/20 items-center gap-2">
                                <Wallet className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Expense Categories
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {expenseCount}
                                </h2>
                            </div>

                            <div className="flex justify-center h-12 w-12 rounded-full bg-red-500/20 items-center gap-2">
                                <ArrowDownCircle className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Income Categories
                                </p>

                                <h2 className="text-3xl font-bold">
                                    {incomeCount}
                                </h2>
                            </div>

                            <div className="flex justify-center h-12 w-12 rounded-full bg-green-500/20 items-center gap-2">
                                <ArrowUpCircle className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Category List */}
            {categories.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center gap-4 py-16">

                        <FolderOpen className="h-12 w-12 text-muted-foreground" />

                        <div className="text-center">
                            <h3 className="font-semibold">
                                No Categories Yet
                            </h3>

                            <p className="text-muted-foreground">
                                Create your first category to start
                                tracking transactions.
                            </p>
                        </div>

                        <Button onClick={() => setOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>

                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {categories.map((category) => (
                        <Card
                            key={category._id}
                            className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <CardContent className="p-5">

                                <div className="flex items-start justify-between">

                                    <div className="flex gap-3">

                                        <div
                                            className={`rounded-xl p-3
                                            ${category.type === "income"
                                                    ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                                                    : "bg-red-100 text-red-600 dark:bg-red-900/20"
                                                }`}
                                        >
                                            {getCategoryIcon(category.name)}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {category.name}
                                            </h3>

                                            <p className="text-sm capitalize text-muted-foreground">
                                                {category.type} Category
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>

                                </div>

                            </CardContent>
                        </Card>
                    ))}

                </div>
            )}

            {/* Add Category Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className=" p-5 " >

                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold mb-2">
                            Add Category
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Category Name *
                            </label>

                            <Input
                                placeholder="Enter category name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value, })
                                }
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Type
                            </label>

                            <Select
                                value={formData.type}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        type: value,
                                    })
                                }
                            >
                                <SelectTrigger position="pop-start" align="end">
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent >
                                    <SelectItem value="expense">
                                        Expense
                                    </SelectItem>

                                    <SelectItem value="income">
                                        Income
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <DialogFooter>

                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={handleCreateCategory}>
                            Add Category
                        </Button>

                    </DialogFooter>

                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <DialogContent className="p-5 border-red-500 border-l-4">

                    <DialogHeader>
                        <DialogTitle className={`text-xl font-semibold mb-1`}>
                            Delete Category
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground mb-4">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-foreground">
                            {selectedCategory?.name}
                        </span>
                        ?
                    </p>

                    <DialogFooter>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setDeleteDialogOpen(false)
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleDeleteCategory}
                        >
                            Delete
                        </Button>

                    </DialogFooter>

                </DialogContent>
            </Dialog>

        </div>
    );
};

export default Categories;