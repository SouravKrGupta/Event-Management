import React, { useState, useEffect, useContext } from "react";
import "./Ticket.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Ticket = () => {
  const { user, setUser } = useContext(StoreContext);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const url = "http://localhost:8080";

  const fetchTickets = async () => {
    try {
      if (!user) return;

      const response = await axios.get(`${url}/api/v1/ticket/get`, {
        params: { UserId: user.id },
      });
      if (response.data.success) {
        setTickets(response.data.tickets);
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
console.log("ticket",tickets)
  // Calculate the data to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTickets = tickets.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="list add flex-col">
      <p>All Ticket</p>

      {currentTickets?.map((ticket) => (
        <div key={ticket?.id} className="ticket-table-format">
          <p>Event ID: {ticket?.EventId}</p>
          <p>Type: {ticket?.Type}</p>
          <p>Price: {ticket?.Price}</p>
          <p>Event: {ticket?.title}</p>
          <p>Location: {ticket?.location}</p>
          <p>Date: {ticket?.date}</p>
        </div>
      ))}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= tickets.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Ticket;
