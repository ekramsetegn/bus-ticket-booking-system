
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
const handleLogin = async (e) => {
  e.preventDefault();
  
  
  if (!email || !password) {
    setError('Both fields are required');
    return;
  }

  setError('');
  try {
    const res = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Login failed');
    } else {
      localStorage.setItem('token', data.token); 
      
      navigate('/user-dashboard');


    }
  } catch (err) {
    setError('Server error');
  }
}; 
  



 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 text-white">
      <div className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
                  <div className="flex flex-col items-center mb-6">
        <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="Admin"
            className="w-20 h-20 rounded-full shadow-md mb-4"
          />
        <h2 className="text-2xl font-bold mb-6 text-center">User Login</h2>
</div>
        <form onSubmit={handleLogin}>
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-red-600 mb-4 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-600 transition-all duration-300"
          >
          
            Log In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate('/signup-user')}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
