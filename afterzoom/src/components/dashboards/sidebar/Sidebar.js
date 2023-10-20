import React, { useState, useEffect } from "react";
import axios from "axios"; 
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaList,
  FaRegHeart,
  FaHome,
  FaCreativeCommonsBy,
  FaCog,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import Cookies from 'js-cookie';


const Sidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };


  return (
    <>
      <div id="sidebar">
        <ProSidebar>
          <SidebarHeader>
            <div className="logotext">
              <p>AfterZoom</p>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <div className="user-info-box">
              <div className="user-info">
                <p>ToBeRetrieved</p>
                <p>Instructor ID: ToBeRetrieved</p>
              </div>
            </div>
            <Menu iconShape="square">
              <MenuItem
                icon={<FaHome />}
                active={activeMenuItem === "dashboard"}
                onClick={() => handleMenuItemClick("dashboard")}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                icon={<FaList />}
                active={activeMenuItem === "bookLesson"}
                onClick={() => handleMenuItemClick("bookLesson")}
              >
                Book Lesson
              </MenuItem>
              <MenuItem
                icon={<FaRegHeart />}
                active={activeMenuItem === "practice"}
                onClick={() => handleMenuItemClick("practice")}
              >
                BTT/FTT Practice
              </MenuItem>
              <MenuItem
                icon={<FaCreativeCommonsBy />}
                active={activeMenuItem === "simulator"}
                onClick={() => handleMenuItemClick("simulator")}
              >
                Enter the Simulator
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FaCog />}>Sign Out</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
