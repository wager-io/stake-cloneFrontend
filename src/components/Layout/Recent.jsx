import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recent.css';

const Recent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recentGames, setRecentGames] = useState([]);
  const gamesPerPage = 12;

  // TODO: Replace with real data from backend API
  // API endpoint should be: GET /api/user/recent-games
  // Response should include: { games: [{ id, title, image, path, lastPlayed }] }
  // This should only contain games that the user has actually played
  const sampleRecentGames = [
    // Empty array since no games have been played yet
    // When user plays games, they will be added here by the backend
  ];

  useEffect(() => {
    // TODO: Replace with API call to backend
    // For now, clear any old localStorage data and start fresh
    localStorage.removeItem('userRecentGames'); // Clear old sample data
    setRecentGames(sampleRecentGames); // Empty array
    
    // When backend is ready, replace above with:
    // fetchRecentGames().then(games => setRecentGames(games));
  }, []);

  const filteredGames = recentGames.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  const handleGameClick = (gamePath) => {
    navigate(gamePath);
  };

  const handleRemoveRecent = (gameId) => {
    const updatedRecentGames = recentGames.filter(game => game.id !== gameId);
    setRecentGames(updatedRecentGames);
    localStorage.setItem('userRecentGames', JSON.stringify(updatedRecentGames));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="recent-container">
      <div className="recent-header">
        <h1 className="recent-title">Recent</h1>
        <div className="recent-clock">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>

      <div className="recent-search">
        <div className="search-input-container">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search your game"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="recent-content">
        {currentGames.length > 0 ? (
          <div className="recent-grid">
            {currentGames.map((game) => (
              <div key={game.id} className="game-card" onClick={() => handleGameClick(game.path)}>
                <div className="game-card-content">
                  <div className="game-image-section">
                    <img src={game.image} alt={game.title} className="game-image" />
                  </div>
                  <button 
                    className="remove-recent-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveRecent(game.id);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No recent games found</p>
            <p>Play some games to see them here</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="recent-pagination">
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
      )}
    </div>
  );
};

export default Recent; 