import React, { useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

import "./styles.scss"
import { LogoutIcon } from "../../../assets/svg";


const subMenuList = [
  {
    id: "0",
    label: "Food",
    path: `/food`,
    icon: <LogoutIcon/>,
    permissions: {
      userCode: [],
    },
    submenu: [],
  }, 
  {
    id: "1",
    label: "Payment",
    path: `/payment`,
    icon: <LogoutIcon/>,
    permissions: {
      userCode: [],
    },
    submenu: [],
  }, 
  {
    id: "2",
    label: "Ice cream",
    path: `/icecream`,
    icon: <LogoutIcon/>,
    permissions: {
      userCode: [],
    },
    submenu: [],
  }, 
];
const Aside = ({ toggle, handleToggle, handleCollapse, collapse }) => {
  return (
    <div>
      <Sidebar
        customBreakPoint={"1024px"}
        breakPoint="always"
        onBackdropClick={handleToggle}
        toggled={toggle}
        collapsed={collapse}
        style={{ width: `${collapse ? "6rem" : "250px"}` }}
      >
        <div
          className={`p flex ${
            collapse ? "flex-column gap-3" : "flex-row"
          } justify-between`}
        >
          <div className="flex content-center justify-center">
            {!toggle ? (
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
            )}
          </div>
        </div>

        <Menu>
          {subMenuList.length > 0 &&
            subMenuList.map((sideMenu) => {
              return <MenuItem key={sideMenu.id}>
                        <NavLink to={sideMenu.path}>
                            <div className="flex flex-row gap-2">
                                {sideMenu.icon && (
                                    <div className="flex items-center justify-center p-0 menu-icon">
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
            })}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Aside