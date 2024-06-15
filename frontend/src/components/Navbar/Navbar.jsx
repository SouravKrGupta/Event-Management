import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { token, setToken,setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user') // Remove token from local storage
    setToken(''); 
    setUser(null);// Reset token state
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a href="#explore-menu"
          onClick={() => setMenu("event")}
          className={menu === "event" ? "active" : ""}
        >
          Discover Events
        </a>
        <a href="#review"
          onClick={() => setMenu("review")}
          className={menu === "review" ? "active" : ""}
        >
          Review
        </a>
        <a href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/ticket')}>
                <img src={assets.basket} alt="Basket" />
                <p>MyTicket</p>
              </li>
              <li onClick={()=>navigate('/event')}>
                <img src={assets.basket} alt="Basket" />
                <p>MyEvent</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
