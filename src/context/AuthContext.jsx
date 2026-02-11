import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserProfile } from '../services/authService';
import { getUserVipProgress, getAllVipTiers } from '../services/vipService';
import { DEFAULT_VIP_TIERS_FALLBACK } from '../constants/vipDefaults';
import Cookies from 'js-cookie';
import axios from 'axios';
import api from '../utils/api';
import { toast } from 'sonner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial token check
  const [newScreen, setNewScreen] = useState(window.innerWidth);
  const [balance, setBalance] = useState(0);
  const [vipProgress, setVipProgress] = useState(null);
  const [vipTiers, setVipTiers] = useState([]);
  const [userVipTier, setUserVipTier] = useState(null);
  
  // Default VIP benefits
  const [vipBenefits] = useState([
    {
      title: "Instant Withdrawals",
      description: "Enjoy priority processing for all your withdrawal requests.",
      icon: "/assets/affiliate-icons/b1.webp"
    },
    {
      title: "Exclusive Promotions",
      description: "Access to special promotions and bonuses only available to VIP members.",
      icon: "/assets/affiliate-icons/b2.webp"
    },
    {
      title: "Dedicated VIP Host",
      description: "Personal account manager to assist with all your gaming needs.",
      icon: "/assets/affiliate-icons/b3.webp"
    },
    {
      title: "Customized Bonuses",
      description: "Receive personalized bonuses tailored to your gaming preferences.",
      icon: "/assets/affiliate-icons/b4.webp"
    }
  ]);
  
  // Default supported languages
  const [supportedLanguages] = useState([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ru', name: 'Русский' }
  ]);

  // Check for token in cookies and fetch user profile
  useEffect(() => {
    const token = Cookies.get('authToken'); // Get token from cookies
    if (token) {
      fetchUserProfile(); 
    } else {
      setIsLoading(false); // No token, stop loading
    }
    
    // Fetch VIP tiers regardless of authentication
    fetchVipTiers();
  }, []);

  // Fetch VIP tiers
  const fetchVipTiers = async () => {
    try {
      const response = await getAllVipTiers();
      setVipTiers(response.data || []);  // Fixed: extract data from response
    } catch (err) {
      console.error('Failed to fetch VIP tiers:', err);
      // Use shared fallback tiers if fetch fails
      setVipTiers(DEFAULT_VIP_TIERS_FALLBACK);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const profile = await getUserProfile();
      setUser(profile); // Update user state
      setBalance(profile.balance);
      // Fetch VIP progress if user is logged in
      if (profile) {
        fetchUserVipProgress();
      }
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setUser(null); // Clear user state on error
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  // Fetch user VIP progress
  const fetchUserVipProgress = async () => {
    try {
      const progress = await getUserVipProgress();
      setVipProgress(progress);
      setUserVipTier(progress.currentTierDetails);
    } catch (err) {
      console.error('Failed to fetch VIP progress:', err);
    }
  };

  const verifyCode = async (verificationCode) => {
    try {
      const response = await api.post('/auth/verify-account', {
        email: user.email,
        verificationCode,
      });
      if (response.data.success) {
        toast.success('Verification successful');
        return response.data;
      }
      return false;
    } catch (error) {
      console.error('Verification error:', error);
      return false;
    }
  };

  // Handle user login
  const login = (userData, token) => {
    Cookies.set('authToken', token); // Save token to cookies
    setUser(userData); // Update user state
    setBalance(userData.balance);
    // Fetch VIP progress after login
    fetchUserVipProgress();
  };

  const resendVerificationCode = async (email) => {
    try {
      await api.post('/auth/resend-code', { email });
    } catch (error) {
      console.error('Resend code error:', error);
      throw error;
    }
  };

  // Handle user registration
  const register = (userData, token) => {
    Cookies.set('authToken', token); // Save token to cookies
    setUser(userData); // Update user state
    // Initialize VIP progress for new user
    fetchUserVipProgress();
  };

  // Handle user logout
  const logout = () => {
    Cookies.remove('authToken'); // Remove token from cookies
    setUser(null); // Clear user state
    setVipProgress(null); // Clear VIP progress
    setUserVipTier(null); // Clear user VIP tier
  };

  const updateUserDetails = async (details) => {
    try {
      const response = await api.post('/api/user/update-details', details);
      setUser({ ...user, ...details }); // Update the user state with the new details
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      resendVerificationCode, 
      verifyCode, 
      updateUserDetails, 
      balance, 
      setBalance,
      newScreen, 
      setNewScreen,
      vipProgress,
      vipTiers,
      vipBenefits,
      supportedLanguages,
      userVipTier,
      fetchUserVipProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
