import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import EventItem from "../EventItem/EventItem";
import './EventDisplay.css'

const EventDisplay = ({ category, searchResults }) => {
  const { event_cart_list } = useContext(StoreContext);
  const eventsToDisplay = searchResults.length > 0 ? searchResults : event_cart_list;

  return (
    <div className="event-display" id="event-display">
      <h2>Top Event </h2>
      <div className="event-display-list">
        {eventsToDisplay.map((item, index) => {
          if (category === 'All' || category === item.category) {
            return (
              <EventItem
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                date={item.date}
                time={item.time}
                location={item.location}
                ticketPrice={item.price}
                privacy={item.privacy}
                category={item.category}
              />
            );
          }
        })}
      </div>
      <hr />
    </div>
  );
};

export default EventDisplay;
