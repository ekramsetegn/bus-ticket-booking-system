import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first.');
      navigate('/login-user');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.name || 'Unknown User');
    } catch {
      setUserName('Unknown User');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login-user');
    
  };

  return (
    <div className="dashboard-bg min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-indigo-900 text-white px-6">
      
     
      <div className="absolute top-6 left-6 text-lg sm:text-xl font-semibold text-black">
        Hey, <span className="text-yellow-300">{userName}</span> 
      </div>

    
      <h1 className="text-4xl font-bold mb-10 text-center">Welcome to Your Dashboard</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        <button
          className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-all"
          
          onClick={() => navigate('/buses')}

        >
          View Buses
        </button>
        <button
  onClick={() => navigate('/my-bookings')}
  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
>
  My Bookings
</button>

        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;

