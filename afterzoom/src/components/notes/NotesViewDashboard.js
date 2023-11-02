import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const NotesViewDashboard = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const token = getCookie("access_token");
                const decodedToken = jwtDecode(token).user;
                const studentId = decodedToken.id;

                const notesResponse = await axios.get(
                    `http://localhost:3001/v1/api/note/list`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setNotes(notesResponse.data.data);

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData(); 
        
    }, []); 

    const notesToAddToDashboard = notes.filter(note => note.addToDashboard);
    const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  
    const handlePrevNote = () => {
      setCurrentNoteIndex((prevIndex) => (prevIndex === 0 ? notesToAddToDashboard.length - 1 : prevIndex - 1));
    };
  
    const handleNextNote = () => {
      setCurrentNoteIndex((prevIndex) => (prevIndex === notesToAddToDashboard.length - 1 ? 0 : prevIndex + 1));
    };
  
    const currentNote = notesToAddToDashboard[currentNoteIndex];
  

  return (
    <div>
      <h2>NOTES</h2>
      {notesToAddToDashboard.length > 1 && (
        <div>
          <button onClick={handlePrevNote}>←</button>
          <span>{currentNoteIndex + 1}/{notesToAddToDashboard.length}</span>
          <button onClick={handleNextNote}>→</button>
        </div>
      )}
      {currentNote && <div dangerouslySetInnerHTML={{ __html: `<div>${currentNote.content}</div>` }} />}
    </div>
  );
};

export default NotesViewDashboard;

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}
