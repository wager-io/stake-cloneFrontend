import React, { useState, useEffect } from 'react'

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
    { id: 1, username: 'CryptoKing', game: 'Crash', amount: '2.5 ETH', isNew: false },
    { id: 2, username: 'LuckyPlayer', game: 'Dice', amount: '1.8 BTC', isNew: false },
    { id: 3, username: 'DiamondHands', game: 'Plinko', amount: '950 USDT', isNew: false },
    { id: 4, username: 'MoonWalker', game: 'Limbo', amount: '3.2 ETH', isNew: false },
    { id: 5, username: 'WagerMaster', game: 'Hilo', amount: '1.1 BTC', isNew: false }
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
    const interval = setInterval(() => {
      addNewWin()
    }, 4000)

    return () => clearInterval(interval)
  }, [nextId])

  return (
    <div className="py-2 px-2 md:px-3 lg:px-3">
      <div 
        className="text-sm md:text-sm font-bold mb-2"
        style={{ color: 'var(--text-light)' }}
      >
        Recent Wins
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
              className={`flex-shrink-0 flex flex-col items-center p-2 rounded-xl transition-all duration-500 hover:scale-105 ${
                win.isNew ? 'animate-slide-in' : ''
              }`}
              style={{ 
                backgroundColor: 'var(--grey-700)',
                border: '1px solid var(--border-color)',
                transform: win.isNew ? 'translateX(-100px)' : 'translateX(0)',
                opacity: win.isNew ? 0 : 1,
                animation: win.isNew ? 'slideIn 0.5s ease-out forwards' : 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 8px 24px var(--shadow-purple)'
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = 'none'
              }}
            >
              <div className="w-16 h-16 md:w-26 md:h-26 rounded-lg overflow-hidden mb-1">
                <img 
                  src={gameImages[win.game]}
                  alt={win.game}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center">
                <div 
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var( --accent-purple)' }}
                >
                  {win.username}
                </div>
                <div 
                  className="text-sm font-bold"
                  style={{ color: 'var(--text-light)' }}
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
