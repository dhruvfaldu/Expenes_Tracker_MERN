import express from 'express';
const router = express.Router();
import { registerUser, loginUser, logoutUser, getMe, refreshTokenHandler } from '../controllers/authControllers.js';
import protect from '../middleware/authMiddleware.js';

// Register route
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);
router.get('/refresh-token', refreshTokenHandler);

export default router;