import React, { useState, useEffect, useParams, useRef } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import './styles/styles.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    marginBottom: '10px',
    width: '70%',
    borderRadius: '10px',
  },
};

export default function CreatingLessonContent(props) {
  const { studentNames, onClosePopup } = props; 
  const formRef = useRef(null);
  const [instructor, setInstructor] = useState(null);
  const [isDateTimeSelected, setIsDateTimeSelected] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedDate: null,
    category: '',
  });
  const [instrubooking, setinstruBooking] = useState(null);



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      selectedDate: date,
    });
    setIsDateTimeSelected(true);
  };

  

    const handleSubmit = async (event) => {
      console.log('Form Data:', formData);
    
      try {
        const token = getCookie("access_token");
        const selectedStudentId = formData.category;
        let selectedId = null;

        const instrubookingResponse = await axios.get(
          `http://13.212.56.111:3001/v1/api/booking/instructor`,
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
        );

        for (let i = 0; i < instrubookingResponse.data.data.length; i++) {
          if (instrubookingResponse.data.data[i].studentId === selectedStudentId) {
              selectedId = instrubookingResponse.data.data[i].id;
              break;
          }
        }
        console.log(selectedId)

        const lessonInput = await axios.post(
          `http://13.212.56.111:3001/v1/api/lesson`,
          {
            title: formData.title,
            date: formData.selectedDate,
            description: formData.description,
            bookingId: selectedId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onClosePopup();
      } catch (error) {
        console.error(error);
      }


}
  


  return (
    <div style={styles.container}>
      <h1>Create a Lesson</h1>
      <form ref={formRef} style={styles.form}>
      <label htmlFor="category">Student:</label>
      <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          style={styles.inputField}
        >
          <option value="">Select a student</option>
          {Object.keys(studentNames).map((studentId) => (
            <option key={studentId} value={studentId}>
              {studentNames[studentId]}
            </option>
          ))}
        </select>
<br/>
<label htmlFor="category">Lesson Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <br/>

<label htmlFor="category">Lesson Description:</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          style={styles.inputField}
        />

<br/>
        <label htmlFor="Date">Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            className="custom-calendar"
            value={formData.selectedDate}
            onChange={handleDateChange}
            sx={styles.calendarContainer}
            onAccept={handleSubmit}
          />
        </LocalizationProvider>
      </form>
    </div>
  );
  
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}