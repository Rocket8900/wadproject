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
  FaRocketchat
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import styles from "./stuSidebar.module.css";
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

  const findInstructorLabel = instructorId ? "View Lessons" : "Find Instructor";
  const findInstructorLink = instructorId ? "/bookingStudent" : "/instructors";

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
    } else if (currentPath === "/bookingStudent" || currentPath === "/instructors") {
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
    <div id={styles.sidebar}>
      <ProSidebar>
        <SidebarHeader>
          <div className="logotext">
            <p>AfterZoom</p>
          </div>
        </SidebarHeader>

        <SidebarContent>
        {!isSmallScreen && (
          <div className={styles["user-info-box"]}>
            <div className={styles["user-info"]}>
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
              <Link to="/student-dashboard" ><div className={styles.mostInner}>Dashboard</div></Link>
            </MenuItem>
            <MenuItem
              icon={<FaList />}
              active={activeMenuItem === "findInstructor"}
              onClick={() => handleMenuItemClick("findInstructor")}
            >
              <Link to={findInstructorLink}>
                {instructorId ? (
                  <div className={styles.mostInner}>View Lessons</div>
                ) : (
                  <div className={styles.mostInner}>Find Instructor</div>
                )}
              </Link>
            </MenuItem>

            <MenuItem
              icon={<FaRegHeart />}
              active={activeMenuItem === "practice"}
              onClick={() => handleMenuItemClick("practice")}
            >
            <Link to="/choose-quiz">
              <div className={styles.mostInner}>BTT / FTT</div></Link>
              
            </MenuItem>

            <MenuItem
              icon={<FaCreativeCommonsBy />}
              active={activeMenuItem === "simulator"}
              onClick={() => handleMenuItemClick("simulator")}
            >
              <Link to="/simulator"><div className={styles.mostInner}>Enter the Simulator</div></Link>
            </MenuItem>
            <MenuItem
              icon={<BsFillClipboard2Fill />}
              active={activeMenuItem === "yourNotes"}
              onClick={() => handleMenuItemClick("yourNotes")}
            >
              <Link to="/notes"><div className={styles.mostInner}>Your Notes</div></Link>
            </MenuItem>
            <MenuItem
              icon={<FaRocketchat />}
              active={activeMenuItem === "instructorChat"}
              onClick={() => handleMenuItemClick("instructorChat")}
            >
              <Link to="/student-chat">
                <div className={styles.mostInner}>Open your chat</div>
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
