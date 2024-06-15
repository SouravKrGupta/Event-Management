import React from 'react'
import './EventItem.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
const EventItem = ({id,title,image,description,date,time,location,ticketPrice,privacy}) => {
const {url}=useContext(StoreContext)
    const navigate=useNavigate();
    const handleViewEvent = () => {
      console.log(`Navigating to /cart/${id}`);
        navigate(`/cart/${id}`);
      };
          // Format the date to 'YYYY-MM-DD'
    const formattedDate = new Date(date).toISOString().slice(0, 10);

  return (
    <div className='event-item'>
 <div  className="event-item-img-container">
    <img src={`${url}/image/${image}`} alt="" className="event-item-image" />
    <h2>{title}</h2>
   
 </div>

 <div className="event-item-info">
<div className="event-item-name">

    <p>{formattedDate}</p>
    <p>{time}</p>
    
</div>
<p className='event-item-desc'>{description}</p>
<p className='event-item-location'>{location}</p>
<div className='event-item-data'>
<p className='event-item-price'>{ticketPrice}</p>
<button onClick={handleViewEvent} className='event-item-view-btn'>View Event</button>
</div>

 </div>
    </div>
  )
}

export default EventItem