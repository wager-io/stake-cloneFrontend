import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favourites.css';

const Favourites = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const gamesPerPage = 12;

  // TODO: Replace with real data from backend API
  // API endpoint should be: GET /api/user/favourites
  // Response should include: { games: [{ id, title, image, path }] }
  // Favourites are games that the user has manually marked as favorite
  const sampleFavourites = [
    // Empty array since no games have been marked as favorite yet
    // Users can add games to favorites from the main games list
  ];

  useEffect(() => {
    // TODO: Replace with API call to backend
    // For now, clear any old localStorage data and start fresh
    localStorage.removeItem('userFavourites'); // Clear old sample data
    setFavourites(sampleFavourites); // Empty array
    
    // When backend is ready, replace above with:
    // fetchUserFavourites().then(games => setFavourites(games));
  }, []);

  const filteredGames = favourites.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = filteredGames.slice(startIndex, endIndex);

  const handleGameClick = (gamePath) => {
    navigate(gamePath);
  };

  const handleRemoveFavourite = (gameId) => {
    const updatedFavourites = favourites.filter(game => game.id !== gameId);
    setFavourites(updatedFavourites);
    localStorage.setItem('userFavourites', JSON.stringify(updatedFavourites));
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="favourites-container">
      <div className="favourites-header">
        <h1 className="favourites-title">Favourites</h1>
        <div className="favourites-crown">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
      </div>

      <div className="favourites-search">
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

      <div className="favourites-content">
        {currentGames.length > 0 ? (
          <div className="favourites-grid">
            {currentGames.map((game) => (
              <div key={game.id} className="game-card" onClick={() => handleGameClick(game.path)}>
                <div className="game-card-content">
                  <div className="game-image-section">
                    <img src={game.image} alt={game.title} className="game-image" />
                  </div>
                  <button 
                    className="remove-favourite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavourite(game.id);
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
            <p>No favourite games found</p>
            <p>Add games to your favourites to see them here</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="favourites-pagination">
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

export default Favourites; 