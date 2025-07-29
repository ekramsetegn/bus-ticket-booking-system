import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({ from: '', to: '', date: '' });
  const navigate = useNavigate();

  const fetchBuses = () => {
    fetch('http://localhost:3001/api/buses')
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error('Error fetching buses:', err));
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = buses.filter(bus =>
      (!filters.from || bus.origin.toLowerCase().includes(filters.from.toLowerCase())) &&
      (!filters.to || bus.destination.toLowerCase().includes(filters.to.toLowerCase())) &&
      (!filters.date || bus.date.startsWith(filters.date))
    );
    setBuses(filtered);
  };

  const handleBook = (bus) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to book.');
      return;
    }

    
    navigate('/passengers', {
      state: {
        bus: {
          ...bus,
          bookedSeats: bus.bookedSeats || [] 
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Buses</h1>

      <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          name="from"
          placeholder="From"
          onChange={handleChange}
          className="px-3 py-2 rounded text-black"
        />
        <input
          type="text"
          name="to"
          placeholder="To"
          onChange={handleChange}
          className="px-3 py-2 rounded text-black"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="px-3 py-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FaSearch />
          Search
        </button>
        <button
          type="button"
          onClick={fetchBuses}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-black rounded-xl overflow-hidden shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Bus No</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Seats</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id} className="border-t">
                <td className="p-3">{bus.number}</td>
                <td className="p-3">{bus.origin}</td>
                <td className="p-3">{bus.destination}</td>
                <td className="p-3">{bus.date}</td>
                <td className="p-3">{bus.time}</td>
                <td className="p-3">{bus.seats > 0 ? `${bus.seats} available` : 'Full'}</td>
                <td className="p-3">
                  {bus.seats > 0 ? (
                    <button
                      onClick={() => handleBook(bus)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Book
                    </button>
                  ) : (
                    <span className="text-red-500 font-semibold">Not Available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {buses.length === 0 && (
          <p className="text-center text-red-500 mt-6">No buses found.</p>
        )}
      </div>
    </div>
  );
};

export default BusList;
