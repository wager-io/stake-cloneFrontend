import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { format } from 'date-fns';
import { toast } from 'sonner';
import './MyBets.css';

const MyBets = () => {
  const navigate = useNavigate();
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Casino');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const betsPerPage = 10;

  const fetchBets = async (page = 1) => {
    try {
      setLoading(true);
      const response = await api.get('/api/transactions/bills', {
        params: {
          page,
          limit: pagination.limit
        }
      });
      
      console.log(response.data);
      setBets(response.data.bills || []);
      setPagination(response.data.pagination || {
        page,
        limit: 10,
        total: 0,
        totalPages: 0
      });
    } catch (error) {
      console.error('Error fetching bets:', error);
      toast.error('Failed to load bets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchBets();
  }, []);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchBets(newPage);
    }
  };

  const filteredBets = bets.filter(bet => 
    activeTab === 'Casino' ? bet.gameType === 'casino' : bet.gameType === 'sports'
  );

  const handlePreviousPage = () => {
    handlePageChange(pagination.page - 1);
  };

  const handleNextPage = () => {
    handlePageChange(pagination.page + 1);
  };

  const formatCurrency = (amount) => {
    return amount.toFixed(8);
  };

  const formatMultiplier = (multiplier) => {
    return `${multiplier.toFixed(2)}x`;
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
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
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-sm text-gray-300">Loading bets...</p>
          </div>
        ) : filteredBets.length > 0 ? (
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
                {filteredBets.map((bet, index) => (
                  <tr key={bet.transaction_id || index} className="bet-row">
                    <td className="game-cell">
                      <div className="game-info">
                        <div className="game-icon">
                          <span>{bet.transaction_type.charAt(0)}</span>
                        </div>
                        <span className="game-name">{bet.transaction_type}</span>
                      </div>
                    </td>
                    <td className="bet-id-cell">
                      <span className="bet-id">{bet.transaction_id}</span>
                    </td>
                    <td className="date-cell">
                      <span className="bet-date">{formatDate(bet.timestamp)}</span>
                    </td>
                    <td className="amount-cell">
                      <span className="bet-amount">
                        {parseFloat(bet.amount).toFixed(4)}
                        <span className="currency-icon">{bet.currency}</span>
                      </span>
                    </td>
                    <td className="multiplier-cell">
                      <span className="multiplier">-</span>
                    </td>
                    <td className="payout-cell">
                      <span className={`payout ${parseFloat(bet.amount) > 0 ? 'profit' : 'loss'}`}>
                        {parseFloat(bet.balance).toFixed(4)}
                        <span className="currency-icon">{bet.currency}</span>
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

      {pagination.totalPages > 1 && (
        <div className="my-bets-pagination">
          <div className="pagination-info">
            <span>Showing {bets.length} of {pagination.total} bets | Page {pagination.page} of {pagination.totalPages}</span>
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn"
              onClick={handlePreviousPage}
              disabled={pagination.page === 1}
            >
              Previous
            </button>
            <button 
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={pagination.page === pagination.totalPages}
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
