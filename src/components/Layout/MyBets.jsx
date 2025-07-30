import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyBets.css';

const MyBets = () => {
  const navigate = useNavigate();
  const [bets, setBets] = useState([]);
  const [activeTab, setActiveTab] = useState('Casino');
  const [currentPage, setCurrentPage] = useState(1);
  const betsPerPage = 10;

  // TODO: Replace with real data from backend API
  // API endpoint should be: GET /api/user/bets
  // Response should include: { bets: [{ id, game, betId, date, betAmount, multiplier, payout, gameType }] }
  const sampleBets = [
    // Empty array since no bets have been placed yet
    // When user places bets, they will be added here by the backend
  ];

  useEffect(() => {
    // TODO: Replace with API call to backend
    // For now, clear any old localStorage data and start fresh
    localStorage.removeItem('userBets'); // Clear old sample data
    setBets(sampleBets); // Empty array
    
    // When backend is ready, replace above with:
    // fetchUserBets().then(bets => setBets(bets));
  }, []);

  const filteredBets = bets.filter(bet => 
    activeTab === 'Casino' ? bet.gameType === 'casino' : bet.gameType === 'sports'
  );

  const totalPages = Math.ceil(filteredBets.length / betsPerPage);
  const startIndex = (currentPage - 1) * betsPerPage;
  const endIndex = startIndex + betsPerPage;
  const currentBets = filteredBets.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const formatCurrency = (amount) => {
    return amount.toFixed(8);
  };

  const formatMultiplier = (multiplier) => {
    return `${multiplier.toFixed(2)}x`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="my-bets-container">
      <div className="my-bets-header">
        <h1 className="my-bets-title">My Bets</h1>
        <div className="my-bets-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
      </div>

      <div className="my-bets-tabs">
        <button 
          className={`tab-button ${activeTab === 'Casino' ? 'active' : ''}`}
          onClick={() => setActiveTab('Casino')}
        >
          Casino
        </button>
        <button 
          className={`tab-button ${activeTab === 'Sports' ? 'active' : ''}`}
          onClick={() => setActiveTab('Sports')}
        >
          Sports
        </button>
      </div>

      <div className="my-bets-content">
        {currentBets.length > 0 ? (
          <div className="bets-table-container">
            <table className="bets-table">
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Bet ID</th>
                  <th>Date</th>
                  <th>Bet Amount</th>
                  <th>Multiplier</th>
                  <th>Payout</th>
                </tr>
              </thead>
              <tbody>
                {currentBets.map((bet) => (
                  <tr key={bet.id} className="bet-row">
                    <td className="game-cell">
                      <div className="game-info">
                        <div className="game-icon">
                          <span>{bet.game.charAt(0)}</span>
                        </div>
                        <span className="game-name">{bet.game}</span>
                      </div>
                    </td>
                    <td className="bet-id-cell">
                      <span className="bet-id">{bet.betId}</span>
                    </td>
                    <td className="date-cell">
                      <span className="bet-date">{formatDate(bet.date)}</span>
                    </td>
                    <td className="amount-cell">
                      <span className="bet-amount">
                        {formatCurrency(bet.betAmount)}
                        <span className="currency-icon">🪙</span>
                      </span>
                    </td>
                    <td className="multiplier-cell">
                      <span className="multiplier">{formatMultiplier(bet.multiplier)}</span>
                    </td>
                    <td className="payout-cell">
                      <span className={`payout ${bet.payout > bet.betAmount ? 'profit' : 'loss'}`}>
                        {formatCurrency(bet.payout)}
                        <span className="currency-icon">🪙</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <p className="empty-title">No bets found</p>
            <p className="empty-subtitle">Start playing games to see your bet history here</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="my-bets-pagination">
          <div className="pagination-info">
            <span>1 result | Page {currentPage}</span>
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBets;
