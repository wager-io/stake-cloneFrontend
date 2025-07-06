import React, { useState } from 'react'

export default function FaqSection() {
  const [openCardId, setOpenCardId] = useState(null);

  const toggleCard = (cardId) => {
    setOpenCardId(prev => prev === cardId ? null : cardId);
  };

  const faqItems = [
    {
      id: 'card1',
      question: 'Who is WAGER?',
      answer: (
        <>
          <p className="mb-3">
            Leading the online gambling industry since 2017, wagergames.casino offers a wide variety of online casino and sports betting options, operating globally in 15 different languages.
          </p>
          <p>
            With a reputable and secure platform, WAGER Casino is home to worldwide local currencies and crypto betting options for online slot games, WAGER Originals and live casino games. WAGER Sportsbook offers unbeatable odds on all major sporting events including a range of eSport leagues.
          </p>
          <p className="mt-3">
            We host regular bet bonuses and promotions and offer an exclusive VIP Club experience - all with a simple-to-use deposit process on our licensed platform.
          </p>
        </>
      )
    },
    {
      id: 'card2',
      question: 'Is WAGER Licensed?',
      answer: (
        <>
          <p className="mb-3">
            wagergames.casino is licensed by gaming authorities in Curacao, providing a safe and secure betting platform. WAGER is operated by Medium Rare N.V. under the Certificate of Operation (Application no. OGL/2024/1451/0918) issued by the Curaçao Gaming Control Board, which is authorised and regulated by the Government of Curaçao.
          </p>
          <p>
            WAGER is a Crypto Gambling Foundation verified operator with strong policies around Anti-Money Laundering. WAGER promotes responsible gambling with a robust self-exclusion policy and various WAGER Smart resources.
          </p>
        </>
      )
    },
    {
      id: 'card3',
      question: 'Is Betting on WAGER Safe?',
      answer: (
        <>
          <p className="mb-3">
            WAGER is committed to providing a safe environment for our community. We pride ourselves in offering the most up to date and accessible smarter gambling resources. Our responsible gambling guidelines paired with our monthly budget calculator have been developed to help our players set appropriate betting limits.
          </p>
          <p>
            When betting with local and crypto currencies, players can be sure their funds are securely stored using our WAGER Vault feature.
          </p>
        </>
      )
    },
    {
      id: 'card4',
      question: 'What Currencies Can I Bet With?',
      answer: (
        <p>
          Alongside supporting local currencies, wagergames.casino is the world's leading cryptocurrency casino and sportsbook, supporting 20 cryptocurrencies from Bitcoin (BTC) to Polygon (MATIC). Discover the complete list of supported crypto at wagergames.casino for more details.
        </p>
      )
    },
    {
      id: 'card5',
      question: 'What Sports Can I Bet On?',
      answer: (
        <>
          <p className="mb-3">
            From major football and basketball leagues to Dota 2 and CS:GO action, we cover all bases for sports and eSports markets. We offer industry leading odds and tailored betting resources including expert picks and predictions on our WAGER News Blog.
          </p>
          <p>
            You can bet on all major upcoming sporting events, place live bets and live stream all the biggest sporting events for free on WAGER Sportsbook.
          </p>
        </>
      )
    },
    {
      id: 'card7',
      question: 'What Types of Casino Games Can I Play?',
      answer: (
        <p>
          Browse our wide variety of popular casino games and enjoy a fair and fun online gaming experience. WAGER's online casino platform features a range of game categories including slot games, live casino games, WAGER Originals and many classics like Blackjack, Roulette, Poker, and Baccarat, right from your browser. WAGER brings you the best gameplay from esteemed iGaming providers like Pragmatic Play, Hacksaw Gaming, Twist Gaming and Evolution Gaming.
        </p>
      )
    },
    {
      id: 'card8',
      question: 'How Do I Watch Live Streams?',
      answer: (
        <>
          <p className="mb-3">
            wagergames.casino is the perfect place for official sports streams, with comprehensive coverage of most popular sporting events and major tournaments, from tennis matches to MMA fights.
          </p>
          <p>
            To live stream the latest sporting events, click on the live stream icon next to the event on WAGER Sportsbook. For full details, check out our comprehensive guide to live streaming your favourite sports on wagergames.casino.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="py-8 bg-[#1a2c38]">
      <div className="container mx-auto px-4">
        {/* Section Title with Icon */}
        <div className="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-white">Still Have Questions?</h2>
        </div>
        
        {/* FAQ Cards */}
        {faqItems.map((item) => (
          <div className="w-full mb-3" key={item.id}>
            <div
              className="bg-[rgb(33,55,67)] rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 hover:bg-[#213d4d]"
              onClick={() => toggleCard(item.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">{item.question}</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${openCardId === item.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              
              {/* Expandable content */}
              {openCardId === item.id && (
                <div className="mt-3 text-gray-300 text-sm leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
