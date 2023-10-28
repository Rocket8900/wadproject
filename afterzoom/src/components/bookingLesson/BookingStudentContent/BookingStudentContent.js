import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import dayjs from 'dayjs';

const styles = {
  calendarContainer: {
    position: 'fixed',
    left: '23%',
    top: '23%',
    width: '70%',
    borderRadius: '10px',
  },
};

const excludedDates = ['2023-11-01T10:00:00', '2023-11-15T14:30:00', '2023-12-05T09:00:00'];

export default function BookingStudentContent() {
  // Function to disable specific dates
  const shouldDisableDate = (date) => {
    // Convert the date to ISO format for comparison
    const isoDate = date.toISOString();

    // Check if the date is in the excludedDates array
    return excludedDates.includes(isoDate);
  };

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateTimePicker
          orientation="landscape"
          className="custom-calendar" 
          shouldDisableDate={shouldDisableDate} // Disable specific dates
          sx={styles.calendarContainer} 
        />
      </LocalizationProvider>
  );
}
