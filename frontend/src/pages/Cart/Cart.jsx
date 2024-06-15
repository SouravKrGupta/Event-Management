import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import Feedback from "../Feedback/Feedback";

const Cart = () => {
  const { user } = useContext(StoreContext);
  const url = "http://localhost:8080";
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const fetchEventById = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/event/get/${id}`);
      setEvent(response.data.event);
    } catch (error) {
      console.error("Error fetching event list:", error.message);
    }
  };

  useEffect(() => {
    fetchEventById();

    const savedFormData = localStorage.getItem("cartFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setFormData((prevData) => ({
        ...prevData,
        fullName: parsedData.fullName || "",
        email: parsedData.email || "",
      }));
    }

    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        await axios.put(`${url}/api/v1/user/update/${user.id}`, formData);
      } else {
        alert("User is not logged in.");
        return;
      }
      await axios.post(`${url}/api/v1/ticket/add`, {
        UserId: user.id,
        EventId: id,
        Type: "type",
        Price: event.price,
        DateTime: event.date,
        Status: "status",
      });
      await axios.post(`${url}/api/v1/attendee/add`, {
        UserId: user.id,
        EventId: id,
      });
      navigate("/ticket"); // Navigate to the ticket page
    } catch (error) {
      console.error("Error processing order:", error.message);
      alert("Error processing order. Please try again.");
    }
  };

  return (
    <div>
      <form className="place-order" onSubmit={handleSubmit}>
        <div className="place-order-left">
          <p className="title">Registration Information</p>
          <div className="mult-fields">
            <input
              required
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              disabled={user ? true : false}
            />
          </div>
          <input
            required
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            disabled={user ? true : false}
          />
          <input
            required
            name="street"
            type="text"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <div className="mult-fields">
            <input
              required
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              required
              name="state"
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="mult-fields">
            <input
              required
              name="zipcode"
              type="text"
              placeholder="Zip Code"
              value={formData.zipcode}
              onChange={handleChange}
            />
            <input
              required
              name="country"
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="place-order-right">
          <div className="cart-totals">
            <p>Event Details</p>
          </div>
          <div className="cart-total-details">
            {event && (
              <>
                <img
                  src={`${url}/image/${event.image}`}
                  alt={event.title}
                  className="cart-event-image"
                />
                <h2>{event.title}</h2>
                <p>
                  Date: {event.date} at {event.time}
                </p>
                <p>{event.location}</p>
                <p>{event.description}</p>
                <p>Price: {event.price}</p>
                <p>Privacy: {event.privacy}</p>
              </>
            )}
          </div>
          <hr />
          <button type="submit">
            PROCEED TO TICKET
          </button>
        </div>
      </form>
     <Feedback userId={user?.id} eventId={event?.id} />
    </div>
  );
};

export default Cart;
