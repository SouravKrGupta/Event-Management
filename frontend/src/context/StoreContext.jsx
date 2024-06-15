import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:8080";
  const [token, setToken] = useState("");
  const [user,setUser]=useState(null);
  const [event_cart_list, setEventList] = useState([]);

  const fetchEventList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/event/get`);
      console.log('Fetched events:', response.data.events);
      setEventList(response.data.events);
    } catch (error) {
      console.error("Error fetching event list:", error.message);
      // Handle error as needed (e.g., show error message, set default state)
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchEventList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading data:", error.message);
        // Handle error as needed (e.g., show error message, set default state)
      }
    }
    loadData();
  }, []);

  const contextValue = {
    event_cart_list,
    url,
    token,
    setToken,
    user,
    setUser
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
