import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Review.css';

const Review = () => {
  const url = "http://localhost:8080";
  const [reviews, setReviews] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/feedback/get`);
        if (response.data.success) {
          setReviews(response.data.feedback);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='review-menu' id='review'>
      <h1>Customer Reviews</h1>
      <div className='testimonial'>
        {reviews.length > 0 && (
          <div className='review'>
            <div className='review-content'>
              <p>"{reviews[activeIndex].Description}"</p>
              <p>Rating: {reviews[activeIndex].Rating}</p>
             
            </div>
          </div>
        )}
        <div className='arrow-pagination'>
          <button onClick={handlePrevClick} className='arrow-button'>{"<"}</button>
          <button onClick={handleNextClick} className='arrow-button'>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Review;
