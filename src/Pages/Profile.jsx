import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_OPTIONS } from '../components/Auth';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [bookingArray, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
        console.log(storedUser)

        async function fetchBookings() {
            try {
                const response = await axios.get('https://v2.api.noroff.dev/holidaze/bookings', API_OPTIONS);
                console.log('Response:', response.data); 
                const bookingArray = Object.values(response.data)
                setBookings(bookingArray); 

                setLoading(false);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                if (error.response) {
                    console.error('Data:', error.response.data);
                    console.error('Status:', error.response.status);
                    console.error('Headers:', error.response.headers);
                    setError(`Error fetching bookings: ${error.response.status} - ${error.response.data.message}`);
                } else if (error.request) {
                    console.error('Request:', error.request);
                    setError('Error fetching bookings: No response from server.');
                } else {
                    console.error('Error:', error.message);
                    setError(`Error fetching bookings: ${error.message}`);
                }
                setLoading(false);
            }
        }

        fetchBookings();
    }, []);

    if (loading) {
        return <p className="text-center mt-5 text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-5 text-lg text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            {user && (
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold mb-2">Profile</h1>
                    <p className="text-xl">Name: {user.name}</p>
                    <p className="text-xl">Email: {user.email}</p>
                </div>
            )}
            <div>
                <h1 className="text-2xl font-semibold mb-4">Upcoming Bookings</h1>
                {bookingArray.length === 0 ? (
                    <p className="text-lg">No upcoming bookings.</p>
                ) : (
                    <ul>
                        {bookingArray.map(booking => (
                            <li key={booking.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                <p className="text-lg font-medium">Venue: {booking.venueName}</p>
                                <p className="text-lg">Date: {new Date(booking.dateFrom).toLocaleDateString()} to {new Date(booking.dateTo).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;



