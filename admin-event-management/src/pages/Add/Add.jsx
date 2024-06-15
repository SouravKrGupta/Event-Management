import React, { useState } from 'react';
import './Add.css';
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios';

const Add = () => {
  const url = 'http://localhost:8080';
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Birthday parties',
    price: '',
    date: '',
    time: '',
    location: '',
    privacy: 'Public' // Added privacy field with default value
  });

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
    eventData.append('privacy', formData.privacy); // Add privacy to eventData
    eventData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/v1/event/add`, eventData);
      if (response.data.success) {
        

        // Clear the form after submission
        setImage(null);
        setFormData({
          name: '',
          description: '',
          category: 'Birthday parties',
          price: '',
          date: '',
          time: '',
          location: '',
          privacy: 'Public' 
        });
        toast.success("Event added successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error creating the event!", error);
      toast.error("Error adding event");
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="add-product-name flex-col">
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
        <div className="add-product-description flex-col">
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
        <div className="add-category-price">
          <div className="add-category flex-col">
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
          <div className="add-price flex-col">
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
        <div className="add-date-time">
          <div className="add-date flex-col">
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
          <div className="add-time flex-col">
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
        <div className="add-location flex-col">
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
        <div className="add-privacy flex-col">
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
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
