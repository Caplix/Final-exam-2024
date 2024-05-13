import React, { useEffect, useState } from "react";
import axios from "axios";
import VenueRating from "../components/VenueRating";

function Venues() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://v2.api.noroff.dev/holidaze/venues")
            .then(res => {
                console.log(res.data); // Log the data array
                const venuesArray = Object.values(res.data); // Convert object to array
                setVenues(venuesArray); // Set venues array
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(error => {
                console.error(error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="mt-6 ">
            {console.log(venues, "dette er en kommentar")}
            <h1 className="text-center">Venues List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {venues[0].map(venue => (   
                    <li key={venue.id} className="border rounded h-96">
                        <div className="h-3/6 relative bg-white rounded-lg shadow-md overflow-hidden">
                        <VenueRating rating={venue.rating}/>
                       <img className="w-full h-full object-cover object-center" src={venue?.media[0]?.url} alt="" />
                        </div>
                        <div className="flex flex-col p-3">
                        <div className="flex justify-between">
                        <h1 className="font-medium text-xl">{venue.name}</h1>

                        <p className="">{venue.price}$</p>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Venues;
