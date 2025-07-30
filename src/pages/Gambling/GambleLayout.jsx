import React from 'react'
import { Outlet } from 'react-router'
import './style/gamble.css'
import Tab from "./Tab"
import { RiShieldKeyholeFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export default function GambleLayout() {
  return (
    <div className='gamble-container'>
        <div className='content'>
            <div className="header-content">
                <RiShieldKeyholeFill size={25}/>
                <h1 className='ResponsibleGambling'>Responsible Gambling</h1>
            </div>
            <div className="close-btn">
                <IoCloseSharp />
            </div>
        </div>
        <div className="content-body flex gap-5 w-full relative my-[20px] px-[60px] ">
          <Tab />
          <div className='bg-[var(--grey-700)] p-3 w-fit inline'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}
