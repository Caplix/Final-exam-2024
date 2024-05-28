import React from 'react';

const About = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md mx-4 rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-full md:w-full lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">About Holidaze</h2>
        <p className="mb-4">
          Holidaze is your one-stop destination for finding the perfect holiday accommodations. Whether you're planning a relaxing beach getaway, an adventurous mountain retreat, or a cultural city escape, we've got you covered.
        </p>
        <p className="mb-4">
          Our mission is to make booking your dream vacation as easy and stress-free as possible. With our user-friendly interface, extensive search options, and secure booking process, you can trust us to handle every aspect of your trip planning.
        </p>
        <p className="mb-4">
          At Holidaze, we believe that every traveler deserves a memorable and enjoyable experience. That's why we work tirelessly to curate a diverse selection of accommodations to suit every budget, preference, and travel style.
        </p>
        <p className="mb-4">
          Thank you for choosing Holidaze for your travel needs. We look forward to helping you create unforgettable memories on your next holiday!
        </p>
      </div>
    </div>
  );
}


export default About;
