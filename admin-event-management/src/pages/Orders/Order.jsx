import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './order.css'
const Order = () => {
    const url = 'http://localhost:8080';
    const [attendees, setAttendees] = useState([]);
    
  
    const fetchAttendees = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/attendee/allget`);
        if (response.data.success) {
          setAttendees(response.data.data);
        } else {
         
        }
      } catch (error) {
        console.error("Error fetching attendees:", error);
        
      }
    };
  
    useEffect(() => {
      fetchAttendees();
    }, []);
  
    
      const removeAttendee = async (id) => {
        try {
          const response = await axios.post(`${url}/api/v1/attendee/remove/${id}`);
          if (response.data.success) {

            fetchAttendees();
          } else {

          }
        } catch (error) {
          console.error("Error removing attendee:", error);

        }
      };
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    };
  return (
    <div className="attendees-container">  
    <h2>Manage Attendees</h2>
   
    <div className="attendees-list">
      {attendees.map((attendee) => (
        <div key={attendee.Id} className="attendee-item">
          <p>User ID: {attendee.UserId}</p>
          <p>User name:{attendee.name}</p>
          <p>Event ID: {attendee.EventId}</p>
          <p>Event Name:{attendee.title}</p>
          <p>Event Location:{attendee.location}</p>
          <p>Event Date:{formatDate(attendee.date)}</p>
          <button onClick={() => removeAttendee(attendee.Id)}>Remove</button>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Order