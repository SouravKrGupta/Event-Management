import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreEvent from '../../components/ExploreEvent/ExploreEvent';
import Search from '../../components/Search/Search';
import EventDisplay from '../../components/EventDisplay/EventDisplay';
import Review from '../../components/Review/Review';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
      <Header />
      <ExploreEvent category={category} setCategory={setCategory} />
      <Search setSearchResults={setSearchResults} />
      <EventDisplay category={category} searchResults={searchResults} />
      <Review />
      
    </div>
  );
};

export default Home;
