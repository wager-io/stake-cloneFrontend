import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Recent.css';

const Recent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recentGames, setRecentGames] = useState([]);
  const swiperRef = useRef(null);
  const gamesPerPage = 12;

  // TODO: Replace with real data from backend API
  // API endpoint should be: GET /api/user/recent-games
  // Response should include: { games: [{ id, title, image, path, lastPlayed }] }
  const sampleRecentGames = [
    {
      id: 1,
      title: "Crash",
      image: "/assets/InhouseGames/crash-game.png",
      path: "/casino/game/crash",
      lastPlayed: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: 2,
      title: "Mines",
      image: "/assets/InhouseGames/mine.png",
      path: "/casino/game/mines",
      lastPlayed: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    {
      id: 3,
      title: "Dice",
      image: "/assets/InhouseGames/diceGame.png",
      path: "/casino/game/dice",
      lastPlayed: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    }
  ];

  useEffect(() => {
    // TODO: Replace with API call to backend
    // For now, clear any old localStorage data and start fresh
    localStorage.removeItem('userRecentGames'); // Clear old sample data
    setRecentGames(sampleRecentGames); // Set sample data
    
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
          <img src="/group-banner-default.png" alt="Recent Games" className="recent-icon" />
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
          <div className="w-full h-[240px] mb-6">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={16}
              slidesPerView={5}
              slidesPerGroup={5}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 14,
                },
                1024: {
                  slidesPerView: 5,
                  slidesPerGroup: 5,
                  spaceBetween: 16,
                },
              }}
              className="h-full"
            >
              {currentGames.map((game) => (
                <SwiperSlide key={game.id} className="!w-auto">
                  <div 
                    className="h-full flex flex-col items-center justify-center transform transition-transform duration-400 hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleGameClick(game.path)}
                  >
                    <div>
                      <img 
                        src={game.image} 
                        alt={game.title} 
                        className="w-[150px] h-[200px] object-cover rounded-[12px]"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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