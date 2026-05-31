import { Router  } from "express";
import { handleLogin, handleLogout, handleProfile, handleRefreshToken, handleForgotPassword, handleResetPassword } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Register route
router.post('/register', hanlderRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.get('/profile', handleProfile);
router.get('/refresh-token', handleRefreshToken);
router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password', handleResetPassword);

// protected route example
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

export default router;