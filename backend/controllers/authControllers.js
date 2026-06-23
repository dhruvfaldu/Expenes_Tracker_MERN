import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({ name, email, password: hashedPassword });

        // Generate JWT token
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 1000,
        // });
        const accessToken = generateAccessToken(
            user._id
        );

        const refreshToken = generateRefreshToken(
            user._id
        );

        res.cookie(
            "accessToken",
            accessToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000,
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge:
                    7 * 24 * 60 * 60 * 1000,
            }
        );

        res.status(201).json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const accessToken = generateAccessToken(user._id);

        const refreshToken = generateRefreshToken(user._id);

        res.cookie(
            "accessToken",
            accessToken,
            {

                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000,
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge:
                    7 * 24 * 60 * 60 * 1000,
            }
        );

        res.status(200).json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            message: 'User logged in successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("accessToken");

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: 'User logged out successfully' });
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
const refreshTokenHandler = async (
    req,
    res
) => {
    try {
        const token =
            req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                success: false,
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );

        const accessToken =
            generateAccessToken(
                decoded.userId
            );

        res.cookie(
            "accessToken",
            accessToken,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV ===
                    "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000,
            }
        );

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
        });
    }
};

export { registerUser, loginUser, logoutUser, getMe, refreshTokenHandler };