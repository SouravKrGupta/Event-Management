import React, { useState, useEffect } from "react";
import "./Feedback.css";
import axios from "axios";

const Feedback = ({ userId, eventId }) => {
  const url = "http://localhost:8080";
  const [formData, setFormData] = useState({
    description: "",
    rating: "",
    userId: userId,
    eventId: eventId,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userId: userId,
      eventId: eventId,
    }));
  }, [userId, eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/v1/feedback/add`, formData);
      if (response.data.success) {
        setFormData({
          description: "",
          rating: "",
          userId: userId,
          eventId: eventId,
        });
        console.log("Feedback submitted successfully.");
      }
    } catch (error) {
      console.error("There was an error submitting the feedback!", error);
    }
  };

  return (
    <div className="feedb-container">
      <h2>Feedback Form</h2>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Feedback:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
