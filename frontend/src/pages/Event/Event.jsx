import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Event = () => {
  const { user, setUser } = useContext(StoreContext);
  console.log("user",user);
  const [events, setEvents] = useState([]);
  const url = "http://localhost:8080";

  const fetchTickets = async () => {
    try {
      // if (!user) return;
      const response = await axios.get(`${url}/api/v1/attendee/get`, {
        params: { UserId: user.id },
      });
      if (response.data.success) {
        console.log(response.data);
        setEvents(response.data.data); // Ensure the response structure is correct
      }
    } catch (error) {
      console.error("Error fetching tickets:", error.response);
    }
  };

  useEffect(() => {
    if (!user) {
      const data = localStorage.getItem("user");
      if (data) {
        setUser(JSON.parse(data));
      }
    }

    fetchTickets();
  }, [user, setUser]);
console.log("events",events);
  return (
    <div className="my-orders">
      <h2>My Events</h2>
      <div className="container">
      {events && events.length > 0 ? (
          events.map((event) => (
            <div key={event?.id} className="ticket-item">
              <p>User ID: {event?.UserId}</p>
              <p>Event ID: {event?.id}</p>
              <p>Type: {event?.status}</p>
              <p>Price: {event?.price}</p>
              <p>Event: {event?.title}</p>
              <p>Location:{event?.location}</p>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Event;
