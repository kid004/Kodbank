# Quick Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL database access (Aiven credentials provided)

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# The .env file is already configured with your Aiven database credentials
# Verify the JWT_SECRET in .env (should be at least 32 characters)

# Initialize database tables
node config/initTables.js

# Start the backend server
npm start
# OR for development (with auto-reload):
npm run dev
```

Backend will run on: `http://localhost:5000`

### 2. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend will run on: `http://localhost:3000`

### 3. Test the Application

1. Open browser to `http://localhost:3000`
2. You'll be redirected to the login page
3. Click "Register here" to create a new account
4. Fill in the registration form:
   - Username (required, min 3 chars)
   - Email (required, valid format)
   - Password (required, min 6 chars)
   - Phone (optional)
5. After registration, you'll be redirected to login
6. Login with your credentials
7. You'll be redirected to the dashboard
8. Click "Check Balance" to see your balance with celebration animation!

## Troubleshooting

### Database Connection Issues
- Verify your Aiven database credentials in `backend/.env`
- Ensure SSL mode is set to REQUIRED
- Check if the database is accessible from your network

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

### CORS Issues
- Ensure backend CORS is configured for `http://localhost:3000`
- Check `backend/.env` has `FRONTEND_URL=http://localhost:3000`

### Token Issues
- Clear browser cookies if experiencing authentication issues
- Verify JWT_SECRET is set in `backend/.env`

## Database Tables

The application will automatically create these tables on first run:
- `koduser` - Stores user information
- `CJWT` - Stores JWT tokens

If tables already exist, the initialization script will skip creation.

## Default Values

- New users get a default balance of ₹100,000
- JWT tokens expire after 24 hours
- Only 'customer' role is allowed during registration
