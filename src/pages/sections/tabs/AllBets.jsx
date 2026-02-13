import React, { useState, useEffect } from 'react'
import { FiChevronUp, FiChevronDown, FiUser } from 'react-icons/fi'
import socketService from '../../../services/socketService';

export default function AllBets() {
  const gameImages = {
    'Crash': '/assets/InhouseGames/crash-game.png',
    'Dice': '/assets/InhouseGames/diceGame.png',
    'Hilo': '/assets/InhouseGames/hiloGAMES.png',
    'Keno': '/assets/InhouseGames/keno.png',
    'Limbo': '/assets/InhouseGames/limboGame.png',
    'Mines': '/assets/InhouseGames/mine.png',
    'Plinko': '/assets/InhouseGames/plinko.png'
  }

  const initialBetsData = []

  const [betsData, setBetsData] = useState(initialBetsData)
  const [nextId, setNextId] = useState(11)
  const [isNewBetAdding, setIsNewBetAdding] = useState(false)

  // Placeholder for real-time data logic


  useEffect(() => {
    const handleNewBet = (bet) => {
      console.log('AllBets received bet:', bet);
      // Safely capitalize first letter
      const gameName = bet.game
        ? bet.game.charAt(0).toUpperCase() + bet.game.slice(1).toLowerCase()
        : 'Unknown';

      const newBet = {
        id: Date.now(),
        game: gameName,
        user: bet.hidden ? 'Hidden' : (bet.name || 'Unknown User'),
        avatar: bet.avatar || '',
        betAmount: parseFloat(bet.betAmount),
        multiplier: parseFloat(bet.multiplier).toFixed(2) + 'x',
        payout: parseFloat(bet.payout)
      };

      setIsNewBetAdding(true);
      setBetsData(prevBets => {
        const updatedBets = [newBet, ...prevBets];
        return updatedBets.slice(0, 10); // Keep last 10
      });

      setNextId(prev => prev + 1);

      setTimeout(() => {
        setIsNewBetAdding(false);
      }, 500);
    };

    const setupSocket = async () => {
      try {
        if (!socketService.socket) {
          await socketService.connect();
        }

        if (socketService.socket) {
          socketService.socket.off('global-new-bet', handleNewBet); // Prevent duplicates
          socketService.socket.on('global-new-bet', handleNewBet);
        }
      } catch (error) {
        console.error("Socket connection failed in AllBets:", error);
      }
    };

    // Fetch initial data
    const fetchInitialBets = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/global/all-bets`);
        if (response.ok) {
          const data = await response.json();
          setBetsData(data);
        }
      } catch (error) {
        console.error("Failed to fetch initial bets:", error);
      }
    };

    fetchInitialBets();
    setupSocket();

    return () => {
      if (socketService.socket) {
        socketService.socket.off('global-new-bet', handleNewBet);
      }
    };
  }, []);

  return (
    <div className="p-0 sm:p-0">
      <div
        className="rounded-xl border overflow-hidden shadow-lg"
        style={{
          backgroundColor: 'var(--grey-700)',
          borderColor: 'var(--grey-600)'
        }}
      >
        <div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 p-4 border-b font-semibold text-sm"
          style={{
            backgroundColor: 'var(--grey-600)',
            borderBottomColor: 'var(--grey-500)',
            color: 'var(--grey-200)'
          }}
        >
          <div className="col-span-1">Game</div>
          <div className="hidden sm:block col-span-1">User</div>
          <div className="hidden md:block text-center">Bet Amount</div>
          <div className="hidden lg:block text-center">Multiplier</div>
          <div className="col-span-1 text-right pr-1">Payout</div>
        </div>

        <div className="overflow-hidden">
          {betsData.map((bet, index) => {
            const isCardRow = (bet.id + 1) % 2 === 0
            const gameImage = gameImages[bet.game] || gameImages['Crash']; // Fallback

            return (
              <div
                key={index}
                className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 p-3 items-center transition-all duration-300 ease-in-out ${isCardRow ? 'rounded-lg mx-2 my-2 border' : 'my-2 mx-2'
                  } ${index === 0 && isNewBetAdding ? 'animate-slide-down' : ''}`}
                style={{
                  backgroundColor: isCardRow ? 'var(--grey-600)' : 'transparent',
                  borderColor: isCardRow ? 'var(--grey-500)' : "",
                  transform: index === 0 && isNewBetAdding ? 'translateY(-100%)' : 'translateY(0)',
                  opacity: index === 0 && isNewBetAdding ? 0 : 1
                }}
                onMouseEnter={(e) => {
                  if (isCardRow) {
                    e.currentTarget.style.backgroundColor = 'var(--grey-500)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(20, 117, 225, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isCardRow ? 'var(--grey-600)' : 'transparent';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Game Column */}
                <div className="flex items-center gap-3 col-span-1 overflow-hidden">
                  <div className="w-8 h-8 flex-shrink-0 rounded-md overflow-hidden bg-[var(--grey-800)] p-1 border border-[var(--grey-500)]">
                    <img
                      src={gameImage}
                      alt={bet.game}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <a
                    href={`/games/${bet.game.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-bold truncate transition-colors duration-200 hover:text-[var(--blue-400)]"
                    style={{ color: 'var(--grey-200)' }}
                  >
                    {bet.game}
                  </a>
                </div>

                {/* User Column */}
                <div className="hidden sm:flex items-center gap-2 col-span-1 overflow-hidden">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-[var(--grey-500)] flex items-center justify-center flex-shrink-0">
                    {bet.avatar ? (
                      <img src={bet.avatar} alt={bet.user} className="w-full h-full object-cover" />
                    ) : (
                      <FiUser className="text-[var(--grey-300)] w-4 h-4" />
                    )}
                  </div>
                  {bet.user !== 'Hidden' ? (
                    <a
                      href={`/users/${bet.user.toLowerCase()}`}
                      className="text-sm truncate transition-colors duration-200 hover:text-[var(--blue-400)]"
                      style={{ color: 'var(--grey-300)' }}
                    >
                      {bet.user}
                    </a>
                  ) : (
                    <span className="text-sm truncate text-[var(--grey-400)]">
                      {bet.user}
                    </span>
                  )}
                </div>

                {/* Bet Amount Column */}
                <div className="hidden md:flex items-center justify-center">
                  <span className="text-sm font-bold text-[var(--grey-300)]">
                    ${bet.betAmount.toFixed(2)}
                  </span>
                </div>

                {/* Multiplier Column */}
                <div className="hidden lg:flex items-center justify-center text-center">
                  <span className={`text-sm font-extrabold px-2 py-0.5 rounded ${parseFloat(bet.payout) > 0 ? 'bg-[rgba(0,255,100,0.1)] text-[var(--green-500)]' : 'text-[var(--grey-400)]'
                    }`}>
                    {bet.multiplier}
                  </span>
                </div>

                {/* Payout Column */}
                <div className="flex items-center justify-end gap-2 col-span-1">
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: parseFloat(bet.payout) > 0 ? 'var(--green-500)' : 'var(--grey-400)'
                    }}
                  >
                    ${bet.payout.toFixed(2)}
                  </span>
                  <div
                    className={`transition-colors duration-200 rounded p-1 flex items-center justify-center border`}
                    style={{
                      backgroundColor: parseFloat(bet.payout) > 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                      borderColor: parseFloat(bet.payout) > 0 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(107, 114, 128, 0.3)',
                      color: parseFloat(bet.payout) > 0 ? 'var(--green-500)' : 'var(--grey-400)'
                    }}
                  >
                    {parseFloat(bet.payout) > 0 ?
                      <FiChevronUp className="w-4 h-4" /> :
                      <FiChevronDown className="w-4 h-4" />
                    }
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
