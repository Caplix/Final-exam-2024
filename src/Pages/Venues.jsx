import React, { useEffect, useState } from "react";
import axios from "axios";
import VenueRating from "../components/VenueRating";
import { Link } from "react-router-dom";

function Venues() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://v2.api.noroff.dev/holidaze/venues")
            .then(res => {
                console.log(res.data); 
                const venuesArray = Object.values(res.data); 
                setVenues(venuesArray); 
                setLoading(false); 
            })
            .catch(error => {
                console.error(error);
                setLoading(false); 
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-6 mx-2">
          <h1 className="text-center">Venues List</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {venues[0].map(venue => (
              <li key={venue.id} className="border rounded-lg h-64">
                <Link to={`/SpecificVenue/${venue.id}`} className="block h-3/6 relative bg-white rounded-lg shadow-md overflow-hidden">
                  <img className="w-full h-full object-cover object-center transform hover:scale-110 transition duration-75 ease-in hover:cursor-pointer" src={venue?.media[0]?.url} alt="" />
                </Link>
                <div className="flex flex-col p-3">
                  <div className="flex justify-between">
                    <h1 className="font-medium text-l overflow-auto">{venue.name}</h1>
                    <p>{venue.price}$</p>
                  </div>
                </div>
                <div className="px-3 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-medium overflow-auto">{venue.location.city || "city not specified"}</h3>


                  </div>
                  <div className="flex justify-between">
                      <h3 className="font-medium">Rooms: {venue.maxGuests}</h3>
                      <VenueRating rating={venue.rating}/>

                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      
    );
}

export default Venues;
