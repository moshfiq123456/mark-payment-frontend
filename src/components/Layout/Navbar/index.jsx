import React, { useEffect, useState } from 'react'
import { Logo } from '../../../assets/png'
import { HamburgerIcon, LogoutIcon } from '../../../assets/svg'
import { useDispatch} from 'react-redux';
import { fetchProduct } from '../../../redux/actionHandler/productActionHandler';
import api from '../../../helpers/api';
import { jwtDecode } from 'jwt-decode';

const Navbar = ({handleToggle,handleCollapse,isMobile}) => {
  const tokenn = localStorage.getItem("refreshToken")
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const Logout =()=>{
      api.delete(`logout`,{
        data:JSON.stringify({refreshToken:tokenn}) 
      }).then((res) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("currentRoute");

        window.location.reload()
      })

  }
  console.log(tokenn)
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
                  <li><button onClick={Logout}>Logout</button></li> 
                </ul>
            </div>
        </div>
       
    </div>
  )
}

export default Navbar