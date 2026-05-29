import express from 'express';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';


const router = express.Router();

// public route 
router.get('/public', (req, res) => {
    res.json({ message: 'This is a public route' });
});

// protected - own profile route
router.get('/profile', authenticate, authorize(['readOwn', 'profile']), (req, res) => {
    res.json({ 
        message: `Profile of user: ${req.user.id}`, 
        user: req.user 
    });
});


router.get('/admin', authenticate, authorize(['readAny', 'user']), (req, res) => {
    res.json({ message: 'This is an admin route' });
});


router.post('/admin', authenticate, authorize(['createAny', 'user']), (req, res) => {
    res.json({ message: 'User created successfully' });
});

export default router;
