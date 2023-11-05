// import React, { useState, useEffect } from "react";
// import "./Unread.css";
// import axios from 'axios';

// const Unread = () => {
  
//   const [progress, setProgress] = useState(0);
//   useEffect(() => {
//     const progressInterval = setInterval(() => {
//       setProgress(prevProgress => {
//         if (prevProgress < 60) {
//           return prevProgress + 1;
//         } else {
//           clearInterval(progressInterval);
//           setTimeout(() => {
//             setProgress(0); 
//             setInterval(() => {
//               setProgress(prevProgress => {
//                 if (prevProgress < 60) {
//                   return prevProgress + 1;
//                 } else {
//                   clearInterval(progressInterval);
//                   return prevProgress;
//                 }
//               });
//             }, 50);
//           }, 10000);
//         }
//       });
//     }, 50); 
//     return () => clearInterval(progressInterval);
//   }, []);

//   const progressBarHeight = `${(progress / 60) * 60}%`; // Calculate height based on progress (scaled to 60%)

//   return (
//     <div className="unread-progress-container">
//       <div className="unread-messages"><h3>6 Unread Messages</h3></div>
//       <div className="progress vertical">
//         <div style={{ height: progressBarHeight }} className="progress-bar"></div>
//       </div>
//     </div>
//   );
// };

// export default Unread;



import React, { useState, useEffect } from 'react';

import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Unread.css";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";



function ChatWithStudentPage() {

   
  const [read, setRead] = useState(true);
  const { id } = useParams();

  useEffect(() => {
      
      const fetchData = async () => {
          try {
              const token = getCookie("access_token");
              const response = await axios.get(

                  `http://47.128.71.161:3001/v1/api/notification/latest`,
                  {
                      headers: {
                          Authorization: `Bearer ${token}`,
                      },
                  }
              );
              setRead(response.data.data.read);
  

          } catch (error) {
              console.error(error);
          }
      };
  
      fetchData(); 
      
  }, []); 

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
console.log(read)

  return (
    <div
    style={
      read === true
        ? {color:"white", backgroundColor:"lightgreen", width:"200%", textAlign:"center", display:"flex", alignContent:"center",alignItems:"center", height:"100%", borderRadius:"8px"}
        : read === false
        ? { backgroundColor: 'red', color: 'white', width:"200%", textAlign:"center", display:"flex", alignContent:"center",alignItems:"center", height:"100%", borderRadius:"8px" }
        : {} 
    }
  >
    {read === true ? (
      <div>
        <h3>No Unread Messages</h3>

      </div>
    ) : read === false ? (
      <div>
        <h3>Unread Messages</h3>
      </div>
    ) : (
      <div>Waiting for data...</div>
    )}
  </div>
  );
}

export default ChatWithStudentPage;
