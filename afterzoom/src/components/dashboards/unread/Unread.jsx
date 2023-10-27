import React, { useState, useEffect } from "react";
import "./Unread.css";

const Unread = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 60) {
          return prevProgress + 1;
        } else {
          clearInterval(progressInterval);
          setTimeout(() => {
            setProgress(0); 
            setInterval(() => {
              setProgress(prevProgress => {
                if (prevProgress < 60) {
                  return prevProgress + 1;
                } else {
                  clearInterval(progressInterval);
                  return prevProgress;
                }
              });
            }, 50);
          }, 10000);
        }
      });
    }, 50); 
    return () => clearInterval(progressInterval);
  }, []);

  const progressBarHeight = `${(progress / 60) * 60}%`; // Calculate height based on progress (scaled to 60%)

  return (
    <div className="unread-progress-container">
      <div className="unread-messages"><h3>6 Unread Messages</h3></div>
      <div className="progress vertical">
        <div style={{ height: progressBarHeight }} className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Unread;
