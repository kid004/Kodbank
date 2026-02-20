const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { getBalance } = require('../controllers/userController');

// GET /api/user/balance - Get user balance (protected route)
router.get('/balance', authenticate, getBalance);

module.exports = router;
