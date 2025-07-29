import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bus, passengers } = state || {};

  const [bank, setBank] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1);

  const seatPrice = 900;
  const total = passengers.length * seatPrice;

  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  const banks = [
    'CBE (Commercial Bank of Ethiopia)',
    'Awash Bank',
    'Bank of Abyssinia',
    'Telebirr',
    'Dashen Bank',
    'Abay Bank',
    'Wegagen Bank',
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bank || !phone || !verificationCode) {
      return alert('Please complete all fields.');
    }

    try {
      const payload = {
        userId,
        busId: bus.id,
        passengers,
        bank,
        phone,
        verificationCode,
        totalAmount: total,
      };

      console.log('Sending payment payload:', payload);

      const res = await fetch('http://localhost:3001/api/bookings/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert(' Payment successful!');
        setTimeout(() => {
          navigate('/my-bookings', { state: { paymentSuccess: true } });
        }, 1000);
      } else {
        alert(result.error || result.message || 'Payment failed. Try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Server error.');
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!bank || !phone) {
      return alert('Please enter bank and phone number.');
    }
    if (!/^09\d{8}$/.test(phone)) {
      return alert('Invalid Ethiopian phone number. Must start with 09 and be 10 digits.');
    }
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment</h2>

      <form
        onSubmit={step === 1 ? handleNext : handleSubmit}
        className="max-w-md mx-auto bg-white text-black p-6 rounded shadow"
      >
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-blue-700"></h3>
          <ul className="list-disc ml-5 mb-2">
            {passengers.map((p, i) => (
              <li key={i}>
                Passenger {i + 1}: {p.name} – Seat: {p.seatNumber}
              </li>
            ))}
          </ul>
          <p>
            Price per Seat: <strong>{seatPrice} ETB</strong>
          </p>
          <p>
            Total Amount: <strong className="text-green-600">{total} ETB</strong>
          </p>
        </div>
        
        {step === 1 && (
          <>
            <label className="block mb-2 font-medium">Select Bank</label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            >
              <option value="">-- Choose Bank --</option>
              {banks.map((b, i) => (
                <option key={i} value={b}>{b}</option>
              ))}
            </select>

            <label className="block mb-2 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder=""
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Next: Verify
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-4 text-green-700 font-semibold">
              A verification code has been sent to {phone}.
            </p>

            <label className="block mb-2 font-medium">Enter Verification Code</label>
            <input
              type="text"
              placeholder="Enter code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Confirm Payment
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Payment;
