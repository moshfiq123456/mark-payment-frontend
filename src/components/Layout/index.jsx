import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Aside from "./Sidebar";
import "./styles.scss";

const Layout = () => {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const isMobile = windowSize.width <= 1024;
  const location = useLocation();

  const handleToggle = () => {
    setToggled((prev) => !prev);
  };

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Save current route to local storage
    localStorage.setItem("currentRoute", location.pathname);
  }, [location.pathname]);

  return (
    <main id="main">
      <Navbar handleToggle={handleToggle} handleCollapse={handleCollapse} isMobile={isMobile} />
      <div className="m-0 flex flex-row w-full"  >
        <Aside
          handleToggle={handleToggle}
          toggle={toggled}
          handleCollapse={handleCollapse}
          collapse={collapsed}
          isMobile={isMobile}
        />
        <section
          className={`w-full p-10 flex-grow ${
            collapsed
              ? "section-min-breakpoint-collapse"
              : "section-min-breakpoint"
          } overflow-hidden`}
          style={{ overflowY: "auto", background:"#f5f6fa" }}
        >
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default Layout;
