import React, { useState, useEffect } from "react";
import { Spring } from "react-spring";

const Unread = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress <= 60) {
        setProgress(prevProgress => prevProgress + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          const decrementInterval = setInterval(() => {
            if (progress > 0) {
              setProgress(prevProgress => prevProgress - 1);
            } else {
              clearInterval(decrementInterval);
              setTimeout(() => {
                setInterval(() => {
                  if (progress < 60) {
                    setProgress(prevProgress => prevProgress + 1);
                  }
                }, 1000); 
              }, 15000);
            }
          }, 1000);
        }, 15000);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="progress vertical">
      <Spring from={{ percent: 0 }} to={{ percent: progress }}>
        {({ percent }) => (
          <div style={{ height: `${percent}%` }} className="progress-bar"></div>
        )}
      </Spring>
    </div>
  );
};

export default Unread;
