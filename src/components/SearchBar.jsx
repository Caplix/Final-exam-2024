import React from 'react';

const SearchBar = () => {
  return (
    <div className="top-0  w-full bg-purple-900  p-4 z-10">

      <input
        type="text"
        placeholder="Search..."
        className="w-96 rounded px-4 py-2"
      />
    </div>
  );
};

export default SearchBar;
