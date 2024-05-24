import React, { useState, useEffect } from "react";
import axios from "axios";
import VenueRating from "../components/VenueRating";
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar's CSS


const SpecificVenue = () => {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getVenueData() {
            try {
                const res = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`);
                setVenue(res.data.data);

                // Process bookings to get an array of all booked dates
                const bookings = res.data.data.bookings;

                const booked = bookings.reduce((acc, booking) => {
                    const start = new Date(booking.dateFrom);
                    const end = new Date(booking.dateTo);

                    // Collect all dates within the booking range
                    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                        acc.push(new Date(date));
                    }

                    return acc;
                }, []);

                setBookedDates(booked);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }

        getVenueData();
    }, [venueId]);

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    if (!venue) {
        return <p>Loading...</p>;
    }

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            // Check if the date is in the bookedDates array
            return bookedDates.some(bookedDate => 
                bookedDate.toDateString() === date.toDateString()
            );
        }
        return false;
    };

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <div className="bg-slate-200 shadow-md rounded-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
                {venue.media && venue.media.length > 0 && (
                    <img className="h-full w-full md:w-1/2 object-cover" src={venue.media[0].url} alt={venue.name} />
                )}
                <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">{venue.name}</h1>
                        <p className="text-gry-700 mb-4">{venue.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            <VenueRating rating={venue.rating} />
                        </div>
                        <button className="w-28 h-10 border rounded-md text-white bg-purple-700 font-semibold hover:bg-purple-800 transition duration-300">
                            Book now
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-slate-200 shadow-md rounded-lg overflow-hidden w-full max-w-4xl p-6">
                <h2 className="text-xl font-semibold mb-4">Location & Amenities</h2>
                <div className="mb-4">
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-700">{venue.location.address ? venue.location.address : 'Address not available'}, {venue.location.city}, {venue.location.zip}, {venue.location.country}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Amenities</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        <li>WiFi: {venue.meta.wifi ? 'Available' : 'Not available'}</li>
                        <li>Parking: {venue.meta.parking ? 'Available' : 'Not available'}</li>
                        <li>Breakfast: {venue.meta.breakfast ? 'Available' : 'Not available'}</li>
                        <li>Pets: {venue.meta.pets ? 'Allowed' : 'Not allowed'}</li>
                    </ul>
                </div>
            </div>
            <div className="bg-slate-200 shadow-md rounded-lg overflow-hidden w-full max-w-4xl p-6">
                <h2 className="text-xl font-semibold mb-4">Available Dates</h2>
                <Calendar 
                    tileDisabled={tileDisabled}
                />
            </div>
        </div>
    );
};

export default SpecificVenue;
