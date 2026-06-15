const express = require('express');
const {
   handleUserRegister,
   handleUserLogin,
   handleUserLogout,
   handleUserList,
   handleUserUpdate,
   handleUserDelete

} = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', handleUserRegister);
router.post('/logun', handleUserLogin);
router.post('/logout', handleUserLogout);
router.get('/list', handleUserList);
router.put('/update/:id', handleUserUpdate);
router.delete('/register', handleUserDelete);

module.exports = router;