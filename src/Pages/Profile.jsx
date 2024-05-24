import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from local storage
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    console.log('User data from local/session storage:', userData); // Debugging log
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <img 
            src={user.avatar.url } 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-2 border-gray-300" 
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

