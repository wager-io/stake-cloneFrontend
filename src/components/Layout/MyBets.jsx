import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { AuthContext } from '../../context/AuthContext';
import './MyBets.css';

const MyBets = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  const fetchBets = useCallback(async (page = 1, gameType = null) => {
    try {
      setLoading(true);
      
      // Build params
      const params = {
        page,
        limit: pagination.limit
      };
      
      // Only add gameType filter if not 'All'
      if (gameType && gameType !== 'All') {
        params.gameType = gameType;
      }
      
      const response = await api.get('/api/bets', { params });
      
      console.log('Bets response:', response.data);
      setBets(response.data.bets || []);
      setPagination(prev => ({
        ...prev,
        ...response.data.pagination,
        page,
        limit: prev.limit
      }));
    } catch (error) {
      console.error('Error fetching bets:', error);
      toast.error('Failed to load bets');
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    if (user) {
      fetchBets(1, activeTab);
    }
  }, [user, activeTab, fetchBets]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      fetchBets(newPage, activeTab);
    }
  };

  const handlePreviousPage = () => {
    handlePageChange(pagination.page - 1);
  };

  const handleNextPage = () => {
    handlePageChange(pagination.page + 1);
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return '0.0000';
    return parseFloat(amount).toFixed(4);
  };

  const formatMultiplier = (multiplier) => {
    if (!multiplier && multiplier !== 0) return '-';
    return `${parseFloat(multiplier).toFixed(2)}x`;
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getGameIcon = (gameType) => {
    const icons = {
      'Crash': '🚀',
      'Dice': '🎲',
      'Plinko': '🎱',
      'Mines': '💣',
      'Limbo': '🎯',
      'Hilo': '🃏',
      'Keno': '🎰'
    };
    return icons[gameType] || '🎮';
  };

  const handleBetClick = (bet) => {
    // Navigate to game detail or show bet details modal
    navigate(`/casino/game/${bet.gameType.toLowerCase()}`);
  };

  // Get unique game types for tabs
  const gameTypes = ['All', 'Crash', 'Dice', 'Plinko', 'Mines', 'Limbo', 'Hilo'];

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

      {/* Game Type Tabs */}
      <div className="my-bets-tabs">
        {gameTypes.map((type) => (
          <button 
            key={type}
            className={`tab-button ${activeTab === type ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(type);
              setCurrentPage(1);
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="my-bets-content">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-3 text-sm text-gray-300">Loading bets...</p>
          </div>
        ) : bets.length > 0 ? (
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
                  <th>Profit</th>
                </tr>
              </thead>
              <tbody>
                {bets.map((bet, index) => (
                  <tr key={bet.betId || index} className="bet-row" onClick={() => handleBetClick(bet)}>
                    <td className="game-cell">
                      <div className="game-info">
                        <div className="game-icon">
                          <span>{getGameIcon(bet.gameType)}</span>
                        </div>
                        <span className="game-name">{bet.gameType}</span>
                      </div>
                    </td>
                    <td className="bet-id-cell">
                      <span className="bet-id">
                        {bet.betId ? String(bet.betId).slice(0, 8) : '-'}
                      </span>
                    </td>
                    <td className="date-cell">
                      <span className="bet-date">{formatDate(bet.betTime || bet.createdAt)}</span>
                    </td>
                    <td className="amount-cell">
                      <span className="bet-amount">
                        {formatCurrency(bet.betAmount)}
                        <span className="currency-icon">{bet.currency || 'USDT'}</span>
                      </span>
                    </td>
                    <td className="multiplier-cell">
                      <span className="multiplier">{formatMultiplier(bet.multiplier)}</span>
                    </td>
                    <td className="payout-cell">
                      <span className={`payout ${bet.won ? 'profit' : 'loss'}`}>
                        {formatCurrency(bet.payout)}
                        <span className="currency-icon">{bet.currency || 'USDT'}</span>
                      </span>
                    </td>
                    <td className="profit-cell">
                      <span className={`profit ${bet.profit >= 0 ? 'profit' : 'loss'}`}>
                        {bet.profit >= 0 ? '+' : ''}{formatCurrency(bet.profit)}
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
