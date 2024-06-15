import React, { useState, useEffect } from "react";
import './List.css'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const List = () => {
  const url = 'http://localhost:8080';
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/event/get`);
      if (response.data.success) {
        setEvents(response.data.events);
      } else {
        toast.error("Error fetching events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Error fetching events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);
const removeEvent =async (id) =>{
  try {
    const response =await axios.post(`${url}/api/v1/event/remove/${id}`)
    if (response.data.success) {
      toast.success("Event removed successfully");
      fetchEvents(); 
    } else {
      toast.error("Error removing event");
    }
  } catch (error) {
    console.error("Error removing event:", error);
    toast.error("Error removing event");
    
  }
}
  // Calculate the data to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };
  return (
    <div className="list add flex-col">
      <p className="header">All Events</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Title</b>
          <b>Image</b>
          <b>Description</b>
          <b>Date</b>
          <b>Time</b>
          <b>Location</b>
          <b>Price</b>
          <b>Privacy</b>
          <b>Category</b>
          <b>Edit</b>
          <b>Remove</b>
        </div>
      
        {currentEvents.map((event) => (
          <div key={event.id} className="list-table-format">
            <h3>{event.title}</h3>
            <img src={`${url}/image/${event.image}`} alt={event.title} style={{ maxWidth: "200px" }} />
            <p>{event.description}</p>
            <p>Date: {formatDate(event.date)}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Price: {event.price}</p>
            <p>Privacy: {event.privacy}</p>
            <p>Category: {event.category}</p>
            <button className="edits-btn" onClick={() => handleEdit(event.id)}>Edit</button>
            <button className="remove-btn" onClick={() => removeEvent(event.id)}>X</button>
            
          </div>
          
        ))}
    
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={indexOfLastItem >= events.length}>Next</button>
      </div>
    </div>
    </div>
  );
};

export default List;
