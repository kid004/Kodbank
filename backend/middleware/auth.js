const { verifyToken } = require('../utils/jwt');
const Token = require('../models/Token');

/**
 * Authentication middleware to verify JWT token
 * 
 * Process:
 * 1. Extracts JWT token from HTTP-only cookie
 * 2. Verifies token signature using JWT_SECRET
 * 3. Checks if token exists in CJWT table and is not expired
 * 4. Extracts username from token subject (sub claim)
 * 5. Attaches user info (username, role, uid) to request object
 * 6. Returns 401 if token is invalid/expired/missing
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token from cookie
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: No token provided'
      });
    }
    
    // Verify token signature
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: `Unauthorized: ${error.message}`
      });
    }
    
    // Check if token exists in database and is not expired
    const tokenRecord = await Token.findByToken(token);
    if (!tokenRecord) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Token not found or expired'
      });
    }
    
    // Attach user information to request object
    req.user = {
      username: decoded.sub, // Subject (username)
      role: decoded.role,     // Role claim
      uid: tokenRecord.uid
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

module.exports = authenticate;
