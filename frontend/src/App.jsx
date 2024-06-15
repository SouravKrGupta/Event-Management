import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Login from "./components/LoginPop/Login";
import Footer from "./components/Footer/Footer";
import Ticket from './pages/Ticket/Ticket'
import Event from "./pages/Event/Event";
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/event' element={<Event/>}/>
        </Routes>
       
      </div>
      <Footer />
    </>
  );
};

export default App;
