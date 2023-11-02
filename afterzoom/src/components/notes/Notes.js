import React, { useState, useEffect } from 'react';
import styles from './Notes.module.css';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";

const Notes = ({ notes }) => {
  const [inputText, setInputText] = useState('');
  const [color, setColor] = useState('green');
  const token = getCookie("access_token");
  const decodedToken = jwtDecode(token).user;
  const studentId = decodedToken.id;



  const handleInputText = (e) => {
    setInputText(e.target.value);
  };

  const handleAddNote = () => {
    if (inputText.trim() !== '') {
      const formattedNote = inputText.replace(/\n/g, '<br>');
      const newNote = {
        content: formattedNote,
        color: color,
        addToDashboard: false, 
      };

      axios.post(`http://localhost:3001/v1/api/note`, newNote
      , {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Note added successfully:', response.data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
    }
  };


  
  
  const handleAddToDashboard = (id, addToDashboard) => {
    axios.patch(`http://localhost:3001/v1/api/note/${id}`, {
      addToDashboard: !addToDashboard,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('Note updated successfully:', response.data);   
      window.location.reload();   
    })
    .catch(error => {
      console.error('Error updating note:', error);
    });
  };
  
  

  const handleDeleteNote = (id) => {
    axios.delete(`http://localhost:3001/v1/api/note/${id}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Note deleted successfully:', response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error adding note:', error);
    });
  };



  return (
    <div className="container text-center">
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
              <button className="btn" onClick={handleAddNote}>
                Add Note
              </button>
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
          {Array.isArray(notes) && notes.length === 0 ? (
            <h3>No Notes</h3>
          ) : (
            notes.map((note) => (
              <div key={note.id} className={`${styles.noteContainer} ${styles[note.color]}`}>
                <div className="note-buttons">
                  {!note.addToDashboard ? (
                    <button className="add-to-dashboard" onClick={() => handleAddToDashboard(note.id, note.addToDashboard)}>
                      Add to Dashboard
                    </button>
                  ) : (
                    <button className="unadd-to-dashboard" onClick={() => handleAddToDashboard(note.id, note.addToDashboard)}>
                      Unadd to Dashboard
                    </button>
                  )}
                  <button
                    className="delete btn btn-default"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    &times;
                  </button>
                </div>
                <div
                  className="note-box alert col-12"
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

