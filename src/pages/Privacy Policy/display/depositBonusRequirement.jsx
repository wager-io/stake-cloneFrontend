import React from 'react'

export default function depositBonusRequirement() {
  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      fontFamily: 'Segoe UI, sans-serif',
      fontSize: '16px',
      color: '#333',
      lineHeight: '1.7',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      overflowY: 'auto',
      maxHeight: '90vh'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#111' }}>
        Deposit Bonus Requirement
      </h2>
      <p>
        A bonus rollover defines the multiplier in which the sum of your deposit and bonus will need to be turned over before you are able to make a withdrawal. The majority of our games have between a 3.5% to 4.5% house edge, so we’ve set the wager requirement at a 4% edge.
      </p>
      <p>
        This means that if you play a game with a house edge of 1%, it will complete at a 4x slower rate. Meaning, the requirement accumulates at $0.25 for every $1 wagered. The higher the house edge, the less wager required to complete the requirement.
      </p>
      <p>
        While having an active wager requirement, your chosen currency will be locked until meeting the requirement set in the specific currency, or alternatively using the entire balance (in the relative bonus currency) and also having no active bets.
      </p>
      <p>
        If a Deposit Bonus has been enabled, you can check the progress in the VIP modal.
      </p>
      <p>
        While having an active wager requirement, you cannot wager on certain games. These are listed below:
      </p>

      <div style={{
        backgroundColor: '#f9f9f9',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#000' }}>3 Oaks Gaming</h3>
        <ul>
          <li>All games</li>
        </ul>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#000' }}>AvatarUX</h3>
        <ul>
          <li>7 Lucky Gods</li>
          <li>King of Samba</li>
          <li>Majestic Meow</li>
          <li>Tik Talkers</li>
          <li>Toad's Bounty</li>
        </ul>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#000' }}>Belatra</h3>
        <ul>
          <li>7 Days The Spanish Armada</li>
          <li>Full Moon Magic</li>
          <li>Merry Hog</li>
          <li>Richy Hog</li>
          <li>Zombie Town</li>
        </ul>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#000' }}>BGaming</h3>
        <ul>
          <li>Adventures</li>
          <li>Blackbeard’s Bounty</li>
          <li>Candy Monsta</li>
          <li>Catch the Gold Hold And Win</li>
          <li>Cat's Soup</li>
          <li>God of Wealth Hold And Win</li>
          <li>Hit The Route</li>
          <li>Infinity Pull</li>
          <li>Johnny Cash</li>
          <li>Maneki 88 Gold</li>
          <li>Mice & Magic Wonder Spin</li>
          <li>Road 2 Riches</li>
          <li>Stake Million</li>
          <li>Tile Master</li>
          <li>WBC Ring of Riches</li>
          <li>Wild Heart</li>
          <li>Wild West Trueways</li>
        </ul>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', color: '#000' }}>Big Time Gaming</h3>
        <ul>
          <li>Golden Goose Megaways</li>
          <li>Holy Diver Megaways</li>
          <li>Lil Devil</li>
          <li>Royal Mint</li>
        </ul>
      </div>
    </div>
  );
};


