import React, { useState } from 'react';
import './Keno.css'; 

const Keno = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [betAmount, setBetAmount] = useState('0.00000000');
  const [risk, setRisk] = useState('Medium');

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < 10) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleAutoPick = () => {
    const numbers = [];
    while (numbers.length < 10) {
      const randomNumber = Math.floor(Math.random() * 40) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    setSelectedNumbers(numbers);
  };

  const handleClearTable = () => {
    setSelectedNumbers([]);
  };

  const handleBet = () => {
    console.log('Bet placed:', { selectedNumbers, betAmount, risk });
  };

  const renderNumberGrid = () => {
    const grid = [];
    for (let i = 1; i <= 40; i++) {
      grid.push(
        <button
          key={i}
          className={`number-button ${selectedNumbers.includes(i) ? 'selected' : ''}`}
          onClick={() => handleNumberClick(i)}
        >
          {i}
        </button>
      );
    }
    return grid;
  };

  return (
    <div className="keno-wrapper">
      <div className="keno-container">
        <div className="left-panel">
          <div className="input-section">
            <label className="input-label">Bet Amount</label>
            <div className="bet-amount-container">
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="bet-input"
              />
              <div className="bet-controls">
                <button className="bet-control-btn bitcoin">₿</button>
                <button className="bet-control-btn">½</button>
                <button className="bet-control-btn">2×</button>
              </div>
            </div>
            <div className="bet-amount-display">$0.00</div>
          </div>

          <div className="input-section">
            <label className="input-label">Risk</label>
            <select
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              className="risk-select"
            >
              <option value="Classic">Classic</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button className="action-button" onClick={handleAutoPick}>
            Auto Pick
          </button>

          <button className="action-button" onClick={handleClearTable}>
            Clear Table
          </button>

          <button className="bet-button" onClick={handleBet}>
            Bet
          </button>
        </div>

        <div className="right-panel">
          <div className="number-grid">{renderNumberGrid()}</div>
          <div className="bottom-info">
            <div className="selection-info">Select 1 - 10 numbers to play</div>
          </div>
        </div>
      </div>

      <div className="keno-icons">
        <div className="top-nav">
          <div className="nav-icons">
            <button className="nav-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65Z" />
              </svg>
            </button>
            <button className="nav-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
            </button>
            <button className="nav-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </button>
          </div>
          <button className="fairness-btn">Fairness</button>
        </div>
      </div>
    </div>
  );
};

export default Keno;
