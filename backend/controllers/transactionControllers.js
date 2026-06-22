import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Transaction from '../models/Transaction.js';


// Get all transactions for the logged-in user
const getAllTransactions = async (req, res) => {
    try {
        const { search, type, category, month } = req.query;
        console.log(req.query);

        const filter = {
            user: req.user.userId
        };

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        if (month) {
            const monthNumber = Number(month);

            const startDate = new Date(
                new Date().getFullYear(),
                monthNumber - 1,
                1
            );

            const endDate = new Date(
                new Date().getFullYear(),
                monthNumber,
                1
            );

            filter.date = {
                $gte: startDate,
                $lt: endDate,
            };
        }

        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        console.log("Final Filter:", filter);

        const transactions = await Transaction.find(filter);

        const totalIncome = transactions.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
        const totalExpense = transactions.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);

        const balance = totalIncome - totalExpense;

        res.status(200).json({ success: true, transactions, balance, totalIncome, totalExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single transaction by ID
const getTransactionById = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findOne({ _id: id, user: req.user.userId });

        if (!transaction) {
            return res.status(404).json({ success: false, message: 'Transaction not found' });
        }

        res.status(200).json({ success: true, data: transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

//create transaction
const createTransaction = async (req, res) => {
    const { title, amount, type, category, date, description } = req.body;

    if (!title || !amount || !type || !category) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid transaction type'
        });
    }
    // console.log(req.user);
    try {
        const transaction = await Transaction.create({
            user: req.user?.userId,
            title,
            amount,
            type,
            category,
            date,
            description,
        });

        res.status(201).json({
            success: true,
            transaction,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

//update transaction
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { title, amount, type, category, date, description } = req.body;

    if (!title || !amount || !type || !category) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid transaction type'
        });
    }

    try {
        // const transaction = await Transaction.findById({ _id: id, user: req.user.userId });
        const transaction = await Transaction.findOne({ _id: id, user: req.user.userId });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        transaction.title = title;
        transaction.amount = amount;
        transaction.type = type;
        transaction.category = category;
        if (date) transaction.date = date;
        transaction.description = description;

        await transaction.save();

        res.status(200).json({
            success: true,
            data: transaction,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

//delete transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params;

    try {
        // const transaction = await Transaction.findById({ _id: id, user: req.user.userId });
        const transaction = await Transaction.findOne({ _id: id, user: req.user.userId });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        await Transaction.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            deletedID:id,
            message: 'Transaction deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};




export { getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction };