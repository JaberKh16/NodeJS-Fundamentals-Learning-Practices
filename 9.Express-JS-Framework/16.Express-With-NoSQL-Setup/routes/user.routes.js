const express = require('express');
const {
   handleUserRegister,
   handleUserLogin,
   handleUserLogout,
   handleRefreshToken,
   handleUserList,
   handleUserUpdate,
   handleUserDelete

} = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);
router.get('/list', handleUserList);
router.put('/update/:id', handleUserUpdate);
router.delete('/delete/:id', handleUserDelete);
router.post('/refresh-token', handleRefreshToken);

// Example protected route
router.get('/profile', authenticateToken, async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});



module.exports = router;