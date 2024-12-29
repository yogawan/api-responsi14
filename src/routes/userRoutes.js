const express = require('express');
const { register, login, getUserDetails, getUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getUserProfile);

module.exports = router;
