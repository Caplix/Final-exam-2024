import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_OPTIONS } from '../components/Auth';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [bookingArray, setBookings] = useState([]);
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAllBookings, setShowAllBookings] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        async function fetchData() {
            try {
                // Fetch user bookings
                const bookingResponse = await axios.get(`https://v2.api.noroff.dev/holidaze/bookings?_customer=true&_venue=true`, API_OPTIONS);
                const allBookings = bookingResponse?.data.data;
                const userBookings = allBookings.filter(booking => booking.customer.email === storedUser.email);
                setBookings(userBookings);

                // Fetch user venues
                const venueResponse = await axios.get(`https://v2.api.noroff.dev/holidaze/profiles/${storedUser.name}/venues`, API_OPTIONS);
                const userVenues = venueResponse?.data.data;
                setVenues(userVenues);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        }

        if (storedUser) {
            fetchData();
        }
    }, []);

    const handleViewMore = () => {
        setShowAllBookings(true);
    };

    const handleViewLess = () => {
        setShowAllBookings(false);
    };

    const handleBecomeManager = async () => {
        if (user) {
            setIsUpdating(true);
            try {
                const response = await axios.put(`https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
                    { venueManager: true }, API_OPTIONS);

                const updatedUser = { ...user, venueManager: true };
                setUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setIsUpdating(false);
            } catch (error) {
                console.error('Error updating user:', error);
                setIsUpdating(false);
            }
        }
    };


    if (loading) {
        return <p className="text-center mt-5 text-lg">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-5 text-lg text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-4 bg-gray-100 rounded-lg shadow-md">
            {user && (
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold mb-2">Profile</h1>
                    <div className="flex items-center">
                        <img src={user.avatar.url} alt={user.avatar.alt} className="h-12 w-12 rounded-full mr-4" />
                        <div>
                            <p className="text-xl font-semibold">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    {!user.venueManager && (
                        <button
                            onClick={handleBecomeManager}
                            className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Become a Venue Manager'}
                        </button>
                    )}
                </div>
            )}
            <div>
                <h1 className="text-2xl font-semibold mb-4">Your Venues</h1>
                {venues.length === 0 ? (
                    <p className="text-lg">No venues found.</p>
                ) : (
                    <ul>
                        {venues.map(venue => (
                            <Link to={`/SpecificVenue/${venue.id}`} key={venue.id}>
                                <li className="mb-4 p-4 border bg-white rounded-lg hover:bg-gray-50 transition duration-300">
                                    <p className="text-lg font-medium">Venue Name: {venue.name}</p>
                                    <p className="text-lg">Description: {venue.description}</p>
                                    {user && user.name === venue.owner && (
                                        <div>
                                            <button onClick={() => handleEditVenue(venue.id)} className="mt-2 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                            <button onClick={() => handleDeleteVenue(venue.id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                        </div>
                                    )}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h1 className="text-2xl font-semibold mb-4">Upcoming Bookings</h1>
                {bookingArray.length === 0 ? (
                    <p className="text-lg">No upcoming bookings.</p>
                ) : (
                    <ul>
                        {bookingArray.slice(0, showAllBookings ? undefined : 2).map(booking => (
                            <li key={booking.id} className="mb-4 p-4 border bg-white rounded-lg hover:bg-gray-50 transition duration-300">
                                <p className="text-lg font-medium">Venue: {booking.venue.name}</p>
                                <p className="text-lg">Date: {new Date(booking.dateFrom).toLocaleDateString()} to {new Date(booking.dateTo).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
                {bookingArray.length> 0 && (
                    <button onClick={showAllBookings ? handleViewLess : handleViewMore} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {showAllBookings ? 'View Less' : 'View More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

