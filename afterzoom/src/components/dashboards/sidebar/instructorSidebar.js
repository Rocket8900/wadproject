import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { BsFillClipboard2Fill } from "react-icons/bs";
import {
  FaRocketchat,
  FaList,
  FaChild,
  FaHome,
  FaCreativeCommonsBy,
  FaCog,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { Link } from 'react-router-dom';

const Sidebar = ({ instructor }) => {
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
  // const { name, instructorId } = instructor;
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");
  // const name = instructor.name
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
  };

  // const findInstructorLabel = instructorId ? "Book a Lesson" : "Find Instructor";
  // const findInstructorLink = instructorId ? "/bookingStudent" : "/instructor";

  // if (student.instructorId === null){
  //   var instructorr="not found";
  // }
  // else{
  //   var instructorr=student.instructorId;
  // }


  
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
              {/* <p>Hi {name}!</p> */}
              {/* <p>Instructor ID: {instructorr}</p> */}
            </div>
          </div>
        )}

          <Menu iconShape="square">
            <MenuItem
              icon={<FaHome />}
              active={activeMenuItem === "dashboard"}
              onClick={() => handleMenuItemClick("dashboard")}
            >
              <Link to="/instructor-dashboard" ><div className="mostInner">Dashboard</div></Link>
            </MenuItem>

            <MenuItem
              icon={<FaList />}
              active={activeMenuItem === "findInstructor"}
              onClick={() => handleMenuItemClick("findInstructor")}
            >
              <Link to="/instructorbookings">
                <div className="mostInner">Check your bookings</div>
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaChild />}
              active={activeMenuItem === "findInstructor"}
              onClick={() => handleMenuItemClick("findInstructor")}
            >
              <Link to="/FaChild">
                <div className="mostInner">See your students</div>
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaRocketchat />}
              active={activeMenuItem === "instructorChat"}
              onClick={() => handleMenuItemClick("instructorChat")}
            >
              <Link to="/instructor-chat">
                <div className="mostInner">Open your chat</div>
              </Link>
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
