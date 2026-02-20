const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate JWT token with username as subject and role as claim
 * @param {string} username - Username to use as subject
 * @param {string} role - User role to include as claim
 * @returns {string} JWT token
 */
const generateToken = (username, role) => {
  const payload = {
    sub: username, // Subject (username)
    role: role,    // Claim (role)
    iat: Math.floor(Date.now() / 1000) // Issued at
  };
  
  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: 'HS256' // HMAC SHA-256
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    }
    throw error;
  }
};

/**
 * Decode token without verification (for debugging)
 * @param {string} token - JWT token to decode
 * @returns {object} Decoded token payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};
