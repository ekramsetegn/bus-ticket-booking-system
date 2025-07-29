import React, { useEffect, useState } from 'react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [busFilter, setBusFilter] = useState('');

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/bookings/all');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const busOptions = [...new Set(bookings.map((b) => b.busNumber))]; 
  
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.passenger_name?.toLowerCase().includes(search) ||
      b.phone?.includes(search) ||
      b.busNumber?.toLowerCase().includes(search) ||
      b.origin?.toLowerCase().includes(search) ||
      b.destination?.toLowerCase().includes(search);

    const matchesBus = busFilter ? b.busNumber === busFilter : true;

    return matchesSearch && matchesBus;
  });

  return (
    <div className="min-h-screen w-full p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">All Bookings</h1>

      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by passenger, phone, bus or route"
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded"
          onChange={(e) => setBusFilter(e.target.value)}
          value={busFilter}
        >
          <option value="">All Buses</option>
          {busOptions.map((bus) => (
            <option key={bus} value={bus}>
              {bus}
            </option>
          ))}
        </select>
      </div>

      
      <p className="mb-4 font-semibold">
        Total Bookings: {filteredBookings.length}
      </p>


      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white text-black shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Booking ID</th>
              <th className="p-3">Passenger</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Seat</th>
              <th className="p-3">Bus No</th>
              <th className="p-3">Route</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.id}</td>
                <td className="p-3">{b.passenger_name}</td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.seat_number}</td>
                <td className="p-3">{b.busNumber}</td>
                <td className="p-3">{b.origin} to {b.destination}</td>
                <td className="p-3">
                  {new Date(b.date).toLocaleDateString()}
                </td>
                <td className="p-3">{b.time?.substring(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
