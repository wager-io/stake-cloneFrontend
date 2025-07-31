import React from 'react'
import { NavLink } from 'react-router'

export default function GambleTabs() {
  
  let tabs = [
    { name: "Stake Smart", route: "stake-smart"},
    { name: "Recognise the Sign", route: "recognise-the-sign"},
    { name: "Self Assessment", route: "self-assessement"},
    { name: "Budget Calculator", route: "budget-calculator"},
    { name: "Responsible Gambling FAQ's", route: "responsible-gambling"},
  ]

  return (
    <div className="bg-[var(--grey-700)] min-w-[180px] h-[200px] sticky ">
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
