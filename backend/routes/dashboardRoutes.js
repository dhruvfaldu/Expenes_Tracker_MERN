import express from "express";
import { getDashboardData, getExpenseByCategory, getMonthlySummary, } from "../controllers/dashboardController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/monthly-summary",protect,getMonthlySummary)
router.get("/expense-category",protect,getExpenseByCategory);

export default router;