import React, { useState, useEffect } from 'react'
import socketService from '../../services/socketService';

export default function RecentWins() {
  const gameImages = {
    'Crash': '/assets/InhouseGames/crash-game.png',
    'Dice': '/assets/InhouseGames/diceGame.png',
    'Hilo': '/assets/InhouseGames/hiloGAMES.png',
    'Keno': '/assets/InhouseGames/keno.png',
    'Limbo': '/assets/InhouseGames/limboGame.png',
    'Mines': '/assets/InhouseGames/mine.png',
    'Plinko': '/assets/InhouseGames/plinko.png'
  }

  const initialWins = [
    { id: 1, username: 'CryptoKing', game: 'Crash', amount: '288.5 USDT', isNew: false, multiplier: '2.50x' },
    { id: 2, username: 'LuckyPlayer', game: 'Dice', amount: '10.8 USDT', isNew: false, multiplier: '1.50x' },
    { id: 3, username: 'DiamondHands', game: 'Plinko', amount: '950 USDT', isNew: false, multiplier: '10.00x' },
    { id: 4, username: 'MoonWalker', game: 'Limbo', amount: '3.2 USDT', isNew: false, multiplier: '1.10x' },
    { id: 5, username: 'WagerMaster', game: 'Hilo', amount: '100.1 USDT', isNew: false, multiplier: '2.00x' }
  ]

  const [wins, setWins] = useState(initialWins)
  const [nextId, setNextId] = useState(6)

  const gameNames = ['Crash', 'Dice', 'Hilo', 'Keno', 'Limbo', 'Mines', 'Plinko']
  const usernames = ['BetMaster', 'CoinHunter', 'WinStreak', 'LuckyGamer', 'RiskTaker', 'BigBaller', 'CryptoWin', 'GameChanger', 'WagerKing', 'BetBeast']
  const amounts = ['1.2 USDT', '40.8 usdt', '650 USDT', '27.1 USDT', '1.5 USDT', '890 USDT', '32.4 USDT', '10.9 USDT', '1250 USDT', '2.8 USDT']

  const addNewWin = () => {
    const randomGame = gameNames[Math.floor(Math.random() * gameNames.length)]
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)]
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)]

    const newWin = {
      id: nextId,
      username: randomUsername,
      game: randomGame,
      amount: randomAmount,
      isNew: true
    }

    setWins(prevWins => {
      const updatedWins = [newWin, ...prevWins]
      if (updatedWins.length > 10) {
        updatedWins.pop()
      }
      return updatedWins
    })

    setNextId(prev => prev + 1)

    setTimeout(() => {
      setWins(prevWins =>
        prevWins.map(win =>
          win.id === newWin.id ? { ...win, isNew: false } : win
        )
      )
    }, 500)
  }



  useEffect(() => {
    const handleNewBet = (bet) => {
      console.log('RecentWins received bet:', bet);
      // Only show wins (Payout > 0)
      if (parseFloat(bet.payout) <= 0) return;

      const newWin = {
        id: Date.now(), // Unique ID
        username: bet.hidden ? 'Hidden' : bet.name,
        avatar: bet.avatar || '',
        game: bet.game.charAt(0).toUpperCase() + bet.game.slice(1), // Capitalize
        amount: `${parseFloat(bet.payout).toFixed(2)} ${bet.currency || 'USD'}`,
        multiplier: parseFloat(bet.multiplier).toFixed(2) + 'x',
        isNew: true
      };

      setWins(prevWins => {
        const updatedWins = [newWin, ...prevWins];
        if (updatedWins.length > 10) {
          updatedWins.pop();
        }
        return updatedWins;
      });

      // Remove isNew flag for animation
      setTimeout(() => {
        setWins(prevWins =>
          prevWins.map(win =>
            win.id === newWin.id ? { ...win, isNew: false } : win
          )
        );
      }, 500);
    };

    if (socketService.socket) {
      socketService.socket.on('global-new-bet', handleNewBet);
    }

    return () => {
      if (socketService.socket) {
        socketService.socket.off('global-new-bet', handleNewBet);
      }
    };
  }, []);

  return (
    <div className="py-2 px-2 md:px-3 lg:px-3">
      <div
        className="text-sm md:text-sm font-bold mb-2 flex items-center gap-2"
        style={{ color: 'var(--text-light)' }}
      >
        <span>High Rollers</span>
        <span className="text-xs bg-[var(--green-500)] text-black px-1.5 py-0.5 rounded font-bold">LIVE</span>
      </div>
      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' }
          }}
        >
          {wins.map((win) => (
            <div
              key={win.id}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl transition-all duration-500 hover:scale-105 ${win.isNew ? 'animate-slide-in' : ''
                }`}
              style={{
                backgroundColor: 'var(--grey-700)',
                border: '1px solid var(--border-color)',
                minWidth: '140px',
                transform: win.isNew ? 'translateX(-100px)' : 'translateX(0)',
                opacity: win.isNew ? 0 : 1,
                animation: win.isNew ? 'slideIn 0.5s ease-out forwards' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px var(--shadow-purple)'
                e.currentTarget.style.borderColor = 'var(--accent-purple)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                <img
                  src={gameImages[win.game] || gameImages['Crash']}
                  alt={win.game}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
                {/* Multiplier Badge */}
                <div className="absolute -top-2 -right-2 bg-[var(--grey-800)] border border-[var(--active-Item)] text-[var(--text-light)] text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                  {win.multiplier || '0.00x'}
                </div>
              </div>

              <div className="text-center w-full">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  {win.avatar && (
                    <img src={win.avatar} alt="User" className="w-4 h-4 rounded-full border border-[var(--accent-purple)]" />
                  )}
                  <div
                    className="text-xs font-semibold truncate max-w-[80px]"
                    style={{ color: 'var( --text-light)' }}
                  >
                    {win.username}
                  </div>
                </div>

                <div
                  className="text-sm font-bold bg-[rgba(34,197,94,0.1)] text-[var(--green-500)] px-2 py-1 rounded-md"
                >
                  {win.amount}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes slideIn {
            from {
              transform: translateX(-100px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}
