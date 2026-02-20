const User = require('../models/User');

/**
 * Get user balance
 * Protected route - Username is extracted from the verified JWT token in auth middleware
 * Returns the current balance for the authenticated user
 */
const getBalance = async (req, res) => {
  try {
    // Username is attached to request by auth middleware
    const username = req.user.username;
    
    if (!username) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid token'
      });
    }
    
    // Get balance from database
    const balance = await User.getBalanceByUsername(username);
    
    if (balance === null) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      balance: parseFloat(balance)
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve balance'
    });
  }
};

module.exports = {
  getBalance
};
