import React, { useState, useEffect } from 'react';
import "./Notes.css"
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";

const Notes = (student) => {

  const { id: studentId, selfie, name, age, email, gender, type, language, instructor, instructorId:stuInstructorId, reviews,bookings:stuBookings,chatHistory } = student;
  const [inputText, setInputText] = useState('');
  const [color, setColor] = useState('green');
  const [alert, setAlert] = useState('');
  const [notes, setNotes] = useState([]);
  const [noteAdded, setNoteAdded] = useState(false);
  const token = getCookie("access_token");
  const decodedToken = jwtDecode(token).user;

  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      const formattedNote = inputText.replace(/\n/g, '<br>');
      const newNote = {
        id: notes.length + 1,
        content: formattedNote,
        bgColor: color,
        addToDashboard: false, 
      };


      axios.post(`http://localhost:3001/v1/api/note`, {
        "content": JSON.stringify(newNote)
      }
      , {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Note added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });

      setNotes([...notes, newNote]);
      setInputText('');
      setAlert('Note Added!');
      setTimeout(() => {
        setAlert('');
      }, 1000);

  





    }
  };


  
  
  const handleAddToDashboard = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, addToDashboard: true } : note
    );
    setNotes(updatedNotes);
    setAlert('Note added to Dashboard!');
    setTimeout(() => {
      setAlert('');
    }, 1000);
  };
  
  

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setAlert('Note Deleted!');
    setTimeout(() => {
      setAlert('');
    }, 1000);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Your Personal Notepad</h1>
        </div>
        <div className="col-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <form className="form-group">
                <h3>Add New Note</h3>
                <textarea
                  id="note-add"
                  className="form-control"
                  value={inputText}
                  placeholder="Type note here"
                  onChange={handleInputText}
                />
                <label htmlFor="select-color">Select Color</label>
                <div id="select-color">
                  <input
                    className="color-radio"
                    type="radio"
                    onClick={() => setColor('green')}
                    checked={color === 'green'}
                  />{' '}
                  Green &nbsp;
                  <input
                    className="color-radio"
                    type="radio"
                    onClick={() => setColor('red')}
                    checked={color === 'red'}
                  />{' '}
                  Red &nbsp;
                  <input
                    className="color-radio"
                    type="radio"
                    onClick={() => setColor('blue')}
                    checked={color === 'blue'}
                  />{' '}
                  Blue &nbsp;
                  <input
                    className="color-radio"
                    type="radio"
                    onClick={() => setColor('orange')}
                    checked={color === 'orange'}
                  />{' '}
                  Orange &nbsp;
                </div>
              </form>
              <button className="btn btn-success" onClick={handleAddNote}>
                Add Note
              </button>
              <span className="alerts">{alert}</span>
            </div>
          </div>
          <br>
          </br>
          <br>
          </br>
          <div className='panel'>
          <h3 className="text-center">Notes</h3>
          <hr />
          <div>
          {notes.length === 0 ? (
            <h3>No Notes</h3>
          ) : (
            notes.map((note) => (
                <div key={note.id} className="note-container">
                  <div className="note-buttons">
                    <button
                      className="add-to-dashboard"
                      onClick={() => handleAddToDashboard(note.id)}
                    >
                      Add to Dashboard
                    </button>
                    <button
                      className="delete btn btn-default"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      &times;
                    </button>
                  </div>
                  <div
                    className={`${note.bgColor} note-box alert col-12`}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>



            ))
          )}

        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Notes;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

