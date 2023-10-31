import * as React from 'react';
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

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

export default function CreatingLessonContent() {



  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    selectedDate: null,
    category: '',
  });

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div style={styles.container}>
      <h1>Create a Lesson</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          style={styles.inputField}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          style={styles.inputField}
        />
         <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          style={styles.inputField}
        >
          <option value="">Select a category</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
          {/* Add more categories as needed */}
        </select>

        <label htmlFor="category">Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            className="custom-calendar"
            value={formData.selectedDate}
            onChange={handleDateChange}
            sx={styles.calendarContainer}
          />
        </LocalizationProvider>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
