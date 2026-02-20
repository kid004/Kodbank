import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * Protected Route Component
 * Checks if user is authenticated (stored in sessionStorage)
 * Redirects to login if not authenticated
 * Note: Actual authentication is verified by backend via httpOnly cookie
 */
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user is authenticated from sessionStorage
    // The actual auth is handled by httpOnly cookie, but we use sessionStorage
    // to track login state on the client side
    const authStatus = sessionStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  // Show nothing while checking
  if (isAuthenticated === null) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#1a1d2e'
      }}>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
