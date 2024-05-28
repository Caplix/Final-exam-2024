import React, { useState, useEffect } from "react";
import axios from "axios";
import VenueRating from "../components/VenueRating";
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EditVenueModal from "../components/EditModal";


const SpecificVenue = () => {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [bookedDates, setBookedDates] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [error, setError] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        async function getVenueData() {
            try {
                const res = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true&_owner=true`);
                setVenue(res.data.data);
    
                const bookings = res.data.data.bookings;
                const booked = bookings.reduce((acc, booking) => {
                    const start = new Date(booking.dateFrom);
                    const end = new Date(booking.dateTo);
    
                    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
                        acc.push(new Date(date));
                    }
                    return acc;
                }, []);
                setBookedDates(booked);
    
                const ownerNameFromApi = res.data.data.owner.name;
                const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
                const ownerNameFromLocalStorage = userDataFromLocalStorage.name;
                setIsOwner(ownerNameFromApi === ownerNameFromLocalStorage);
            } catch (error) {
                console.error(error);
                setError(error);
            }
        }
        getVenueData();
    }, [venueId]);

    const handleEditVenue = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveVenue = async (updatedVenue) => {
        try {
            // Send updated venue data to the server
            await axios.put(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`, updatedVenue);
            // Optionally, you can update the venue state here to reflect the changes immediately
            setVenue(updatedVenue);
        } catch (error) {
            console.error(error);
        }
    };

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    if (!venue) {
        return <p>Loading...</p>;
    }

    const tileDisabled = ({ date, view }) => {
        if (view === 'month') {
            return bookedDates.some(bookedDate => 
                bookedDate.toDateString() === date.toDateString()
            );
        }
        return false;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            if (selectedDates.length === 2) {
                const [start, end] = selectedDates.sort((a, b) => a - b);
                if (date >= start && date <= end) {
                    return 'bg-blue-200'; // Apply Tailwind CSS class for highlighting
                }
            } else if (selectedDates.length === 1 && date.getTime() === selectedDates[0].getTime()) {
                // Apply Tailwind CSS class for the single selected date
                return 'bg-green-200';
            }
        }
        return null;
    };
    
    

    const handleDateChange = (date) => {
        if (selectedDates.length === 0) {
            setSelectedDates([date]);
        } else if (selectedDates.length === 1) {
            setSelectedDates([selectedDates[0], date]);
        } else {
            setSelectedDates([date]);
        }
    };

    const handleBookNow = () => {
        if (selectedDates.length !== 2) {
            alert("Please select two dates.");
            return;
        }
        const [startDate, endDate] = selectedDates.sort((a, b) => a - b);
        navigate(`/CreateBooking/${venueId}`, { state: { venue, startDate, endDate } });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4">{venue.name}</h1>
                    <p className="text-gray-700 mb-4">{venue.description}</p>
                    <p className="text-gray-700 mb-4">{venue.price}.-kr</p>
                    <div className="flex items-center justify-between mt-10 ">
                        <div>
                            <VenueRating rating={venue.rating} />
                        </div>
                        <button 
                            className="w-full md:w-1/2 h-10 border rounded-md text-white bg-purple-700 font-semibold hover:bg-purple-800 transition duration-300"
                            onClick={handleBookNow}
                        >
                            Book now
                        </button>
                        {isOwner && (
                            <button 
                                className="w-full md:w-1/2 h-10 border rounded-md text-white bg-green-500 font-semibold hover:bg-green-600 transition duration-300"
                                onClick={handleEditVenue}
                            >
                                Edit Venue
                            </button>
                        )}
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    {venue.media && venue.media.length > 0 && (
                        <img className="h-full w-full object-cover" src={venue.media[0].url} alt={venue.name} />
                    )}
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
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
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h2 className="text-xl font-semibold mb-4">           
                Available Dates</h2>
                <Calendar 
                    tileDisabled={tileDisabled}
                    tileClassName={tileClassName}
                    onClickDay={handleDateChange}
                />
                {selectedDates.length > 0 && (
                    <div className="mt-4">
                        <p>Selected Dates:</p>
                        <ul>
                            {selectedDates.map(date => (
                                <li key={date.toISOString()}>{date.toDateString()}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {showEditModal && (
                <EditVenueModal 
                    venue={venue} 
                    onClose={handleCloseEditModal} 
                    onSave={handleSaveVenue} 
                />
            )}
        </div>
    );
};

export default SpecificVenue;

