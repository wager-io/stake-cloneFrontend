import React from 'react';
import { Navigate } from 'react-router-dom';
import { lazy } from 'react';
import NotFound from '../../pages/NotFound';
import SportHome from '../../pages/SportHome';
import SoccerLayout from '../../sports/soccer/SoccerLayout';
import ComingSoon from '../../pages/ComingSoon';
import GambleLayout from '../../pages/Gambling/GambleLayout';

import Favourites from './Favourites';
import Recent from './Recent';
import MyBets from './MyBets';

// Import transaction components
// Lazy-loaded components (loaded on demand)
const Home = lazy(() => import('../../pages/LandingPage'));
const CasinoHome = lazy(() => import('../../pages/CasinoHome'));
const AffiliatePage = lazy(() => import('../../pages/AffiliatePage'));
const VipClubPage = lazy(() => import('../../pages/VipClubPage'));
const CrashGame = lazy(() => import('../../Games/Crash/Index'));
const MinesGame = lazy(() => import('../../Games/Mines/MinesGame'));
const DiceoGame = lazy(() => import('../../Games/Dice/DiceGame'));
const LimboGame = lazy(() => import('../../Games/Limbo/LimboGame'));
const HiloGame = lazy(() => import('../../Games/HiloV2/HiloGame'));
const PlinkoGame = lazy(() => import('../../Games/plinko/PlinkoGame'));
const Transactions = lazy(() => import('../../pages/Transactions'));
const PolicyLayout = lazy(() => import('../../pages/Privacy Policy/PolicyLayout'));
const Privacy = lazy(() => import('../../pages/Privacy Policy/display/Privacy'));
const DepositBonusRequirement = lazy(() => import('../../pages/Privacy Policy/display/depositBonusRequirement'));
const CoinMixing = lazy(() => import('../../pages/Privacy Policy/display/CoinMixing'));
const Providers = lazy(() => import('../../pages/Privacy Policy/display/Providers'));
const SportsBook = lazy(() => import('../../pages/Privacy Policy/display/SportsBook'));
const SelfExclusion = lazy(() => import('../../pages/Privacy Policy/display/SelfExclusion'));
const RacingRules = lazy(() => import('../../pages/Privacy Policy/display/RacingRules'));
const PokercardsRoomsrules = lazy(() => import('../../pages/Privacy Policy/display/PokerCards'));
const PokerRefund = lazy(() => import('../../pages/Privacy Policy/display/PokerRefund'));
const AffilateTerms = lazy(() => import('../../pages/Privacy Policy/display/AffilateTerms'));
const CookiesPolicy = lazy(() => import('../../pages/Privacy Policy/display/CookiesPolicy'));

const StakeSmart = lazy(() => import('../../pages/Gambling/display/StakeSmart'));
const RecognisetheSign = lazy(() => import('../../pages/Gambling/display/RecogniseSign'));
const SelfAssessment = lazy(() => import('../../pages/Gambling/display/SelfAssessment'));
const BudgetCalculator = lazy(() => import('../../pages/Gambling/display/BudgetCalculator'));
const ResponsibleGambling = lazy(() => import('../../pages/Gambling/display/ResponsibleGambling'));

// Lazy-loaded affiliate tab components - corrected paths
const AffiliateOverview = lazy(() => import('../../pages/affiliateComponent/Overview'));
const AffiliateCampaigns = lazy(() => import('../../pages/affiliateComponent/Campaigns'));
const AffiliateCommission = lazy(() => import('../../pages/affiliateComponent/Commission'));
const AffiliateReferredUsers = lazy(() => import('../../pages/affiliateComponent/ReferredUsers'));
const AffiliateFAQs = lazy(() => import('../../pages/affiliateComponent/FAQs'));
const TermsService = lazy(() => import('../../pages/Privacy Policy/display/TermsServices'));

const Deposit = lazy(() => import('../../pages/transactionComponents/Deposit'));
const Withdraw = lazy(() => import('../../pages/transactionComponents/Withdraw'));
const Bills = lazy(() => import('../../pages/transactionComponents/Bills'));
const Others = lazy(() => import('../../pages/transactionComponents/Others'));

