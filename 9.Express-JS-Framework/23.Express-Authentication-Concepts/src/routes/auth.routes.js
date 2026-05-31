import { Router  } from "express";
import { hanlderRegister } from "../controllers/auth.controller.js";

const router = Router();

// Register route
router.post('/register', hanlderRegister);
router.post('/login', handleLogin);
router.post('/logout', handleLogout);
router.get('/profile', handleProfile);
router.get('/refresh-token', handleRefreshToken);
router.post('/forgot-password', handleForgotPassword);
router.post('/reset-password', handleResetPassword);

export default router;