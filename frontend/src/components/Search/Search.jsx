import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = ({ setSearchResults }) => {
  const url = "http://localhost:8080";
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`${url}/api/v1/event/search`, {
        params: { query: searchTerm },
      });
      
      if (response.data.success) {
        setSearchResults(response.data.events);
        console.log(response.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  return (
    <div className='search-bar'>
      <h1>Search our Event</h1>
      <p className='search-bar-text'>Find events by various criteria.</p>
      <form className='form' onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Search by title, description, location, date, or time...'
          className='search'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>
      <hr/>
    </div>
  );
};

export default Search;
