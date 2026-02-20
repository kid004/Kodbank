const pool = require('./database');

// SQL script to create tables
const createTables = async () => {
  try {
    const connection = await pool.getConnection();
    
    // Create koduser table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS koduser (
        uid INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('customer', 'manager', 'admin') DEFAULT 'customer',
        balance DECIMAL(15,2) DEFAULT 100000.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_username (username),
        INDEX idx_email (email),
        INDEX idx_uid (uid)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    console.log('✅ koduser table created/verified');
    
    // Create CJWT table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS CJWT (
        tid INT PRIMARY KEY AUTO_INCREMENT,
        token TEXT NOT NULL,
        uid INT NOT NULL,
        expires TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_uid (uid),
        INDEX idx_expires (expires),
        INDEX idx_token (token(255)),
        FOREIGN KEY (uid) REFERENCES koduser(uid) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    console.log('✅ CJWT table created/verified');
    
    connection.release();
    console.log('✅ All tables initialized successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    throw error;
  }
};

// Run table creation
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('✅ Database initialization complete');
      process.exit(0);
    })
    .catch(error => {
      console.error('❌ Database initialization failed:', error);
      process.exit(1);
    });
}

module.exports = createTables;
