import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VenueRating from './VenueRating';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [venues, setVenues] = useState([]);
  const [currentVenueIndex, setCurrentVenueIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://v2.api.noroff.dev/holidaze/venues')
      .then(res => {
        const venuesArray = Object.values(res.data.data); 
        setVenues(venuesArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching venues:', error);
        setError(error); 
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (venues.length > 0) {
      const interval = setInterval(() => {
        setCurrentVenueIndex((prevIndex) =>
          prevIndex === venues.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [venues]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
        Error: Failed to fetch venues. Please try again later.
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">Loading...</div>;
  }

  if (venues.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">No venues available</div>;
  }

  const currentVenue = venues[currentVenueIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 py-16">
      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl font-bold">Welcome to Holidaze</h1>
        <p className="text-lg mt-2">Discover amazing venues for your next adventure</p>
      </div>
      <div className="h-80 w-full overflow-hidden relative">
        <Link to={`/SpecificVenue/${currentVenue.id}`} className="h-full w-full">
          {venues.map((venue, index) => (
            <div
              key={venue.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentVenueIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              {venue.media && venue.media.length > 0 ? (
                <img
                  src={venue.media[0].url}
                  alt={venue.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gray-700 text-white">
                  No image available
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h2 className="text-2xl font-semibold">{venue.name}</h2>
              </div>
              <div className='absolute top-4 left-4'>
                <VenueRating rating={venue.rating} />
              </div>
            </div>
          ))}
        </Link>
      </div>
      <div className="mt-4">
        <Link to={`/SpecificVenue/${currentVenue.id}`}>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Explore This Venue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
