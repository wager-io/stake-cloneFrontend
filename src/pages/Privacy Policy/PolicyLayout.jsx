import React from 'react'
import { Outlet } from 'react-router'
import './style/policy.css'
import Tabs from "./Tabs"
import { RiShieldKeyholeFill } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";

export default function PolicyLayout() {
  return (
    <div className='policy-container'>
        <div className='content'>
            <div className="header-content">
                <RiShieldKeyholeFill size={25}/>
                <h1 className='policies'>Policies</h1>
            </div>
            <div className="close-btn">
                <IoCloseSharp />
            </div>
        </div>
        <div className="content-body flex gap-5 w-full relative my-[20px] px-[60px] ">
          <Tabs />
          <div className='bg-[var(--grey-700)] p-3 w-fit inline'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}
