import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./MainContent.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PiHandWavingDuotone} from 'react-icons/pi';
import Calendar from '../calendar/Calendar'; 
import Unread from '../unread/Unread'
import Graph from '../graph/InstruGraph'
import AlternateGraph from "../graph/InstruAlternateGraph"; 


const ResponsiveReactGridLayout = WidthProvider(Responsive);

const InstructorMainContent = ({ instructor, bookings }) => {

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
  const [showAlternateGraph, setShowAlternateGraph] = useState(false); 
  const toggleGraph = () => {
    setShowAlternateGraph((prev) => !prev);
  };
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
  <h2>Hello, {instructorName} <PiHandWavingDuotone /></h2>
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
      instructor={instructor}
      />
      </div>
    },
    { i: "e", 
      id: "grid-item-lastrow1", 
      x: 0, y: 6, w: 4, h: 2,
      content:
      <div >
        <h2>NOTES</h2>
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

export default InstructorMainContent;