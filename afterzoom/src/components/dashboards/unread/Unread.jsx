import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Unread.css";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

function ChatWithStudentPage() {
  const [read, setRead] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("access_token");
        const response = await axios.get(
          `http://13.212.56.111:3001/v1/api/notification/latest`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setRead(response.data.data.read);
        } else {
          setRead(true); // Set to false if data is not available
        }
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

  return (
    <div
      style={
        read === true
          ? {
              color: "white",
              backgroundColor: "lightgreen",
              width: "200%",
              textAlign: "center",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              height: "100%",
              borderRadius: "8px",
            }
          : read === false
          ? {
              backgroundColor: 'red',
              color: 'white',
              width: '200%',
              textAlign: 'center',
              display: 'flex',
              alignContent: 'center',
              alignItems: 'center',
              height: '100%',
              borderRadius: '8px',
            }
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
