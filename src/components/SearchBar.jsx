import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SearchBar = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchAllVenues = async () => {
      let allVenues = [];
      let page = 1;
      let fetchMore = true;

      while (fetchMore) {
        try {
          const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues?limit=100&page=${page}`);
          const result = await response.json();
          console.log('Fetched data:', result);

          if (Array.isArray(result.data)) {
            allVenues = allVenues.concat(result.data);

            if (result.data.length < 100) {
              fetchMore = false; 
            } else {
              page+= 1;
            }
          } else {
            console.error('Data is not an array:', result.data);
            fetchMore = false; 
          }
        } catch (error) {
          console.error('Error fetching venues:', error);
          fetchMore = false; 
        }
      }

      setVenues(allVenues);
      setFilteredVenues(allVenues);
    };

    fetchAllVenues();
  }, []);

  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(input.toLowerCase())
    );
    console.log('Filtered venues:', filtered);
    setFilteredVenues(filtered);
  };

  return (
    <div className="relative top-0 w-full bg-purple-900 p-4 z-10">
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded px-4 py-2"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {searchInput && (
        <div className="absolute left-0 right-0 top-full bg-purple-900  z-20 max-h-60 overflow-y-auto">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <Link key={venue.id} to={`/SpecificVenue/${venue.id}`}>
                <div className="bg-white p-4 rounded mb-2 overflow-hidden">
                  <h2 className="text-xl font-bold">{venue.name}</h2>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {venue.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
