import React, { useState, useEffect } from 'react';
import './Edit.css';
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const url = 'http://localhost:8080';
  const { id } = useParams(); // Assuming you're using react-router-dom
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Birthday parties',
    price: '',
    date: '',
    time: '',
    location: '',
    privacy: 'Public'
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/event/get/${id}`);
        if (response.data.success) {
          const event = response.data.event;
          setFormData({
            name: event.title,
            description: event.description,
            category: event.category,
            price: event.price,
            date: event.date,
            time: event.time,
            location: event.location,
            privacy: event.privacy
          });
          setImage(event.image);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("There was an error fetching the event!", error);
        toast.error("Error fetching event data");
      }
    };

    fetchEvent();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    eventData.append('title', formData.name);
    eventData.append('description', formData.description);
    eventData.append('category', formData.category);
    eventData.append('price', formData.price);
    eventData.append('date', formData.date);
    eventData.append('time', formData.time);
    eventData.append('location', formData.location);
    eventData.append('privacy', formData.privacy);
    if (image instanceof File) {
      eventData.append('image', image);
    }

    try {
      const response = await axios.put(`${url}/api/v1/event/update/${id}`, eventData);
      if (response.data.success) {
        toast.success("Event updated successfully!");
        navigate('/list'); // Navigate to events list page or any other page after update
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error updating the event!", error);
      toast.error("Error updating event");
    }
  };

  return (
    <div className='edit'>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="edit-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? (typeof image === 'string' ? `${url}/image/${image}` : URL.createObjectURL(image)) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="edit-product-name flex-col">
          <p>Event name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="edit-product-description flex-col">
          <p>Event description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="edit-category-price">
          <div className="edit-category flex-col">
            <p>Event category</p>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="Birthday parties">Birthday parties</option>
              <option value="Weddings">Weddings</option>
              <option value="Anniversaries">Anniversaries</option>
              <option value="Graduation parties">Graduation parties</option>
              <option value="Conferences">Conferences</option>
              <option value="Seminars">Seminars</option>
              <option value="Workshops">Workshops</option>
              <option value="Corporate meetings">Corporate meetings</option>
            </select>
          </div>
          <div className="edit-price flex-col">
            <p>Event price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="edit-date-time">
          <div className="edit-date flex-col">
            <p>Event Date</p>
            <input
              type="date"
              name="date"
              placeholder="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-time flex-col">
            <p>Event time</p>
            <input
              type="time"
              name="time"
              placeholder="Time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="edit-location flex-col">
          <p>Location</p>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="edit-privacy flex-col">
          <p>Privacy</p>
          <select
            name="privacy"
            value={formData.privacy}
            onChange={handleInputChange}
            required
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <button type="submit" className="edit-btn">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default Edit;
