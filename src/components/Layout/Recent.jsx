import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiHeart, FiUser, FiClock, FiRefreshCw } from 'react-icons/fi';
import 'swiper/css';
import api from '../../utils/api';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import GameCard from '../../pages/sections/GameCard';
import UsersBetLayout from '../../pages/sections/BetsLogSection';

// Game image mapping
const gameImages = {
  'Crash': '/assets/InhouseGames/crash-game.png',
  'Plinko': '/assets/InhouseGames/plinko.png',
  'Mines': '/assets/InhouseGames/mine.png',
  'Dice': '/assets/InhouseGames/diceGame.png',
  'Limbo': '/assets/InhouseGames/limboGame.png',
  'Hilo': '/assets/InhouseGames/hiloGAMES.png',
  'Keno': '/assets/InhouseGames/keno.png'
};

const gamePaths = {
  'Crash': 'crash',
  'Plinko': 'plinko',
  'Mines': 'mines',
  'Dice': 'dice',
  'Limbo': 'limbo',
  'Hilo': 'hilo',
  'Keno': 'keno'
};

export default function Recents() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const { user } = useContext(AuthContext);
  
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (user) {
        // Fetch user's personal recent games
        response = await api.get('/api/recent-games', {
          params: { limit: 20 }
        });
      } else {
        // Fetch global recent games for unauthenticated users
        // Use the same endpoint which handles both cases
        response = await api.get('/api/recent-games/global', {
          params: { limit: 20 }
        });
      }
      
      if (response.data.success) {
        // Deduplicate by gameType on client side
        const rawGames = response.data.games || [];
        const deduped = [];
        const seen = new Set();
        for (const game of rawGames) {
          const key = (game.gameType || '').toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            deduped.push(game);
          }
        }
        setRecentGames(deduped);
      }
    } catch (error) {
      console.error('Error fetching recent games:', error);
      
      // Handle 401 Unauthorized errors
      if (error.response?.status === 401) {
        // Token expired or invalid, redirect to login
        navigate('/login');
        return;
      }
      
      setError('Failed to load recent games');
      toast.error('Failed to load recent games');
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchRecentGames();
  }, [fetchRecentGames]);

  const handlePrev = () => {
    if (swiperRef.current) {
      const visibleSlides = swiperRef.current.params.slidesPerView;
      swiperRef.current.slideTo(swiperRef.current.activeIndex - visibleSlides);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      const visibleSlides = swiperRef.current.params.slidesPerView;
      swiperRef.current.slideTo(swiperRef.current.activeIndex + visibleSlides);
    }
  };

  const handleGameClick = (gameType) => {
    const path = gamePaths[gameType] || gameType.toLowerCase();
    navigate(`/casino/game/${path}`);
  };

  const handleRefresh = () => {
    fetchRecentGames();
  };

  // Favourites content component
  const FavouritesContent = () => (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
              style={{ backgroundColor: 'var(--blue-600)' }}
            >
              <FiClock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: 'var(--grey-200)' }}
              >
                My Recent
              </h1>
              
              <p 
                className="text-sm mt-1"
                style={{ color: 'var(--grey-300)' }}
              >
                {user ? `${recentGames.length} Recent games` : ""}
              </p>
            </div>
          </div>
          
          {recentGames.length > 0 && (
            <div className="flex gap-2">
              <button 
                onClick={handleRefresh}
                className="flex items-center justify-center cursor-pointer rounded-[30px] p-2 text-[var(--grey-300)] hover:text-[var(--blue-400)] transition-colors border border-[var(--grey-500)]"
                title="Refresh"
              >
                <FiRefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <div className="flex border rounded-[30px] px-2 border-[var(--grey-500)] overflow-hidden">
                <button 
                  onClick={handlePrev}
                  className="flex items-center justify-center cursor-pointer rounded-[30px] p-2 text-[var(--grey-300)] hover:text-[var(--blue-400)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-px bg-[var(--grey-500)]"></div>
                <button 
                  onClick={handleNext}
                  className="flex items-center justify-center rounded-[30px] cursor-pointer p-2 text-[var(--grey-300)] hover:text-[var(--blue-400)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Games Content */}
        {!user ? (
          // Show login prompt for unauthenticated users
          <div className="text-center py-12">
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--grey-200)' }}
            >
              Log in to access your Recent Games
            </h3>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'var(--blue-600)' }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--blue-500)';
                e.target.style.boxShadow = '0 4px 16px rgba(20, 117, 225, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--blue-600)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <FiUser className="inline w-4 h-4 mr-2" />
              Log In
            </button>
          </div>
        ) : loading ? (
          // Loading state
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading recent games...</p>
          </div>
        ) : error ? (
          // Error state
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={handleRefresh}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'var(--blue-600)' }}
            >
              <FiRefreshCw className="inline w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        ) : recentGames.length > 0 ? (
          // Show recent games carousel
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
              {recentGames.map((game, index) => (
                <SwiperSlide key={`${game.gameType}-${game.gameId || index}`} className="!w-auto">
                  <div 
                    className="h-full flex flex-col items-center justify-center transform transition-transform duration-400 hover:-translate-y-2 cursor-pointer"
                    onClick={() => handleGameClick(game.gameType)}
                  >
                    <div>
                      <div 
                        className='rounded-[12px]'
                        style={{ 
                          backgroundColor: 'var(--grey-600)',
                          border: '1px solid var(--grey-500)',
                        }} 
                      >
                        <img 
                          src={gameImages[game.gameType] || '/assets/InhouseGames/crash-game.png'} 
                          alt={game.gameName} 
                          className="w-[150px] h-[200px] object-cover rounded-[12px]"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <FiClock className="w-16 h-16 mx-auto text-gray-500 mb-4" />
            <h3 
              className="text-lg font-bold mb-2"
              style={{ color: 'var(--grey-200)' }}
            >
              No Recent Games
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: 'var(--grey-300)' }}
            >
              Start playing games to see them here
            </p>
            <button 
              onClick={() => navigate('/casino/home')}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'var(--blue-600)' }}
            >
              Explore Games
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-[calc(100vh-4rem)] py-8 px-5"
      style={{ backgroundColor: 'var(--grey-800)' }}
    >
      <GameCard />
      <FavouritesContent /> 
      <UsersBetLayout />
    </div>
  );
}
