import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="mt-8 text-white font-semibold ">
      <ul>
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
          <Link to="/CreateBooking">Create booking</Link>
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
        
        <li className='absolute bottom-10 left-10'>
          <Link to="/login">Log In</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Navbar;

