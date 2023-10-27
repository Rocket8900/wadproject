import { useState,useEffect } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks
} from "date-fns";
import "./Calendar.css";

const Calendar = ({ showDetailsHandle, bookings })=> {
  const { id: bookingId, lesson, studentId: bookingStudentId, instructorId:bookInstructorId, status } = bookings; 
  const [eventDetails, setEventDetails] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Format lessons and update events state
    if (lesson) {
      const formattedLessons = lesson.map(lesson => {
        return {
          title: lesson.title,
          date: new Date(lesson.date).toISOString()
        };
      });
      setEvents(formattedLessons);
    }
  }, [lesson]);
  
  

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    const eventsForDay = events.filter(
      (event) =>
        isSameDay(new Date(event.date), new Date(day.getFullYear(), day.getMonth(), day.getDate()))
    );
  
    const eventDetailsText = eventsForDay.map((event) => {
      const eventTitle = event.title;
      const eventDate = format(new Date(event.date), "yyyy-MM-dd");
      const eventTime = format(new Date(event.date), "HH:mm:ss");
      return `${eventTitle}<br>${eventDate}<br>${eventTime}<br>`;
    }).join('');
  
    setEventDetails(eventDetailsText || "No events for this day");
  };


  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end">
        </div>
      </div>
    );
  };
  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  };
  const renderCells = () => {
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const eventsForDay = events.filter(
          (event) =>
            isSameDay(new Date(event.date), new Date(cloneDay.getFullYear(), cloneDay.getMonth(), cloneDay.getDate()))
        );
        days.push(
          <div
            className={`col cell ${
              isSameDay(day, new Date())
                ? "today"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day.toISOString()} // Use the date string as the key
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            {eventsForDay.map((event, index) => (
              <div key={index} className="event-circle" />
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
  
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };
  

  const renderFooter = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandle("prev")}>
            prev week
          </div>
        </div>
        <div className="col col-end" onClick={() => changeWeekHandle("next")}>
          <div className="icon">next week</div>
        </div>
      </div>
    );
  };
  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
      <div className="event-details" dangerouslySetInnerHTML={{ __html: eventDetails }} /> 
    </div>
  );
};

export default Calendar;
