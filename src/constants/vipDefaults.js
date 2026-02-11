// Shared VIP tier constants - Single source of truth for tier definitions
export const VIP_TIER_ICON_PATH = "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z";

export const VIP_TIER_ICON_PATH_LONG = "m48 14.595 8.49 15.75a13.68 13.68 0 0 0 9.66 7.08L84 40.635l-12.39 12.9a13.9 13.9 0 0 0-3.9 9.63q-.069.96 0 1.92l2.46 17.76-15.66-7.56a15 15 0 0 0-6.51-1.53a15 15 0 0 0-6.6 1.5l-15.57 7.53 2.46-17.76q.051-.93 0-1.86a13.9 13.9 0 0 0-3.9-9.63L12 40.635l17.64-3.21a13.62 13.62 0 0 0 9.84-7.02zm0-12.54a5.22 5.22 0 0 0-4.59 2.73l-11.4 21.45a5.4 5.4 0 0 1-3.66 2.67l-24 4.32A5.25 5.25 0 0 0 0 38.385a5.13 5.13 0 0 0 1.44 3.6l16.83 17.55a5.16 5.16 0 0 1 1.47 3.6q.024.435 0 .87l-3.27 24a3 3 0 0 0 0 .72 5.19 5.19 0 0 0 5.19 5.22h.18a5.1 5.1 0 0 0 2.16-.6l21.39-10.32a6.4 6.4 0 0 1 2.76-.63a6.2 6.2 0 0 1 2.79.66l21 10.32c.69.377 1.464.573 2.25.57h.21a5.22 5.22 0 0 0 5.19-5.19q.024-.375 0-.75l-3.27-24q-.025-.375 0-.75a5 5 0 0 1 1.47-3.57l16.77-17.7a5.19 5.19 0 0 0-2.82-8.7l-24-4.32a5.22 5.22 0 0 1-3.69-2.76l-11.4-21.45a5.22 5.22 0 0 0-4.65-2.7";

export const DEFAULT_VIP_TIERS_FALLBACK = [
  {
    name: 'None',
    color: '#2F4553',
    wagerAmount: 'Below $10k',
    icon: {
      viewBox: "0 0 96 96",
      path: VIP_TIER_ICON_PATH_LONG
    },
    features: ['Level Up bonuses'],
    requiredWager: 0,
    level: 0
  },
  {
    name: 'Bronze',
    color: '#C69C6D',
    wagerAmount: '$10k',
    icon: {
      viewBox: "0 0 96 96",
      path: VIP_TIER_ICON_PATH_LONG
    },
    features: ['Level Up bonuses', 'Rakeback', 'Weekly bonuses'],
    requiredWager: 10000,
    level: 10
  },
  {
    name: 'Silver',
    color: '#B2CCCC',
    wagerAmount: '$50k',
    icon: {
      viewBox: "0 0 96 96",
      path: VIP_TIER_ICON_PATH_LONG
    },
    features: ['Level Up bonuses', 'Rakeback', 'Weekly bonuses', 'Monthly bonuses'],
    requiredWager: 50000,
    level: 25
  },
  {
    name: 'Gold',
    color: '#FFD700',
    wagerAmount: '$250k',
    icon: {
      viewBox: "0 0 96 96",
      path: VIP_TIER_ICON_PATH_LONG
    },
    features: ['All previous benefits', 'Priority withdrawals', 'Dedicated host'],
    requiredWager: 250000,
    level: 50
  },
  {
    name: 'Platinum',
    color: '#E5E4E2',
    wagerAmount: '$1M',
    icon: {
      viewBox: "0 0 96 96",
      path: VIP_TIER_ICON_PATH_LONG
    },
    features: ['All previous benefits', 'Exclusive events', 'Custom promotions'],
    requiredWager: 1000000,
    level: 100
  }
];

export const DEFAULT_VIP_TIERS_SHORT_FALLBACK = [
  {
    name: 'Bronze',
    color: '#C69C6D',
    wagerAmount: '$10,000',
    icon: VIP_TIER_ICON_PATH,
    features: ['Level Up bonuses', 'Rakeback', 'Weekly bonuses']
  },
  {
    name: 'Silver',
    color: '#B2CCCC',
    wagerAmount: '$50,000',
    icon: VIP_TIER_ICON_PATH,
    features: ['All Bronze benefits', 'Monthly bonuses', 'Priority withdrawals']
  },
  {
    name: 'Gold',
    color: '#FFD700',
    wagerAmount: '$250,000',
    icon: VIP_TIER_ICON_PATH,
    features: ['All Silver benefits', 'Dedicated host', 'Custom promotions']
  }
];
