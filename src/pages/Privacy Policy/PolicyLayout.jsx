import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import './style/policy.css';
import Tabs from './Tabs';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import { IoCloseSharp } from 'react-icons/io5';import { useNavigate } from 'react-router-dom';


export default function PolicyLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 const navigate = useNavigate();
  function toggleForm() {
    navigate('/casino/home');
  }

  const handleResize = () => setIsMobile(window.innerWidth < 900);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const policyLinks = [
    <NavLink to="/policies/deposit-bonus-requirement">Deposit Bonus Requirements</NavLink>,
    <NavLink to="/policies/anti-money-laundering">Anti-Money Laundering</NavLink>,
    <NavLink to="/policies/privacy">privacy</NavLink>,
    <NavLink to="/policies/coin-mixing">Coin Mixing</NavLink>,
    <NavLink to="/policies/providers">Providers</NavLink>,
    <NavLink to="/policies/sportsbook">Sports Book</NavLink>,
    <NavLink to="/policies/cookies policy">Cookies Policy</NavLink>,
    <NavLink to="/policies/self-exclusion">Self-Exclusion</NavLink>,
    <NavLink to="/policies/racing-rles">Racing Rules</NavLink>,
    <NavLink to="/policies/poker cards">Poker Card Room Rules</NavLink>,
    <NavLink to="/policies/poker-refund-policy">Poker Refund Policy</NavLink>,
    <NavLink to="/policies/affilate-terms">Affiliate Terms</NavLink>,
  ];

  return (
    <div className='policy-container'>
      <div className='content'>
        <div className="header-content">
          <RiShieldKeyholeFill size={25} />
          <h1 className='policies'>Policies</h1>
        </div>
        <button className="close-btn" onClick={toggleForm}>
          <IoCloseSharp />
         </button>
      </div>

      {/* Dropdown for Mobile */}
      {isMobile && (
        <div className="relative px-5 mt-3">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-[29px] px-4 py-2 bg-[#1f2937] text-white text-[20px] rounded-md font-semibold"
          >
            Privacy
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg z-50">
              {policyLinks.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    item === 'Privacy' ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content Body */}
      <div className="content-body flex gap-5 w-full relative my-[20px] px-[60px]">
        {!isMobile && <Tabs />}
        <div className="bg-[var(--grey-700)] p-3 w-fit inline">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

