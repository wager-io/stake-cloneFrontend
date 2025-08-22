import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#0f212e] py-12 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Logo and Company Info */}
          <div className="lg:col-span-2">
            <img 
              src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1714511848/Wager__wshh2r.png" 
              className='w-24 mb-6' 
              alt="Wager Logo" 
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Your trusted destination for premium gaming experiences. 
              Play responsibly and enjoy world-class entertainment.
            </p>
            <p className="text-gray-500 text-xs">
              © 2025 wagergames.casino | All Rights Reserved.
            </p>
          </div>

          {/* Support Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <div className="flex flex-col space-y-3">
              <NavLink to="/" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Help Center</NavLink>
              <NavLink to="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Fairness</NavLink>
              <NavLink to="/gamble/stake-smart" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Gambling Helpline</NavLink>
              <NavLink to="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Live Support</NavLink>
              <NavLink to="/policies/self-exclusion" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Self Exclusion</NavLink>
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <div className="flex flex-col space-y-3">
              <NavLink to="/policies/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</NavLink>
              <NavLink to="/policies/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</NavLink>
              <NavLink to="/policies/anti-money-laundering" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">AML Policy</NavLink>
              <NavLink to="/policies/cookies policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookies Policy</NavLink>
              <NavLink to="/policies/affilate-terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Affiliate Terms</NavLink>
            </div>
          </div>

          {/* Gaming & Sports */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-4">Gaming</h3>
            <div className="flex flex-col space-y-3">
              <NavLink to="/policies/sportsbook" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Sports Book</NavLink>
              <NavLink to="/policies/poker cards" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Poker Rules</NavLink>
              <NavLink to="/policies/racing-rles" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Racing Rules</NavLink>
              <NavLink to="/gamble/responsible-gambling" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Responsible Gaming</NavLink>
              <NavLink to="/gamble/budget-calculator" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Budget Calculator</NavLink>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-gray-700 my-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap justify-center md:justify-start items-center space-x-6 text-gray-400 text-sm">
            <NavLink to="/gamble/stake-smart" className="hover:text-white transition-colors">Responsible Gaming</NavLink>
            <span>|</span>
            <NavLink to="/policies/terms" className="hover:text-white transition-colors">Terms of Service</NavLink>
            <span>|</span>
            <NavLink to="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              18+
            </div>
            <p className="text-gray-400 text-sm">Play Responsibly</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;




