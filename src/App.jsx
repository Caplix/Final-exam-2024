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
import SpecificVenue from './Pages/SpecificVenue';
import SearchBar from './components/SearchBar';



const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <SearchBar />
          <div className="flex-grow overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Venues" element={<Venues />} />
              <Route path="/CreateBooking/:venueId" element={<CreateBooking />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/LogIn" element={<LogIn />} />
              <Route path="/SpecificVenue/:venueId" element={<SpecificVenue/>}/>
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

