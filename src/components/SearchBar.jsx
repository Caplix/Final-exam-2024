import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');
        const result = await response.json();
        console.log('Fetched data:', result); 
        if (Array.isArray(result.data)) {
          setVenues(result.data);
          setFilteredVenues(result.data); 
        } else {
          console.error('Data is not an array:', result.data);
          setVenues([]);
          setFilteredVenues([]);
        }
      } catch (error) {
        console.error('Error fetching venues:', error);
        setVenues([]);
        setFilteredVenues([]);
      }
    };

    fetchVenues();
  }, []);

 
  const handleSearchInputChange = (event) => {
    const input = event.target.value;
    setSearchInput(input);

    const filtered = venues.filter(venue =>
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
        className="w-96 rounded px-4 py-2"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {searchInput && (
        <div className="absolute left-0 right-0 top-full bg-purple-900 p-4 z-20 h-80 overflow-y-auto">
          {filteredVenues.length > 0 ? (
            filteredVenues.map((venue) => (
              <div key={venue.id} className="bg-white p-4 rounded mb-2 h-[5.5rem] overflow-hidden">
                <h2 className="text-xl font-bold">{venue.name}</h2>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">{venue.description}</p>
              </div>
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


