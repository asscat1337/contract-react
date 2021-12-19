const {Router} = require('express');
const router = Router();
const authController = require('../controller/authController');




router.post('/login',authController.loginUser);
router.post('/reset-password',authController.resetPassword)
router.post('/register',authController.registerUser)
router.get('/get-role',authController.getRole)

module.exports = router;