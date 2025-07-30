import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Favourites.css';

const Favourites = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  const swiperRef = useRef(null);
  const gamesPerPage = 12;

  // TODO: Replace with real data from backend API
  // API endpoint should be: GET /api/user/favourites
  // Response should include: { games: [{ id, title, image, path }] }
  const sampleFavourites = [
    {
      id: 1,
      title: "Plinko",
      image: "/assets/InhouseGames/plinko.png",
      path: "/casino/plinko"
    },
    {
      id: 2,
      title: "Limbo",
      image: "/assets/InhouseGames/limboGame.png",
      path: "/casino/limbo"
    },
    {
      id: 3,
      title: "Hilo",
      image: "/assets/InhouseGames/hiloGAMES.png",
      path: "/casino/Hilo"
    },
    {
      id: 4,
      title: "Crash",
      image: "/assets/InhouseGames/crash-game.png",
      path: "/casino/crash"
    }
  ];

  useEffect(() => {
    // TODO: Replace with API call to backend
    // For now, clear any old localStorage data and start fresh
    localStorage.removeItem('userFavourites'); // Clear old sample data
    setFavourites(sampleFavourites); // Set sample data
    
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
          <img src="/group-banner-default.png" alt="Favourite Games" className="favourites-icon" />
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