import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectPassengers = () => {
  const [passengerCount, setPassengerCount] = useState(0);
  const [passengerForms, setPassengerForms] = useState([]);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate(); // 
  
  const handleSelectPassengerCount = () => {
    const count = parseInt(prompt('How many passengers?'), 10);

    if (isNaN(count) || count <= 0) {
      alert('Please enter a valid number.');
      return;
    }

    setPassengerCount(count);
    setPassengerForms(Array.from({ length: count }));
    setFormData(Array(count).fill({ name: '', gender: '', phone: '', seatNumber: '' }));
  };

  const handleChange = (index, field, value) => {
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setFormData(updatedData);
  };

  const handleSubmit = () => {
    console.log('Submitting booking for passengers:', formData);

    fetch('http://localhost:3000/api/bookings/multiple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passengers: formData }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Booking confirmed!');
        console.log('Server response:', data);

        
        navigate('/my-bookings');
      })
      .catch(err => {
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again.');
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book Your Seats</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSelectPassengerCount}
      >
        Book Now
      </button>

      {passengerForms.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {passengerForms.map((_, index) => (
            <div
              key={index}
              className="border p-4 my-4 rounded shadow-md bg-gray-50"
            >
              <h3 className="font-semibold mb-2">Passenger {index + 1}</h3>
              <input
                type="text"
                placeholder="Name"
                className="block w-full mb-2 p-2 border rounded"
                value={formData[index]?.name || ''}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                required
              />
              <select
                className="block w-full mb-2 p-2 border rounded"
                value={formData[index]?.gender || ''}
                onChange={(e) => handleChange(index, 'gender', e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Phone"
                className="block w-full mb-2 p-2 border rounded"
                value={formData[index]?.phone || ''}
                onChange={(e) => handleChange(index, 'phone', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Seat Number"
                className="block w-full mb-2 p-2 border rounded"
                value={formData[index]?.seatNumber || ''}
                onChange={(e) => handleChange(index, 'seatNumber', e.target.value)}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
};

export default SelectPassengers;
