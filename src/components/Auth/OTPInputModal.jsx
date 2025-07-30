import { useState, useRef, useEffect } from 'react';
import './OTPInputModal.css';

function OTPInputModal({ onClose, email }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    
    if (value && index < 5) {
      setActiveIndex(index + 1);
      
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (index, e) => {
    
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleInputFocus = (index) => {
    
    const canFocus = index === 0 || otp[index - 1] !== '';
    if (canFocus) {
      setActiveIndex(index);
    } else {
      
      const firstEmptyIndex = otp.findIndex(digit => digit === '');
      if (firstEmptyIndex !== -1) {
        setActiveIndex(firstEmptyIndex);
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '').slice(0, 6);
    
    const newOtp = [...otp];
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);
    
    
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically verify the OTP with your backend
      console.log('Verifying OTP:', otpString, 'for email:', email);
      
      // On success, close modal and proceed to password reset
      onClose();
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal-container">
        <button 
          onClick={onClose}
          className="otp-modal-close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="otp-modal-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="otp-modal-header">
          OTP Input
        </div>
        
        <div className="otp-modal-subtitle">
          Enter your one-time password
        </div>
        
        <form onSubmit={handleSubmit} className="otp-modal-form">
          <div className="otp-inputs-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                className={`otp-input ${activeIndex === index ? 'active' : ''}`}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => handleInputFocus(index)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={index > 0 && otp[index - 1] === ''}
              />
            ))}
          </div>
          
          {error && <div className="otp-modal-error">{error}</div>}
          
          <button
            type="submit"
            className={`otp-submit-btn ${isComplete ? 'active' : ''}`}
            disabled={!isComplete || isLoading}
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </button>
        </form>
        
        <div className="otp-modal-footer">
          <p>Didn't receive the code?</p>
          <button className="otp-resend-btn">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTPInputModal;