// Define all application routes
const routes = [
  // Main routes
  { path: '/', element: <Home /> },
  
  // Casino routes
  { path: '/casino', element: <Navigate to="/casino/home" replace /> },
  { path: '/sport', element: <Navigate to="/coming-soon" replace /> },
  { path: '/sport/home', element: <Navigate to="/coming-soon" replace /> },
  { path: '/coming-soon', element: <ComingSoon /> },
  { path: '/casino/home', element: <CasinoHome /> },
  { path: '/sport/home', element: <SportHome /> },

  { path: '/casino/game/crash', element: <CrashGame /> },
  { path: '/casino/game/mines', element: <MinesGame /> },
  { path: '/casino/game/limbo', element: <LimboGame /> },
  { path: '/casino/game/dice', element: <DiceoGame /> },
  { path: '/casino/game/hilo', element: <HiloGame /> },
  { path: '/casino/game/plinko', element: <PlinkoGame /> },
  
  // soccer routes
  { path: '/sport/game/:sportId', element: <SoccerLayout /> },

  // VIP Club route
  { path: '/vip-club', element: <VipClubPage /> },
  
  // Transaction routes with nested components
  { 
    path: '/transactions', 
    element: <Transactions />,
    children: [
      { path: '', element: <Navigate to="/transactions/deposit" replace /> },
      { path: 'deposit', element: <Deposit /> },
      { path: 'withdraw', element: <Withdraw /> },
      { path: 'bills', element: <Bills /> },
      { path: 'others', element: <Others /> }
    ]
  },

    // Affiliate routes with nested components
  {
    path: '/policies',
    element: <PolicyLayout />,
    children: [
      { path: '', element: <Navigate to="/policies/terms" replace /> },
      { path: 'terms', element: <TermsService /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'providers', element: <Providers /> },
      { path: 'coin-mixing', element: <CoinMixing /> },
      { path: 'sportsbook', element: <SportsBook /> },
      { path: 'cookies policy', element: <CookiesPolicy /> },
      { path: 'self-exclusion', element: <SelfExclusion/> },
      { path: 'racing-rles', element: <RacingRules /> },
      { path: 'poker cards', element: <PokercardsRoomsrules /> },
      { path: 'deposit-bonus-requirement', element: <DepositBonusRequirement /> },
      { path: 'poker-refund-policy', element: <PokerRefund /> },
      { path: 'affilate-terms', element: <AffilateTerms /> },
    ]
  },



    // Affiliate routes with nested components
  {
    path: '/gamble',
    element: <GambleLayout />,
    children: [
      { path: '', element: <Navigate to="/gamble/stake-smart" replace /> },
      { path: 'stake-smart', element: <StakeSmart /> },
      { path: 'recognise-the-sign', element: <RecognisetheSign /> },
      { path: 'self-assessement', element: <SelfAssessment /> },
      { path: 'budget-calculator', element: <BudgetCalculator /> },
      { path: 'responsible-gambling', element: <ResponsibleGambling /> },
    ]
  },
  
  
  // Affiliate routes with nested components
  {
    path: '/affiliate',
    element: <AffiliatePage />,
    children: [
      { path: '', element: <Navigate to="/affiliate/overview" replace /> },
      { path: 'overview', element: <AffiliateOverview /> },
      { path: 'campaigns', element: <AffiliateCampaigns /> },
      { path: 'commission', element: <AffiliateCommission /> },
      { path: 'referred-users', element: <AffiliateReferredUsers /> },
      { path: 'faqs', element: <AffiliateFAQs /> }
    ]
  },

  { path: '/favourites', element: <Favourites /> },
  { path: '/recent', element: <Recent /> },
  { path: '/my-bets', element: <MyBets /> },
  
  // Catch-all route for 404
  { path: '*', element: <NotFound /> }
];

// Authentication-required routes
const protectedRoutes = [
  '/transactions',
  '/affiliate/campaigns',
  '/affiliate/commission',
  '/affiliate/referred-users'
];

// Routes that should use the game layout
const gameRoutes = [
  '/casino/game/crash',
  '/casino/game/dice',
  '/casino/game/mines',
  '/casino/game/limbo',
];

// Export the routes and helper functions
export { routes, protectedRoutes, gameRoutes };