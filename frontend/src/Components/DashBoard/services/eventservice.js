import axios from "axios";

const API_URL = "https://localhost:44312/api/events"; // Ensure this matches your backend URL


// Fetch events from backend
export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// Create a new event
export const createEvent = async (eventData) => {
  try {
    await axios.post(API_URL, eventData, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating event:", error);
  }
};
