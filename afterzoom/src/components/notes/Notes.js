import React, { useState, useEffect } from 'react';
import styles from './Notes.module.css';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { motion as m } from 'framer-motion'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const card ={
  hover: {
    scale:[null, 1.1, 1.05],
    transition:{
      duration: .2,
    },
    outline: '1px solid hsl(var(--purpleish-blue))'
  },
  tap:{
    scale: .98,
  },
}

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
          <h1 className={styles.header}>Your Personal Notepad</h1>
        </div>
        <div className="col-12">
          <div className="panel panel-default">
          <Accordion className={styles.accordian}>
      <Accordion.Item eventKey="0">
        <Accordion.Header >Add New Note</Accordion.Header>
        <Accordion.Body>
        <div className="panel-body">
              <form className="form-group">
                <textarea
                  id="note-add"
                  className="form-control"
                  value={inputText}
                  placeholder="Type note here"
                  onChange={handleInputText}
                />
                <div className='customLabelParent' style={{marginTop:"2rem", marginBottom:"1rem"}}><div className='customLabel'>Select Color</div></div>
      <div className={styles.noteContainer} >
  <input 
    type="radio" 
    name='color'
    id='Green'
    value= 'Green'
  />
  <m.label 
    htmlFor="Green"
    variants={card}
    whileHover='hover'
    whileTap='tap'
    onClick={() => setColor('green')}
  >
    <div>
      <strong>Green</strong>
    </div>
  </m.label>
  
  <input 
    type="radio" 
    name='color'
    id='Red'
    value= 'Red'
  />
  <m.label 
    htmlFor="Red"
    variants={card}
    whileHover='hover'
    whileTap='tap'
    onClick={() => setColor('red')}
  >
    <div>
      <strong>Red</strong>
    </div>
  </m.label>

  <input 
    type="radio" 
    name='color'
    id='Blue'
    value='Blue'
  />

  <m.label 
    htmlFor="Blue"
    variants={card}
    whileHover='hover'
    whileTap='tap'
    onClick={() => setColor('blue')}
  >
    <div>
      <strong>Blue</strong>

    </div>
  </m.label>

  <input 
    type="radio" 
    name='color'
    id='Orange'
    value='Orange'
  />

  <m.label 
    htmlFor="Orange"
    variants={card}
    whileHover='hover'
    whileTap='tap'
    onClick={() => setColor('orange')}
  >
    <div>
      <strong>Orange</strong>

    </div>
  </m.label>

    
        </div>

              </form>
              <div className={styles.addbtn}><button  onClick={handleAddNote}>
      Add Note
    </button></div>
            </div>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>

          </div>
          <div className='styles.panel'>
          <div>
          <Container>
            <Row>
          {Array.isArray(notes) && notes.length === 0 ? (
            <h3 className={styles.miniheader}>No Notes</h3>
          ) : (
            notes.map((note) => (
              <Col lg={4} className={styles.parentContainer} key={note.id}>
              <div key={note.id} className={`${styles.notedContainer} ${styles[note.color]}`}>
                <div className={styles.noteButtons}>
                  {!note.addToDashboard ? (
                    <button className={styles.addtodashboard} onClick={() => handleAddToDashboard(note.id, note.addToDashboard)}>
                      Add to Dashboard
                    </button>
                  ) : (
                    <button className={styles.addtodashboard} onClick={() => handleAddToDashboard(note.id, note.addToDashboard)}>
                      Unadd to Dashboard
                    </button>
                  )}
                  <button
                    className={styles.delete}
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
              </Col>
            ))
            
          )}
          </Row>
          </Container>

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

