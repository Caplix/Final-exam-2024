import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                // Assuming you have an endpoint to fetch user's bookings
                const response = await axios.get('https://v2.api.noroff.dev/holidaze/bookings');
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Error fetching bookings. Please try again later.');
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Upcoming Bookings</h1>
            {bookings.length === 0 ? (
                <p>No upcoming bookings.</p>
            ) : (
                <ul>
                    {bookings.map(booking => (
                        <li key={booking.id}>
                            <p>Venue: {booking.venueName}</p>
                            <p>Date: {new Date(booking.dateFrom).toLocaleDateString()} to {new Date(booking.dateTo).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProfilePage;


