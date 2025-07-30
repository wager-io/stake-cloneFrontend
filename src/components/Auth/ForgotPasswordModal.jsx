import { useState } from 'react';
import './ForgotPasswordModal.css';
import OTPInputModal from './OTPInputModal';

function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowOTPModal(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-modal-overlay">
      <div className="forgot-modal-container">
        <button 
          onClick={onClose}
          className="forgot-modal-close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="forgot-modal-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="forgot-modal-header">
          Forgot Password
        </div>
        <div className="forgot-modal-body">
          {success ? (
            <div className="forgot-modal-success">
              <p>If an account with that email exists, a password reset link has been sent.</p>
              <button
                className="forgot-modal-success-btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="forgot-modal-field">
                <label className="forgot-modal-label">
                  Enter your email address
                </label>
                <input
                  type="email"
                  className="forgot-modal-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className="forgot-modal-error">{error}</div>}
              <div className="forgot-modal-actions">
                <button
                  type="submit"
                  className="forgot-modal-submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {showOTPModal && (
        <OTPInputModal 
          onClose={() => {
            setShowOTPModal(false);
            onClose();
          }}
          email={email}
        />
      )}
    </div>
  );
}

export default ForgotPasswordModal;