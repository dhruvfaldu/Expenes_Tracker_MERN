import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import { getCategoriesData } from "@/store/slice/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { deleteCategoryData } from "../store/slice/categorySlice";
import { createCategoryData } from "../store/slice/categorySlice";

const Categories = () => {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        type: "expense",
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const dispatch = useDispatch();

    const { categories, categoriesLoading } = useSelector((state) => state.category);

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

    if (categoriesLoading) {
        return (
            <div className="p-6">
                Loading Categories...
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Categories</h1>
                    <span className="text-muted-foreground">
                        {categories.length} categories
                    </span>
                </div>

                <Button onClick={() => setOpen(true)}>
                    Add Category
                </Button>
            </div>

            {categories.length === 0 ? (
                <Card>
                    <CardContent className="p-8 text-center">
                        No categories found.
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <Card key={category._id}>
                                <CardContent className="flex items-center justify-between p-4">
                                    <div>
                                        <h3 className="font-medium">
                                            {category.name}
                                        </h3>

                                        <p className="text-sm text-muted-foreground capitalize">
                                            {category.type} Category
                                        </p>
                                    </div>

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}


            {/* //ADD CATEGORY MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Add Category
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <label className="text-sm font-medium">
                                Category Name
                            </label>

                            <Input
                                placeholder="Enter category name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">
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
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
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

            {/* //DELETE DIALOG */}
            <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Delete Category
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete
                        {" "}
                        <span className="font-semibold text-foreground">
                            {selectedCategory?.name}
                        </span>
                        ?
                    </p>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
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