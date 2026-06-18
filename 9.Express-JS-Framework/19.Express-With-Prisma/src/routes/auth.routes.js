import express from 'express';
import { 
    handleRegister, 
    handleLogin, 
    handleLogout
} 
from '../controllers/auth.controller.js';

// create router
const router = express.Router();


// define routes
router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);


export default router;