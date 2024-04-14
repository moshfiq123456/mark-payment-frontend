import React, { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

import "./styles.scss"
import { LogoutIcon,FoodIcon,PurchaseIcon,IcecreamIcon} from "../../../assets/svg";
import { Logo } from '../../../assets/png'

const subMenuList = [
  {
    id: "0",
    label: "Food",
    path: `/`,
    icon: <FoodIcon/>,
    permissions: {
      userCode: [],
    },
    submenu: [],
  }, 
  {
    id: "1",
    label: "Payment",
    path: `/payment`,
    icon: <PurchaseIcon/>,
    permissions: {
      userCode: [],
    },
    submenu: [],
  }, 
  {
    id: "2",
    label: "Ice cream",
    path: `/icecream`,
    icon: <IcecreamIcon/>,
    permissions: {
      userCode: [],
    },
    submenu: [],
  }, 
];
const Aside = ({ toggle, handleToggle, handleCollapse, collapse,isMobile }) => {
  return (
    <div >
      <Sidebar
        customBreakPoint={"1024px"}
        breakPoint="always"
        onBackdropClick={handleToggle}
        toggled={toggle}
        collapsed={collapse}
        style={{ width: `${collapse ? "6rem" : "250px"}`,height:`${!isMobile && "calc(100vh - 80px)"}` }}
      >
        <div
          className={`p flex ${
            collapse ? "flex-column gap-3" : "flex-row"
          } justify-between`}
        >
          <div className="flex content-center justify-center">
            {
              isMobile ?<div>
              <img src={Logo} height={`60`} width={`60`} />
          </div>:<></>
            }
            {/* {!toggle ? (
              <button className="p-0" onClick={() => handleCollapse()}>
                {collapse ? (
                  <LogoutIcon height={20} width={20} color={"#000000"}/>
                ) : (
                  <div className="mt-3">
                    <LogoutIcon height={20} width={20} color={"#000000"}/>
                  </div>
                )}
              </button>
            ) : (
              <></>
            )} */}
          </div>
        </div>
        
        <Menu className="mt-10">
          {subMenuList.length > 0 &&
            subMenuList.map((sideMenu) => {

              return<div  className="tooltip  tooltip-top w-full" data-tip={"hello"}>
                <MenuItem key={sideMenu.id} >
                        <NavLink to={sideMenu.path}>
                            <div className="flex flex-row gap-2">
                                {sideMenu.icon && (
                                    <div className="flex items-center justify-center p-0 menu-icon" data-tip="hello">
                                        {sideMenu.icon}
                                    </div>
                                )}

                                {sideMenu.label && (
                                    <div className="flex items-center justify-center p-0 ms-3 menu-label">
                                        {sideMenu.label}
                                    </div>
                                )}
                            </div>
                        </NavLink>
                    </MenuItem>
              </div> 
            })}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Aside