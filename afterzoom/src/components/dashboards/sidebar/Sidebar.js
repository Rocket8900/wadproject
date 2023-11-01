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
  FaList,
  FaRegHeart,
  FaHome,
  FaCreativeCommonsBy,
  FaCog,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Sidebar = ({ student }) => {
  const location = useLocation();
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


  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/student-dashboard") {
      setActiveMenuItem("dashboard");
    } else if (currentPath === "/bookingStudent" || currentPath === "/instructor") {
      setActiveMenuItem("findInstructor");
    } else if (currentPath === "/choose-quiz") {
      setActiveMenuItem("practice");
    } else if (currentPath === "/simulator") {
      setActiveMenuItem("simulator");
    } else if (currentPath === "/notes") {
      setActiveMenuItem("yourNotes");
    }
  }, [location.pathname]);


  
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
              <Link to="/student-dashboard" ><div className="mostInner">Dashboard</div></Link>
            </MenuItem>
            <MenuItem
              icon={<FaList />}
              active={activeMenuItem === "findInstructor"}
              onClick={() => handleMenuItemClick("findInstructor")}
            >
              <Link to={findInstructorLink}>
                {instructorId ? (
                  <div className="mostInner">Book a Lesson</div>
                ) : (
                  <div className="mostInner">Find Instructor</div>
                )}
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaRegHeart />}
              active={activeMenuItem === "practice"}
              onClick={() => handleMenuItemClick("practice")}
            >
            <Link to="/choose-quiz">
              <div className="mostInner">BTT / FTT</div></Link>
              
            </MenuItem>

            <MenuItem
              icon={<FaCreativeCommonsBy />}
              active={activeMenuItem === "simulator"}
              onClick={() => handleMenuItemClick("simulator")}
            >
              <Link to="/simulator"><div className="mostInner">Enter the Simulator</div></Link>
            </MenuItem>
            <MenuItem
              icon={<BsFillClipboard2Fill />}
              active={activeMenuItem === "yourNotes"}
              onClick={() => handleMenuItemClick("yourNotes")}
            >
              <Link to="/notes"><div className="mostInner">Your Notes</div></Link>
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
