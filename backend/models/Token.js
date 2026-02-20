const pool = require('../config/database');

class Token {
  // Save token to database
  static async saveToken(token, uid, expires) {
    const query = `
      INSERT INTO CJWT (token, uid, expires)
      VALUES (?, ?, ?)
    `;
    
    try {
      const [result] = await pool.execute(query, [token, uid, expires]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  
  // Find token in database
  static async findByToken(token) {
    const query = `
      SELECT t.*, u.username, u.role 
      FROM CJWT t
      INNER JOIN koduser u ON t.uid = u.uid
      WHERE t.token = ? AND t.expires > NOW()
    `;
    
    const [rows] = await pool.execute(query, [token]);
    return rows[0] || null;
  }
  
  // Delete token (logout)
  static async deleteToken(token) {
    const query = 'DELETE FROM CJWT WHERE token = ?';
    await pool.execute(query, [token]);
  }
  
  // Delete expired tokens
  static async deleteExpiredTokens() {
    const query = 'DELETE FROM CJWT WHERE expires < NOW()';
    await pool.execute(query, []);
  }
  
  // Delete all tokens for a user
  static async deleteTokensByUid(uid) {
    const query = 'DELETE FROM CJWT WHERE uid = ?';
    await pool.execute(query, [uid]);
  }
}

module.exports = Token;
