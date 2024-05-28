import React, { useState } from 'react';
import axios from 'axios';
import { API_OPTIONS } from '../components/Auth';

const CreateVenue = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        picture: '',
        guests: '',
        city: '',
        amenities: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false
        },
        price: '',
        country: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            amenities: {
                ...formData.amenities,
                [name]: checked
            }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formattedData = {
                name: formData.name,
                description: formData.description,
                media: [
                    {
                        url: formData.picture,
                        alt: ""
                    }
                ],
                price: parseInt(formData.price),
                maxGuests: parseInt(formData.guests),
                rating: 5,
                meta: {
                    wifi: formData.amenities.wifi,
                    parking: formData.amenities.parking,
                    breakfast: formData.amenities.breakfast,
                    pets: formData.amenities.pets
                },
                location: {
                    city: formData.city,
                    country: formData.country
                }
            };
    
            const response = await axios.post(
                'https://v2.api.noroff.dev/holidaze/venues',
                formattedData,
                API_OPTIONS
            );
            handleVenueAdded(response.data);
            setLoading(false);
            setError(null);
            setFormData({
                name: '',
                description: '',
                picture: '',
                guests: '',
                city: '',
                amenities: {
                    wifi: false,
                    parking: false,
                    breakfast: false,
                    pets: false
                },
                price: '',
                country: ''
            });
        } catch (error) {
            console.error('Error adding venue:', error);
            setError('Error adding venue. Please try again.');
            setLoading(false);
        }
    };

    const handleVenueAdded = (venueData) => {
        console.log("Venue added successfully:", venueData);
        // You can add further actions here, such as updating state, displaying a message, etc.
    };

    return (
        <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Add Venue</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleFormSubmit}>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Picture URL:</label>
                    <input
                        type="text"
                        name="picture"
                        value={formData.picture}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Max Guests:</label>
                    <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Amenities:</label>
                    <div>
                        <label className="inline-flex mx-2 items-center">
                            <input
                                type="checkbox"
                                name="wifi"
                                checked={formData.amenities.wifi}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">WiFi</span>
                        </label>
                        <label className="inline-flex mx-2 items-center">
                            <input
                                type="checkbox"
                                name="parking"
                                checked={formData.amenities.parking}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">Parking</span>
                        </label>
                        <label className="inline-flex mx-2 items-center">
                            <input
                                type="checkbox"
                                name="pets"
                                checked={formData.amenities.pets}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">Pets</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="breakfast"
                                checked={formData.amenities.breakfast}
                                onChange={handleCheckboxChange}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">Breakfast</span>
                        </label>
                        
                    </div>
                    
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Adding...' : 'Add Venue'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateVenue;
