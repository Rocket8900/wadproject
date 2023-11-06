import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./InstructorMainContent.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PiHandWavingDuotone} from 'react-icons/pi';
import Calendar from '../calendar/Calendar'; 
import Unread from '../unread/Unread'
import Graph from '../graph/InstruGraph'
import { useNavigate} from "react-router-dom";
import axios from "axios";
import WeatherForecast from "../weather/weather";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const InstructorMainContent = ({ instructor, bookings }) => {

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isReallySmallScreen, setIsReallySmallScreen] = useState(false);

  const {
    id: instructorId,
    picture:instructorPicture,
    name: instructorName,
    age: instructorAge,
    affiliation: instructorAffiliation,
    gender: instructorGender,
    email: instructorEmail,
    password: instructorPassword,
    language: instructorLanguage,
    experience: instructorExperience,
    type: instructorType,
    carModel: instructorCarModel,
    students: instructorStudents,
    bookings: instructorBookings,
    reviews: instructorReviews,
    chatHistory: instructorChats
  } = instructor;





  const [details, setDetails] = useState("");

  const showDetailsHandle = (details) => {
    setDetails(details);
  };
  const [compactType, setCompactType] = useState("vertical");
  const [mounted, setMounted] = useState(false);

  let updatedCompleteness=100;
  const missingPoints = [];
  if (instructorPicture===null){
    missingPoints.push("Set Up Selfie");
    updatedCompleteness=90;
  }



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

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

  
      setIsSmallScreen(screenWidth <= 975);
      setIsReallySmallScreen(screenWidth <= 576);

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






  const [layout, setLayout] = useState([
    {
      i: "ab",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 6,
      h: 2,
      content: 
<div className="greet" style={{ textAlign: 'left' }}>
  <h2>Welcome back, {instructorName} <PiHandWavingDuotone /></h2>
  <p>Your profile is {updatedCompleteness}% complete</p> 
  {/* <br/> */}
  <p>Task List:</p>
  {updatedCompleteness < 100 ? (
    <ul>
      {missingPoints.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  ) : (
    "  -"
  )}
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
      instructor={instructor}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 4, h: 2,
      content: 
      <div>
        <WeatherForecast bookings={bookings}/>
      </div>
    },
    { i: "f", 
    id: "grid-item-lastrow1", 
    x: 4, y: 6, w: 4, h: 2,
    content: 
    <div>
      A QUOTE JUST FOR YOU
      <p>If you ever feel tiny, think about the impact a bedtime mosquito can have.</p>
    </div>
  },

  ]);


  const [layout2, setLayout2] = useState([
    {
      i: "ab",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      content: 
<div className="greet" style={{ textAlign: 'left' }}>
  <h2>Welcome back, {instructorName} <PiHandWavingDuotone /></h2>
  <p>Your profile is {updatedCompleteness}% complete</p> 
  {/* <br/> */}
  <p>Task List:</p>
  {updatedCompleteness < 100 ? (
    <ul>
      {missingPoints.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  ) : (
    "  -"
  )}
</div>
      
    },    
    { i: "b", 
      id: "grid-item-unread", 
      x: 6, y: 0, w: 4, h: 2,
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
      instructor={instructor}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 4, h: 2,
      content: 
      <div>
        <WeatherForecast bookings={bookings}/>
      </div>
    },
    { i: "f", 
      id: "grid-item-lastrow1", 
      x: 4, y: 6, w: 4, h: 2,
      content: 
      <div>
        A QUOTE JUST FOR You
        <p>Believe you can and you're halfway there.</p>
      </div>
    },
  ]);




  const [layout3, setLayout3] = useState([
    {
      i: "ab",
      id: "grid-item-hello-user",
      x: 0,
      y: 0,
      w: 8,
      h: 1,
      content: 
<div className="greet" style={{ textAlign: 'left' }}>
  <h2>Welcome back, {instructorName} <PiHandWavingDuotone /></h2>
  <p>Your profile is {updatedCompleteness}% complete</p> 
  {/* <br/> */}
  <p>Task List:</p>
  {updatedCompleteness < 100 ? (
    <ul>
      {missingPoints.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  ) : (
    "  -"
  )}
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
      x: 0, y: 5, w: 8, h: 2,
      content:
      <div>
      <Graph 
      bookings={bookings}
      instructor={instructor}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 8, w: 8, h: 1,
      content: 
      <div>
        <WeatherForecast bookings={bookings}/>
      </div>
    },
    { i: "f", 
    id: "grid-item-lastrow1", 
    x: 0, y: 9, w: 8, h: 1,
    content: 
    <div>
      A QUOTE JUST FOR You
      <p>Work is the greatest thing in the world, so we should always save some of it for tomorrow.</p>
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

  const layoutToUse = isReallySmallScreen ? layout3 : isSmallScreen ? layout2 : layout;
  

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
  {layoutToUse.map((item) => (
    <div key={item.i} data-grid={item} className={`block ${item.i}`}>
      {item.content} {/* Render the content for each grid item */}
    </div>
  ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

export default InstructorMainContent;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}