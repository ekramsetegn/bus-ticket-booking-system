import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const generateSeatMap = () => {
  const seats = [];
  for (let i = 1; i <= 25; i++) {
    seats.push(`${i}A`, `${i}B`);
  }
  return seats;
};

const PassengerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bus = state?.bus;

  const [bookedSeats, setBookedSeats] = useState([]);
  const [passengerCount, setPassengerCount] = useState(0);
  const [formData, setFormData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [step, setStep] = useState(1);
  const [currentPassenger, setCurrentPassenger] = useState(0);
  const allSeats = generateSeatMap();

  useEffect(() => {
    if (bus?.id) {
      fetch(`http://localhost:3001/api/bookings/bus/${bus.id}/seats`)
        .then(res => res.json())
        .then(data => setBookedSeats(data))
        .catch(err => console.error('Failed to fetch booked seats', err));
    }
  }, [bus?.id]);

  const handlePassengerCount = () => {
    const count = parseInt(prompt('How many passengers?'), 10);
    if (isNaN(count) || count <= 0) {
      alert('Invalid number');
      return;
    }
    setPassengerCount(count);
    setFormData(Array(count).fill({ name: '', gender: '', phone: '', seatNumber: '' }));
    setSelectedSeats([]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(updated);
  };

  const handleConfirmInfo = (e) => {
    e.preventDefault();
    const allFilled = formData.every((p) => p.name && p.gender && p.phone);
    if (!allFilled) return alert('Please fill out all passenger details.');
    setStep(2); // move to seat selection
  };

  const isSeatDisabled = (seat) => {
    return bookedSeats.includes(seat) || selectedSeats.includes(seat);
  };

  const handleSeatSelect = (seat) => {
    if (isSeatDisabled(seat)) return;

    const updatedSeats = [...selectedSeats];
    const updatedFormData = [...formData];

    updatedSeats[currentPassenger] = seat;
    updatedFormData[currentPassenger].seatNumber = seat;

    setSelectedSeats(updatedSeats);
    setFormData(updatedFormData);

    
    if (currentPassenger + 1 < passengerCount) {
      setCurrentPassenger(currentPassenger + 1);
    }
  };

  const handleGoToPayment = () => {
    if (selectedSeats.length < passengerCount || selectedSeats.includes(undefined)) {
      return alert('Please select seats for all passengers.');
    }

    navigate('/payment', {
      state: {
        bus,
        passengers: formData,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Passenger Booking</h2>

      {step === 1 && (
        <>
          <button
            onClick={handlePassengerCount}
            className="bg-blue-600 px-4 py-2 rounded mb-4"
          >
            Enter Passenger Count
          </button>

          {formData.length > 0 && (
            <form onSubmit={handleConfirmInfo}>
              {formData.map((passenger, index) => (
                <div
                  key={index}
                  className="w-1/3 bg-gray-400 text-black mx-auto p-4 my-4 rounded shadow"
                >
                  <h3 className="font-semibold mb-2">Passenger {index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Name"
                    className="block w-full mb-2 p-2 border"
                    value={passenger.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    required
                  />
                  <select
                    className="block w-full mb-2 p-2 border"
                    value={passenger.gender}
                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Phone"
                    className="block w-full mb-2 p-2 border"
                    value={passenger.phone}
                    onChange={(e) => handleChange(index, 'phone', e.target.value)}
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm Info 
              </button>
            </form>
          )}
        </>
      )}
      
      {step === 2 && (
        <div>
          <h3 className="text-xl mb-2">
            Select Seat for Passenger {currentPassenger + 1}:{' '}
            <span className="font-semibold">{formData[currentPassenger].name}</span>
          </h3>

          <div className="grid grid-cols-5 gap-3 mb-6 ">
            {allSeats.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  type="button"
                  disabled={isBooked}
                  onClick={() => handleSeatSelect(seat)}
                  className={`w-20 h-10 text-xs rounded-sm font-medium text-center rounded transition duration-500 ${
                    isBooked
                      ? 'bg-red-600 text-white cursor-not-allowed'
                      : isSelected
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 hover:bg-blue-500 hover:text-white'
                  }`}
                  style={{ minWidth: '60px' }}
                >
                  {seat}
                </button>
              );
            })}
          </div>

          {selectedSeats.length === passengerCount && (
            <button
              onClick={handleGoToPayment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PassengerForm;
