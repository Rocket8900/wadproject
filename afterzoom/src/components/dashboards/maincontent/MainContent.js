import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./MainContent.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PiHandWavingDuotone} from 'react-icons/pi';
import Calendar from '../calendar/Calendar'; 
import Unread from '../unread/Unread'
import Graph from '../graph/Graph'
import AlternateGraph from "../graph/AlternateGraph"; 

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainContent = ({ student, bookings }) => {
  const { id: studentId, selfie, name, age, email, gender, type, language, instructor, instructorId:stuInstructorId, reviews,bookings:stuBookings,chatHistory } = student;
  const [details, setDetails] = useState("");
  const [showAlternateGraph, setShowAlternateGraph] = useState(false); 
  const toggleGraph = () => {
    setShowAlternateGraph((prev) => !prev);
  };
  const showDetailsHandle = (details) => {
    setDetails(details);
  };
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);
  const missingPoints = [];
  if (selfie===null){
    missingPoints.push("Set Up Selfie");
  }

  if(stuInstructorId===null){
    missingPoints.push("Find an Instructor");
  }
  const [layout, setLayout] = useState([
    {
      i: "a",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 6,
      h: 2,
      content: (
        <div>
          <h2>Hello, {name}  <PiHandWavingDuotone /></h2>
          <p>
            Your profile is ToBeRetrieved% complete
            Task List:
            <ul>
              {missingPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </p>
        </div>
      )
    },    
    { i: "b", 
      id: "grid-item-unread", 
      x: 6, y: 0, w: 2, h: 2,
      content: 
      <div className="unread"><Unread/></div>
    },
    { i: "c", 
      id: "grid-item-calendar", 
      x: 0, y: 2, w: 4, h: 4,
      content:
      <div>
      <Calendar
        showDetailsHandle={showDetailsHandle}
        bookings={bookings}
      />
      </div>
    },
    { 
      i: "d", 
      id: "grid-item-graph",
      x: 4, y: 2, w: 4, h: 4,
      content:
      <div>
      <Graph 
      bookings={bookings}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 4, h: 2,
      content:
      <div>
        <h3>Notes</h3>
        To Be Retrieved To Be Retrieved To Be Retrieved To Be Retrieved 
      </div>
    },
    { i: "g", 
      id: "grid-item-lastrow1", 
      x: 4, y: 6, w: 2, h: 2,
      content: 
      <div>
        <h2>Press Me to Save Layout</h2>
      </div>
    },
    { i: "h", 
      id: "grid-item-lastrow1", 
      x: 6, y: 6, w: 2, h: 2,
      content:
      <div className="changeGraph" onClick={toggleGraph} >
        <h2>Press Me to Change Graph</h2>
      </div>
    },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCompactTypeChange = () => {
    const oldCompactType = compactType;
    const newCompactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setCompactType(newCompactType);
  };

  const onDrop = (elemParams) => {
    alert(
      `Element parameters:\n${JSON.stringify(
        elemParams,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  const [dynamicRowHeight, setDynamicRowHeight] = useState(0);

  useEffect(() => {
    const containerHeight = window.innerHeight;
    const numberOfRows = 9; 
    const calculatedRowHeight = containerHeight / numberOfRows;
    setDynamicRowHeight(calculatedRowHeight);

    const handleResize = () => {
      const updatedContainerHeight = window.innerHeight;
      const updatedRowHeight = updatedContainerHeight / numberOfRows;
      setDynamicRowHeight(updatedRowHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  return (
    <div className="container-fluid">
      <ResponsiveReactGridLayout
        rowHeight={dynamicRowHeight}
        cols={{ lg: 8, md: 8, sm: 8, xs: 8, xxs: 8 }}
        layout={layout}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
      >
        {layout.map((itm) => (
          <div key={itm.i} data-grid={itm} className={`block ${itm.i}`}>
          {itm.i === "d" && showAlternateGraph ? (
            <AlternateGraph />
          ) : (
            itm.content 
          )}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default MainContent;
