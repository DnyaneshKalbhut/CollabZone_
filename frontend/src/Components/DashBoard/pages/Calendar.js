import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calender.css";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import { getEvents, createEvent } from "../services/eventservice"; // Backend API calls

// Localization settings for Date-Fns
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  // Fetch events from backend when component loads
  useEffect(() => {
    fetchEvents();
  }, []);

  // Debugging: Check updated state
  useEffect(() => {
    console.log("Updated events state:", events);
  }, [events]);

  // Fetch events from backend and format correctly
const fetchEvents = async () => {
  try {
    const data = await getEvents(); // Fetch events from backend
    console.log("Raw events from API:", data);

    // Map EndTime -> end and fix invalid end times
    const formattedEvents = data.map(event => ({
      id: event.id,
      title: event.title,
      start: new Date(event.start), // Convert start to Date object
      end: event.EndTime === "0001-01-01T00:00:00.000Z" || !event.EndTime
        ? new Date(new Date(event.start).getTime() + 60 * 60 * 1000) // Default: 1 hour later
        : new Date(event.EndTime), // Convert EndTime to Date object
    }));

    console.log("Formatted events:", formattedEvents);
    setEvents(formattedEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};



  // Add event to database & update UI
  const handleAddEvent = async () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const eventData = {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end),
      };

      try {
        await createEvent(eventData);
        await fetchEvents(); // Ensure events are fetched before updating UI
        console.log("Events after fetch:", events);
        setNewEvent({ title: "", start: "", end: "" });
      } catch (error) {
        console.error("Error creating event:", error);
      }
    } else {
      console.log("Please fill in all fields.");
    }
  };

  return (
    <div>
      <Header />
      <Box height={120}  />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        

          {/* Event Input Form */}
          <Box display="flex" gap={2} alignItems="center" mb={3}>
            <TextField
              label="Event Title"
              variant="outlined"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              size="small"
            />
            <TextField
              type="datetime-local"
              variant="outlined"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
              size="small"
            />
            <TextField
              type="datetime-local"
              variant="outlined"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
              size="small"
            />
            <Button variant="contained" color="primary" onClick={handleAddEvent}>
              Add Event
            </Button>
          </Box>

          {/* Event Calendar */}
          <div className="calendar-container">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              defaultView="month"
            />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default CalendarComponent;
