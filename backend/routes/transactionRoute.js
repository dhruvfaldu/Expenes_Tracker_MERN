import express from 'express';
import { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction } from '../controllers/transactionControllers.js';
const router = express.Router();
import protect from '../middleware/authMiddleware.js';

router.get('/', protect, getAllTransactions);
router.get('/:id', protect, getTransactionById);
router.post('/', protect, createTransaction);
router.put('/:id', protect, updateTransaction);
router.delete('/:id', protect, deleteTransaction);


export default router;