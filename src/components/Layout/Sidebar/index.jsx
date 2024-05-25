import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { Logo } from "../../../assets/png";
import { LogoutIcon, FoodIcon, PurchaseIcon, IcecreamIcon } from "../../../assets/svg";
import { jwtDecode } from "jwt-decode";

// Define your subMenuList with permissions
const subMenuList = [
  {
    id: "0",
    label: "Food",
    path: `/`,
    icon: <FoodIcon />,
    permissions: "",
    submenu: [],
  },
  {
    id: "1",
    label: "Payment",
    path: `/payment`,
    icon: <PurchaseIcon />,
    permissions: "",
    submenu: [],
  },
  {
    id: "2",
    label: "Ice cream",
    path: `/icecream`,
    icon: <IcecreamIcon />,
    permissions: "",
    submenu: [],
  },
  {
    id: "3",
    label: "Product",
    path: `/product`,
    icon: <IcecreamIcon />,
    permissions: "admin" || "super_admin",
    submenu: [],
  },
  {
    id: "4",
    label: "Users",
    path: `/users`,
    icon: <IcecreamIcon />,
    permissions: "admin" || "super_admin",
    submenu: [],
  },
];

const Aside = ({ toggle, handleToggle, handleCollapse, collapse, isMobile }) => {
  const tokenn = jwtDecode(localStorage.getItem("accessToken"))
  // Function to decode the token and get roles
  const getUserRoles = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return [];
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.roles ||"";
    } catch (e) {
      console.error("Invalid token", e);
      return [];
    }
  };

  // Filter the subMenuList based on user roles and item permissions
  const visibleSubMenuList = subMenuList.filter((item) => {
    // Check if item has permissions set and if token has one of those permissions
    return item.permissions === "" || tokenn.roles.includes(item.permissions) || tokenn.roles.includes("super_admin");
  });

  return (
    <div>
      <Sidebar
        customBreakPoint={"1024px"}
        breakPoint="always"
        onBackdropClick={handleToggle}
        toggled={toggle}
        collapsed={collapse}
        style={{ width: `${collapse ? "6rem" : "250px"}`, height: `${!isMobile && "calc(100vh - 80px)"}` }}
      >
        <div className={`p flex ${collapse ? "flex-column gap-3" : "flex-row"} justify-between`}>
          <div className="flex content-center justify-center">
            {isMobile ? (
              <div>
                <img src={Logo} height={`60`} width={`60`} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <Menu className="mt-10">
          {visibleSubMenuList.map((sideMenu) => (
            <div className="tooltip tooltip-top w-full" data-tip={sideMenu.label} key={sideMenu.id}>
              <MenuItem>
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
            </div>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Aside;
