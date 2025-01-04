const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user details
router.get('/me', authenticate, getCurrentUser);

module.exports = router;
