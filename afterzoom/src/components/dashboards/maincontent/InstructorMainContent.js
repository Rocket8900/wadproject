import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./InstructorMainContent.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { PiHandWavingDuotone} from 'react-icons/pi';
import Calendar from '../calendar/Calendar'; 
import Unread from '../unread/Unread'
import Graph from '../graph/InstruGraph'
import AlternateGraph from "../graph/InstruAlternateGraph"; 
import { useNavigate} from "react-router-dom";
import axios from "axios";

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

  const saveLayoutToDatabase = async (updatedLayout) => {
    try {
      const token = getCookie("access_token");
      const response = await axios.get(`http://47.128.71.161:3001/v1/api/instructor/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ layout: updatedLayout }),
      });
  
      if (response.ok) {
        console.log('Layout saved successfully.');
      } else {
        console.error('Failed to save layout.');
      }
    } catch (error) {
      console.error('Error saving layout:', error);
    }
  };

  

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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}