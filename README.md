# Kodbank - Banking Application

A full-stack banking application with user registration, JWT-based authentication, and balance checking functionality.

## Features

- ✅ User Registration with default balance of ₹100,000
- ✅ Secure Login with JWT token authentication
- ✅ Protected Dashboard with balance checking
- ✅ Beautiful celebration animations when checking balance
- ✅ Secure password hashing with bcrypt
- ✅ HTTP-only cookies for token storage
- ✅ Database token storage for enhanced security

## Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **MySQL** database (Aiven cloud)
- **JWT** for authentication
- **bcrypt** for password hashing
- **cookie-parser** for cookie management

### Frontend
- **React** with **Vite**
- **React Router** for navigation
- **Axios** for API calls
- **react-confetti** for celebration animations

## Project Structure

```
kodbank/
├── backend/
│   ├── config/
│   │   ├── database.js          # Database connection
│   │   └── initTables.js        # Table initialization
│   ├── models/
│   │   ├── User.js              # User model
│   │   └── Token.js             # Token model
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── userController.js    # User operations
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   └── user.js              # User routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── utils/
│   │   └── jwt.js               # JWT utilities
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env                     # Environment variables
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Login.jsx        # Login page
│   │   │   └── Dashboard.jsx    # User dashboard
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── services/
│   │   │   └── api.js           # API service
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Database Schema

### Table: `koduser`
- `uid` (INT PRIMARY KEY AUTO_INCREMENT)
- `username` (VARCHAR UNIQUE NOT NULL)
- `email` (VARCHAR UNIQUE NOT NULL)
- `password` (VARCHAR NOT NULL) - hashed with bcrypt
- `phone` (VARCHAR)
- `role` (ENUM: 'customer', 'manager', 'admin') DEFAULT 'customer'
- `balance` (DECIMAL(15,2)) DEFAULT 100000.00
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Table: `CJWT`
- `tid` (INT PRIMARY KEY AUTO_INCREMENT)
- `token` (TEXT NOT NULL)
- `uid` (INT NOT NULL, FOREIGN KEY REFERENCES koduser(uid))
- `expires` (TIMESTAMP NOT NULL)
- `created_at` (TIMESTAMP)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL database (Aiven cloud)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` file and update with your database credentials
   - Update `JWT_SECRET` with a strong secret key (minimum 32 characters)

4. Initialize database tables:
```bash
node config/initTables.js
```

5. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123",
  "email": "john@example.com",
  "phone": "+1234567890",
  "role": "customer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "uid": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "customer",
    "balance": 100000
  }
}
```

#### POST `/api/auth/login`
Login user and get JWT token

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "uid": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

**Cookie:** JWT token is set as HTTP-only cookie named `token`

### User Operations

#### GET `/api/user/balance`
Get user balance (Protected Route)

**Headers:** Cookie with `token`

**Response:**
```json
{
  "success": true,
  "balance": 100000.00
}
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Tokens**: Secure token-based authentication using HS256 algorithm
3. **HTTP-only Cookies**: Tokens stored in HTTP-only cookies to prevent XSS attacks
4. **Token Storage**: Tokens stored in database for validation and revocation
5. **CORS Protection**: Configured CORS for frontend origin only
6. **Input Validation**: Server-side validation for all inputs
7. **SQL Injection Protection**: Using parameterized queries

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- Database connection uses SSL (required for Aiven)
- JWT tokens expire after 24 hours
- Default user balance is ₹100,000

## Testing the Application

1. **Register a new user:**
   - Navigate to `http://localhost:3000/register`
   - Fill in the registration form
   - Submit to create account

2. **Login:**
   - Navigate to `http://localhost:3000/login`
   - Enter username and password
   - Submit to login

3. **Check Balance:**
   - After login, you'll be redirected to dashboard
   - Click "Check Balance" button
   - See your balance with celebration animation!

## Error Handling

The application includes comprehensive error handling:
- Validation errors for form inputs
- Database error handling
- Authentication error handling
- Network error handling

## Future Enhancements

- Logout functionality
- Transaction history
- Transfer funds between accounts
- Account settings
- Password reset functionality
- Email verification

## License

ISC

## Author

Kodbank Development Team
