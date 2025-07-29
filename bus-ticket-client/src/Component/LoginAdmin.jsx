import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3001/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
   
      
     
      localStorage.setItem('token', data.token);

    
      navigate('/admin/buses');
    } else {
      alert(data.error || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-400 to-black text-white">
      <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
            alt="Admin"
            className="w-20 h-20 rounded-full shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          <p className="text-sm text-gray-600 mt-1 text-center"> Only authorized admins can access this area</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-semibold">Admin Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black-100"
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black-100"
          />

          {error && (
            <p className="text-red-600 mb-4 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-black-400 to-black-800 text-white py-3 rounded-lg font-semibold hover:from-black-600 hover:to-black-900 transition-all duration-300"
          >
            Admin Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;

