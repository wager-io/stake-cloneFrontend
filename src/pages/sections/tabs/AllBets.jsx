import React, { useState, useEffect } from 'react'
import { FiChevronUp, FiChevronDown, FiZap, FiEyeOff, FiHexagon, FiTarget } from 'react-icons/fi'

export default function AllBets() {
  const initialBetsData = [
    { 
      id: 1,
      game: 'Crash', 
      user: 'Player123', 
      betAmount: 10.50, 
      multiplier: '2.45x', 
      payout: 25.73
    },
    { 
      id: 2,
      game: 'Dice', 
      user: 'LuckyWin88', 
      betAmount: 5.00, 
      multiplier: '0.00x', 
      payout: 0.00
    },
    { 
      id: 3,
      game: 'Hilo', 
      user: 'HighRoller', 
      betAmount: 25.00, 
      multiplier: '3.20x', 
      payout: 80.00
    },
    { 
      id: 4,
      game: 'Keno', 
      user: 'CryptoKing', 
      betAmount: 15.75, 
      multiplier: '1.85x', 
      payout: 29.14
    },
    { 
      id: 5,
      game: 'Limbo', 
      user: 'Hidden', 
      betAmount: 8.25, 
      multiplier: '0.00x', 
      payout: 0.00
    },
    { 
      id: 6,
      game: 'Mines', 
      user: 'BetMaster', 
      betAmount: 12.00, 
      multiplier: '4.50x', 
      payout: 54.00
    },
    { 
      id: 7,
      game: 'Plinko', 
      user: 'CardShark', 
      betAmount: 20.00, 
      multiplier: '2.00x', 
      payout: 40.00
    },
    { 
      id: 8,
      game: 'Crash', 
      user: 'SlotFan99', 
      betAmount: 3.50, 
      multiplier: '0.00x', 
      payout: 0.00
    },
    { 
      id: 9,
      game: 'Dice', 
      user: 'RollDice', 
      betAmount: 7.25, 
      multiplier: '1.95x', 
      payout: 14.14
    },
    { 
      id: 10,
      game: 'Hilo', 
      user: 'SpinWinner', 
      betAmount: 18.50, 
      multiplier: '5.75x', 
      payout: 106.38
    }
  ]

  const [betsData, setBetsData] = useState(initialBetsData)
  const [nextId, setNextId] = useState(11)
  const [isNewBetAdding, setIsNewBetAdding] = useState(false)

  const gameOptions = ['Crash', 'Dice', 'Hilo', 'Keno', 'Limbo', 'Mines', 'Plinko']
  const userOptions = ['WinStreak', 'BetMaster', 'LuckyGamer', 'CryptoWin', 'GameChanger', 'RiskTaker', 'BigBaller', 'WagerKing', 'BetBeast', 'Hidden']
  
  const generateNewBet = () => {
    const randomGame = gameOptions[Math.floor(Math.random() * gameOptions.length)]
    const randomUser = userOptions[Math.floor(Math.random() * userOptions.length)]
    const randomBetAmount = parseFloat((Math.random() * 50 + 1).toFixed(2))
    const isWin = Math.random() > 0.4 
    const randomMultiplier = isWin ? (Math.random() * 5 + 1).toFixed(2) + 'x' : '0.00x'
    const payout = isWin ? parseFloat((randomBetAmount * parseFloat(randomMultiplier)).toFixed(2)) : 0.00

    return {
      id: nextId,
      game: randomGame,
      user: randomUser,
      betAmount: randomBetAmount,
      multiplier: randomMultiplier,
      payout: payout
    }
  }

  const addNewBet = () => {
    setIsNewBetAdding(true)
    const newBet = generateNewBet()
    setBetsData(prevBets => {
      const updatedBets = [newBet, ...prevBets]
      return updatedBets.slice(0, 10)
    })
    setNextId(prev => prev + 1)
    setTimeout(() => {
      setIsNewBetAdding(false)
    }, 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      addNewBet()
    }, 3000) 

    return () => clearInterval(interval)
  }, [nextId])

  const getGameIcon = (gameName) => {
    switch (gameName.toLowerCase()) {
      case 'crash':
        return FiZap
      case 'dice':
        return FiHexagon
      case 'hilo':
        return FiChevronUp
      case 'keno':
        return FiTarget
      case 'limbo':
        return FiZap
      case 'mines':
        return FiEyeOff
      case 'plinko':
        return FiTarget
      default:
        return FiZap
    }
  }

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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-b font-semibold text-sm"
          style={{
            backgroundColor: 'var(--grey-600)',
            borderBottomColor: 'var(--grey-500)',
            color: 'var(--grey-200)'
          }}
        >
          <div className="col-span-1">Game</div>
          <div className="hidden text-center sm:block">User</div>
          <div className="hidden text-center md:block">Bet Amount</div>
          <div className="hidden text-center lg:block">Multiplier</div>
          <div className="col-span-1 text-right sm:text-end pr-1">Payout</div>
        </div>

        <div className="overflow-hidden" >
          {betsData.map((bet, index) => {
            const GameIcon = getGameIcon(bet.game)
            const isCardRow = (bet.id + 1) % 2 === 0 
            return (
              <div
                key={index}
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 transition-all duration-300 ease-in-out ${
                  isCardRow ? 'rounded-lg mx-2 my-2 border' : 'my-2 mx-2'
                } ${index === 0 && isNewBetAdding ? 'animate-slide-down' : ''}`}
                style={{ 
                  backgroundColor: isCardRow ? 'var(--grey-600)' : 'transparent',
                  borderColor: isCardRow ? 'var(--grey-500)' : "",
                  transform: index === 0 && isNewBetAdding ? 'translateY(-100%)' : 'translateY(0)',
                  opacity: index === 0 && isNewBetAdding ? 0 : 1
                }}
                onMouseEnter={(e) => {
                  if (isCardRow) {
                    e.target.style.backgroundColor = 'var(--grey-500)'
                    e.target.style.boxShadow = '0 2px 8px rgba(20, 117, 225, 0.3)'
                  } 
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isCardRow ? 'var(--grey-600)' : 'transparent'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-center gap-2 col-span-1">
                  <div style={{ color: 'var(--blue-500)' }}>
                    <GameIcon className="w-4 h-4" />
                  </div>
                  <a
                    href={`/games/${bet.game.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-semibold truncate transition-colors duration-200 hover:underline"
                    style={{ color: 'var(--grey-200)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--blue-400)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--grey-200)'}
                  >
                    {bet.game}
                  </a>
                </div>
                <div className="hidden sm:flex items-center  justify-center">
                  {bet.user !== 'Hidden' ? (
                    <a
                      href={`/users/${bet.user.toLowerCase()}`}
                      className="text-sm truncate transition-colors duration-200 "
                      style={{ color: 'var(--grey-300)' }}
                      onMouseEnter={(e) => e.target.style.color = 'var(--blue-400)'}
                      onMouseLeave={(e) => e.target.style.color = 'var(--grey-300)'}
                    >
                      {bet.user}
                    </a>
                  ) : (
                    <span 
                      className="text-sm truncate"
                      style={{ color: 'var(--grey-400)' }}
                    >
                      {bet.user}
                    </span>
                  )}
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <span 
                    className="text-sm font-bold"
                    style={{ color: 'var(--grey-300)' }}
                  >
                    ${bet.betAmount.toFixed(2)}
                  </span>
                </div>

                <div className="hidden lg:flex items-center justify-center text-center">
                  <span 
                    className="text-sm font-extrabold text-center"
                    style={{ color: 'var(--grey-200)' }}
                  >
                    {bet.multiplier}
                  </span>
                </div>

                <div className="flex items-center justify-end sm:justify-end gap-2 col-span-1">
                  <span 
                    className="text-sm font-semibold"
                    style={{ 
                      color:'var(--grey-300)'
                    }}
                  >
                    ${bet.payout.toFixed(2)}
                  </span>
                  <div 
                    className="transition-transform border duration-200 bg-[var(--grey-500)] rounded p-1"
                    style={{ 
                      color: bet.payout > 0 ? 'var(--green-500)' : 'var(--red-500)',
                      borderColor: "var(--grey-400)"
                    }}
                  >
                    {bet.payout > 0 ? 
                      <FiChevronUp className="w-4 h-4" /> : 
                      <FiChevronDown className="w-4 h-4" />
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Info */}
        <div className="sm:hidden p-4 text-center border-t" style={{ borderTopColor: 'var(--grey-500)' }}>
          <p className="text-xs" style={{ color: 'var(--grey-400)' }}>
            Tap any row for full details
          </p>
        </div>
      </div>
      
    </div>
  )
}
