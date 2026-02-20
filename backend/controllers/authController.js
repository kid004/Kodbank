const User = require('../models/User');
const Token = require('../models/Token');
const { generateToken } = require('../utils/jwt');

/**
 * Register a new user
 * Validates input, checks for duplicates, hashes password, and creates user with default balance
 */
const register = async (req, res) => {
  try {
    const { username, password, email, phone, role } = req.body;
    
    // Validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and email are required'
      });
    }
    
    // Ensure role is 'customer' only
    if (role && role !== 'customer') {
      return res.status(400).json({
        success: false,
        message: 'Only customer role is allowed for registration'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Validate password (minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
    
    // Check for duplicate username
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Username already exists'
      });
    }
    
    // Check for duplicate email
    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    // Create user with default balance of 100000
    const userData = {
      username,
      email,
      password,
      phone: phone || null,
      role: 'customer',
      balance: 100000
    };
    
    const newUser = await User.create(userData);
    
    // Return success response (excluding password)
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        uid: newUser.uid,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        balance: newUser.balance
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

/**
 * Login user and generate JWT token
 * Validates credentials, generates JWT, stores token in database, and sets HTTP-only cookie
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }
    
    // Find user by username
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    
    // Compare password
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    
    // Generate JWT token
    const token = generateToken(user.username, user.role);
    
    // Calculate expiration time (24 hours from now)
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    
    // Save token to database
    await Token.saveToken(token, user.uid, expires);
    
    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', // 'lax' for development to allow cross-origin
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      path: '/' // Ensure cookie is available for all paths
    });
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        uid: user.uid,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
};

module.exports = {
  register,
  login
};
