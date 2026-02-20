const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  // Create a new user
  static async create(userData) {
    const { username, email, password, phone, role = 'customer', balance = 100000 } = userData;
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = `
      INSERT INTO koduser (username, email, password, phone, role, balance)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [
        username,
        email,
        hashedPassword,
        phone || null,
        role,
        balance
      ]);
      
      return {
        uid: result.insertId,
        username,
        email,
        phone,
        role,
        balance
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('username')) {
          throw new Error('Username already exists');
        } else if (error.message.includes('email')) {
          throw new Error('Email already exists');
        }
      }
      throw error;
    }
  }
  
  // Find user by username
  static async findByUsername(username) {
    const query = 'SELECT * FROM koduser WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows[0] || null;
  }
  
  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM koduser WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    return rows[0] || null;
  }
  
  // Find user by uid
  static async findByUid(uid) {
    const query = 'SELECT uid, username, email, phone, role, balance, created_at FROM koduser WHERE uid = ?';
    const [rows] = await pool.execute(query, [uid]);
    return rows[0] || null;
  }
  
  // Get user balance by username
  static async getBalanceByUsername(username) {
    const query = 'SELECT balance FROM koduser WHERE username = ?';
    const [rows] = await pool.execute(query, [username]);
    return rows[0]?.balance || null;
  }
  
  // Compare password
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
