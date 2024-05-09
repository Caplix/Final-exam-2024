import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Profile from './Pages/Profile';
import Venues from './Pages/Venues';
import CreateBooking from './Pages/CreateBooking';
import Register from './Pages/Register';
import LogIn from './Pages/LogIn';

import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex flex-col w-full">
          {/* SearchBar */}
          <SearchBar />

          {/* Main content */}
          <div className="flex-grow p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Venues" element={<Venues />} />
              <Route path="/CreateBooking" element={<CreateBooking />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/LogIn" element={<LogIn />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

