import React, { useState } from 'react';
import axios from 'axios';
import { API_OPTIONS } from './Auth';

const EditVenueModal = ({ venue, onClose }) => {
    const [updatedVenue, setUpdatedVenue] = useState(venue);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdatedVenue({ ...updatedVenue, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission
      try {
        await axios.put(
          `https://v2.api.noroff.dev/holidaze/venues/${venue.id}`,
          updatedVenue,
          API_OPTIONS
        );
        onClose();
      } catch (error) {
        console.error('Error updating venue:', error);
      }
    };
  
    const handleDelete = async () => {
      if (window.confirm('Are you sure you want to delete this venue?')) {
        try {
          await axios.delete(
            `https://v2.api.noroff.dev/holidaze/venues/${venue.id}`,
            API_OPTIONS
          );
          onClose();
        } catch (error) {
          console.error('Error deleting venue:', error);
        }
      }
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
          <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <h2 className="text-lg font-semibold mb-4">Edit Venue</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedVenue.name}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={updatedVenue.description}
                onChange={handleInputChange}
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              ></textarea>
            </div>
            {/* Add other fields here */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditVenueModal;
  