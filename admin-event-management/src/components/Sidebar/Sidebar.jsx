import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        
        <NavLink to="/" className="sidebar-option ">
          <img src={assets.add_icon} alt="" />
          <p>Event Add</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option ">
          <img src={assets.order_icon} alt="" />
          <p>Event List</p>
        </NavLink>
        <NavLink to="/attendee" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Attendee List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
