import React, { useState } from 'react'

import Navbar from './Navbar';
import Aside from './Sidebar';
import { Outlet } from 'react-router-dom';
import "./styles.scss"

const Layout = () => {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setToggled((prev) => !prev);
  };

  const handleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <main
      id="main"
      style={{
        height: "100vh",
      }}
    >
        <Navbar handleToggle={handleToggle} />
      <div className="m-0 flex flex-row">
      <Aside
        handleToggle={handleToggle}
        toggle={toggled}
        handleCollapse={handleCollapse}
        collapse={collapsed}
      /> 
        <section
        //   className={`flex-grow p-4 overflow-auto ${
        //     collapsed
        //       ? "section-min-breakpoint-collapse"
        //       : "section-min-breakpoint"
        //   } `}
          style={{
            // height: "calc(100vh - 6rem)",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </section>
      </div>
    </main>
  )
}

export default Layout