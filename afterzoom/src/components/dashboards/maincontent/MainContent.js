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
import NotesViewDashboard from '../../notes/NotesViewDashboard'
import WeatherForecast from "../weather/weather";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const MainContent = ({ student, bookings, quiz}) => {
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isReallySmallScreen, setIsReallySmallScreen] = useState(false);


  let completeness=0;
  const missingPoints = [];
  if (selfie===null){
    missingPoints.push("Set Up Selfie");
    completeness=completeness+1;
  }
  if(stuInstructorId===null){
    missingPoints.push("Find an Instructor");
    completeness=completeness+1;
  }
  let updatedCompleteness;

  if (completeness === 1) {
    updatedCompleteness = 90;
  } else if (completeness === 2) {
    updatedCompleteness = 80;
  } else {
    updatedCompleteness = 100;
  }


  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      console.log("Screen Width:", screenWidth);
  
      setIsSmallScreen(screenWidth <= 975);
      setIsReallySmallScreen(screenWidth <= 576);
  
      console.log("isSmallScreen:", isSmallScreen);
      console.log("isReallySmallScreen:", isReallySmallScreen);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize handler once to set initial state
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 



  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Section 1',
      notes: [],
    },
    {
      id: 2,
      title: 'Section 2',
      notes: [],
    },
  ]);

  const handleAddNote = (sectionId, newNote) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          notes: [...section.notes, newNote],
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleDeleteNote = (sectionId, noteId) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          notes: section.notes.filter((note) => note.id !== noteId),
        };
      }
      return section;
    });
    setSections(updatedSections);
  };




  const [layout2, setLayout2] = useState([
    {
      i: "a",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      content: 
<div style={{ textAlign: 'left' }}>
  <h2>Hello, {name} <PiHandWavingDuotone /></h2>
  Your profile is {updatedCompleteness}% complete <br/>
  Task List:
  <ul>
    {missingPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</div>
      
    },    
    { i: "b", 
      id: "grid-item-unread", 
      x: 4, y: 0, w: 4, h: 2,
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
      student={student}
      />
      </div>
    },
    {
      i: "i", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 4, h: 2,
      content: 
      <div>
        <WeatherForecast bookings={bookings}/>
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 4, y: 6, w: 4, h: 1,
      content:
      <div >
        <NotesViewDashboard/>
      </div>
    },
    { i: "h", 
      id: "grid-item-lastrow1", 
      x: 4, y: 7, w: 4, h: 1,
      content:
      <div className="changeGraph" onClick={toggleGraph} >
        <h2>Press Me to Change Graph</h2>
      </div>
    },
  ]);


  const [layout3, setLayout3] = useState([
    {
      i: "a",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 8,
      h: 1,
      content: 
<div style={{ textAlign: 'left' }}>
  <h2>Hello, {name} <PiHandWavingDuotone /></h2>
  Your profile is {updatedCompleteness}% complete <br/>
  Task List:
  <ul>
    {missingPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</div>
      
    },    
    { i: "b", 
      id: "grid-item-unread", 
      x: 0, y: 1, w: 8, h: 1,
      content: 
      <div className="unread"><Unread/></div>
    },
    { i: "c", 
      id: "grid-item-calendar", 
      x: 0, y: 2, w: 8, h: 2,
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
      x: 0, y: 4, w: 8, h: 2,
      content:
      <div>
      <Graph 
      bookings={bookings}
      student={student}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 8, h: 1,
      content:
      <div >
        <NotesViewDashboard/>
      </div>
    },
    {
      i: "i", 
      id: "grid-item-lastrow1", 
      x: 0, y: 7, w: 8, h: 1,
      content: 
      <div>
        <WeatherForecast bookings={bookings}/>
      </div>
    },
    { i: "h", 
      id: "grid-item-lastrow1", 
      x: 0, y: 8, w: 8, h: 1,
      content:
      <div className="changeGraph" onClick={toggleGraph} >
        <h2>Press Me to Change Graph</h2>
      </div>
    },
  ]);







  const [layout, setLayout] = useState([
    {
      i: "a",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 6,
      h: 2,
      content: 
<div style={{ textAlign: 'left' }}>
  <h2>Hello, {name} <PiHandWavingDuotone /></h2>
  Your profile is {updatedCompleteness}% complete <br/>
  Task List:
  <ul>
    {missingPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
</div>
      
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
      student={student}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 4, h: 2,
      content:
      <div >
        <NotesViewDashboard/>
      </div>
    },
    {
      i: "i", 
      id: "grid-item-lastrow1", 
      x: 4, y: 6, w: 4, h: 1,
      content: 
      <div>
        <WeatherForecast bookings={bookings}/>
      </div>
    },
    { i: "h", 
      id: "grid-item-lastrow1", 
      x: 4, y: 7, w: 4, h: 1,
      content:
      <div className="changeGraph" onClick={toggleGraph} >
        <h2>Press Me to Change Graph</h2>
      </div>
    },
  ]);



  const layoutToUse = isReallySmallScreen ? layout3 : isSmallScreen ? layout2 : layout;




  
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
        layout={layoutToUse}
        onDrop={onDrop}
        measureBeforeMount={false}
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
      >
        {layoutToUse.map((itm) => (
          <div key={itm.i} data-grid={itm} className={`block ${itm.i}`}>
          {itm.i === "d" && showAlternateGraph ? (
            <AlternateGraph quiz={quiz}/>
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
