import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

