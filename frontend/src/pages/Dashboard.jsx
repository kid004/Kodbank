import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { checkBalance } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCheckBalance = async () => {
    setLoading(true);
    setError('');
    setBalance(null);
    setShowConfetti(false);

    try {
      const response = await checkBalance();
      if (response.success) {
        setBalance(response.balance);
        // Trigger confetti animation
        setShowConfetti(true);
        // Hide confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    } catch (err) {
      setError(err.message || 'Failed to retrieve balance');
      // If unauthorized, clear auth state and redirect to login
      if (err.message?.includes('Unauthorized') || err.message?.includes('token') || err.message?.includes('401')) {
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome to Kodbank</h1>
        <p className="dashboard-subtitle">Your banking hub</p>

        <div className="balance-section">
          <button
            onClick={handleCheckBalance}
            className="check-balance-button"
            disabled={loading}
          >
            {loading ? 'Checking Balance...' : 'Check Balance'}
          </button>

          {error && (
            <div className="error-message">{error}</div>
          )}

          {balance !== null && (
            <div className="balance-display">
              <div className="balance-label">Your balance is:</div>
              <div className="balance-amount">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              {showConfetti && (
                <div className="celebration-text">🎉 Congratulations! 🎉</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
