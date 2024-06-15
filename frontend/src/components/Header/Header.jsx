import React from 'react'
import './Header.css'
const Header = () => {
  
    const handleViewEventClick = () => {
      document.getElementById('event-display').scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <div className='header' >
        <div className="header-contents">
            <h2>Schedule Event</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt officia libero nobis ipsam nesciunt! Iste tenetur doloribus, tempore molestias vitae saepe, itaque a minima laborum aperiam quisquam numquam, qui commodi ipsa corporis! Corporis, consequuntur nostrum?</p>
            <button onClick={handleViewEventClick}>View Event</button>
        </div>
    </div>
  )
}

export default Header