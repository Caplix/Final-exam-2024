import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_OPTIONS } from "../components/Auth";

const CreateBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { venue, startDate, endDate } = location.state || {};
    const { venueId } = useParams();
    const [guests, setGuests] = useState(1); // Default to 1 guest

    console.log('Venue ID:', venueId);
    console.log('Venue:', venue);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    if (!venue || !startDate || !endDate) {
        return <p>Invalid booking information.</p>;
    }

    const handleConfirmBooking = async () => {
        try {
            const response = await axios.post(
                'https://v2.api.noroff.dev/holidaze/bookings/',
                {
                    dateFrom: startDate,
                    dateTo: endDate,
                    guests: guests,
                    venueId: venueId,
                },
                API_OPTIONS
            );

            console.log('Booking Response:', response);

            if (response.status === 201) {
                navigate('/profile');
            } else {
                console.error('Unexpected response status:', response.status);
                // Optionally, display a user-friendly message here
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
            // Optionally, display a user-friendly message here
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 space-y-6">
            <div className="bg-slate-200 shadow-md rounded-lg overflow-hidden w-full max-w-4xl p-6">
                <h1 className="text-2xl font-semibold mb-4">Confirm Booking</h1>
                <p className="text-gray-700 mb-4">Venue: {venue.name}</p>
                <p className="text-gray-700 mb-4">Location: {venue.location.city}, {venue.location.country}</p>
                <p className="text-gray-700 mb-4">Selected Dates: {new Date(startDate).toDateString()} to {new Date(endDate).toDateString()}</p>
                <label htmlFor="guests" className="text-gray-700 mb-4">Number of Guests:</label>
                <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="mb-4 p-2 border border-gray-300 rounded-md"
                >
                    {Array.from({ length: venue.maxGuests }, (_, i) => i + 1).map(number => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
                <button 
                    className="w-28 h-10 border rounded-md text-white bg-purple-700 font-semibold hover:bg-purple-800 transition duration-300"
                    onClick={handleConfirmBooking}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default CreateBooking;



