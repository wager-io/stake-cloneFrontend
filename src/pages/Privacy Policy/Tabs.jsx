import React from 'react'
import { NavLink } from 'react-router'

export default function PolicyTabs() {
  let tabs = [
    { name: "Privacy", route: "privacy"},
    { name: "Terms and Services", route: "terms"},
    { name: "depositBonusRequirement", route: "deposit-bonus-requirement"},
    { name: "Coin Mixing", route: "coin-mixing"},
    { name: "Providers", route: "providers"},
    { name: "Sports Book", route: "sportsbook"},
    { name: "Cookies Policy", route: "cookies policy"},
    { name: "Self-Exclusion", route: "self-exclusion"},
    { name: "Racing Rules", route: "racing-rles"},
    { name: "Poker cards Rooms rules", route: "poker cards"},
    { name: "Poker Refund Policy", route: "poker-refund-policy"},
    { name: "Affilate Terms", route: "affilate-terms"},
  ]
  return (
    <div className="bg-[var(--grey-700)] min-w-[180px] sticky ">
      {tabs.map((item, index)=>(
        <div key={index} className="tabs-controllers py-3 w-full">
          <NavLink to={item.route} className="text-white font-bold p-2 w-full"  >  
            {item.name}
          </NavLink>
        </div>
      ))}
    </div>
  )
}
