import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FiHeart, FiUser, FiLock, FiPlay, FiStar, FiUsers } from 'react-icons/fi';
import 'swiper/css';
import GameCard from '../../pages/sections/GameCard';
import UsersBetLayout from '../../pages/sections/BetsLogSection';

export default function Recents() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  
  // Simulate user login state - change to true to test logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock favourite games data
  const recentseGames = [
    {
      id: 1,
      title: "Crash",
      provider: "NetEnt",
      image: "/assets/InhouseGames/crash-game.png",
      players: 1243,
      path: "crash",
      isFavourite: true
    },
    {
      id: 2,
      title: "Plinko",
      provider: "NetEnt",
      image: "/assets/InhouseGames/plinko.png",
      players: 876,
      path: "plinko",
      isFavourite: true
    },
    {
      id: 3,
      title: "Mines",
      provider: "Play'n GO",
      image: "/assets/InhouseGames/mine.png",
      players: 987,
      path: "mines",
      isFavourite: true
    },
    {
      id: 4,
      title: "Dice",
      provider: "NetEnt",
      image: "/assets/InhouseGames/diceGame.png",
      players: 1567,
      path: "dice",
      isFavourite: true
    }
  ];

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

  const handleGameClick = (gamePath) => {
    navigate(`/casino/game/${gamePath}`);
  };

  const handleLoginClick = () => {
    // Simulate login - in real app, this would open a login modal or navigate to login page
    setIsLoggedIn(true);
  };

  const removeFavourite = (gameId) => {
    // In real app, this would call API to remove from favourites
    console.log(`Removing game ${gameId} from favourites`);
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
              <FiHeart className="w-6 h-6 text-white" />
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
                {isLoggedIn ? recentseGames.length : ""} Recent games
              </p>
            </div>
          </div>
          
          {recentseGames.length > 0 && (
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
          )}
        </div>



          {isLoggedIn ? (
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
                        {recentseGames.map(game => (
                          <SwiperSlide key={game.id} className="!w-auto">
                            <div 
                              className="h-full flex flex-col items-center justify-center transform transition-transform duration-400 hover:-translate-y-2 cursor-pointer"
                              onClick={() => handleGameClick(game.path)}
                            >
                              <div>
                                <div className='rounded-[12px]'
                                    style={{ 
                                    backgroundColor: 'var(--grey-600)',
                                    border: '1px solid var(--grey-500)',
                                  }} >
                                  <img 
                                    src={game.image} 
                                    alt={game.title} 
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
                <div className="text-center py-12">

                <h3 
                    className="text-lg font-bold mb-4"
                    style={{ color: 'var(--grey-200)' }}
                >
                    Log in to access your Recent Games
                </h3>

                <button 
                    onClick={handleLoginClick}
                    className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--blue-600)' }}
                    onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'var(--blue-500)'
                    e.target.style.boxShadow = '0 4px 16px rgba(20, 117, 225, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'var(--blue-600)'
                    e.target.style.boxShadow = 'none'
                    }}
                >
                    <FiUser className="inline w-4 h-4 mr-2" />
                    Log In
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
