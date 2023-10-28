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
import { Link, useParams } from 'react-router-dom';

const Sidebar = ({ student }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 9);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { name, instructorId } = student;
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  const findInstructorLabel = instructorId ? "Book a Lesson" : "Find Instructor";
  const findInstructorLink = instructorId ? "/bookingStudent" : "/instructor";

  if (student.instructorId === null){
    var instructorr="not found";
  }
  else{
    var instructorr=student.instructorId;
  }

  return (
    <div id="sidebar">
      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
            <p>AfterZoom</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
        {!isSmallScreen && (
          <div className="user-info-box">
            <div className="user-info">
              <p>{name}</p>
              <p>Instructor ID: {instructorr}</p>
            </div>
          </div>
        )}

          <Menu iconShape="square">
            <MenuItem
              icon={<FaHome />}
              active={activeMenuItem === "dashboard"}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              <Link to="/student-dashboard"><div className="mostInner">Dashboard</div></Link>
            </MenuItem>
            <MenuItem
            icon={<FaList />}
            active={activeMenuItem === "findInstructor"}
            onClick={() => handleMenuItemClick("findInstructor")}
          >
            <Link to={findInstructorLink}>
              <div className="mostInner">{findInstructorLabel}</div>
            </Link>
          </MenuItem>


            <MenuItem
              icon={<FaRegHeart />}
              active={activeMenuItem === "practice"}
              onClick={() => handleMenuItemClick("practice")}
            >
              <Link to="/choose-quiz"><div className="mostInner">BTT / FTT</div></Link>
            </MenuItem>
            <MenuItem
              icon={<FaCreativeCommonsBy />}
              active={activeMenuItem === "simulator"}
              onClick={() => handleMenuItemClick("simulator")}
            >
              <Link to="/simulator"><div className="mostInner">Enter the Simulator</div></Link>
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
  );
};

export default Sidebar;
