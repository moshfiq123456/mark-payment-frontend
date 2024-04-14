import React, { useEffect, useState } from 'react'
import { Logo } from '../../../assets/png'
import { HamburgerIcon, LogoutIcon } from '../../../assets/svg'

const Navbar = ({handleToggle,handleCollapse,isMobile}) => {

  return (
    <div className='flex flex-row justify-between px-12 py-2 shadow-sm' style={{backgroundColor:"#ffffff"}}>
        <div>
            <div className="flex flex-row gap-10">
           
              {isMobile ? (
                <button
                  className={"text-white  bg-transparent p-0"}
                  onClick={() => handleToggle()}
                >
                  <HamburgerIcon/>
                </button>
              ) : (
                <button
                  className={"text-white  bg-transparent p-0 "}
                  onClick={() => handleCollapse()}
                >
                  <HamburgerIcon/>
                </button>
              )}
                 <div>
                    <img src={Logo} height={`60`} width={`60`} />
                </div>
            </div>
        </div>
       
        <div className="flex items-center">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=""><LogoutIcon height={24} width={24} color={"#292B5C"}/></div>
                <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100  rounded-box w-52 mt-4">
                  <li><a>Item 1</a></li> 
                  <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
       
    </div>
  )
}

export default Navbar