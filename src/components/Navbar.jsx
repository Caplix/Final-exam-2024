import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by retrieving data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(user && user.accessToken);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear user data from localStorage on logout
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className="mt-8 text-white font-semibold ">
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <ul className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <li className='mt-4'>
          <Link to="/">Home</Link>
        </li>
        <li className='mt-4'>
          <Link to="/profile">Profile</Link>
        </li>
        <li className='mt-4'>
          <Link to="/venues">Venues</Link>
        </li>
        <li className='mt-4'>
          <Link to="/CreateVenue">Create venue</Link>
        </li>
        <li className='mt-4'>
          <Link to="/contact">Contact</Link>
        </li>
        <li className='mt-4'>
          <Link to="/about">About us</Link>
        </li>
        <li className='mt-4'>
          <Link to="/register">Register user</Link>
        </li>
        {isLoggedIn ? (
          <li className='mt-4'>
            <Link to="/logout" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <li className='mt-4'>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
