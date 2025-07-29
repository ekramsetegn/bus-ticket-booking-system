import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split('.')[1])).id : null;

  const fetchBookings = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/bookings/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Booking fetch error:', err);
      toast.error('Could not load bookings');
    }
  };

  useEffect(() => {
    if (!userId) {
      toast.error('Please log in to view your bookings.');
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [userId, navigate]);

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      toast.success('Booking successful!');
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const res = await fetch(`http://localhost:3001/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Booking canceled.');
        setBookings(bookings.filter((b) => b.id !== bookingId));
      } else {
        toast.error('Failed to cancel booking.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error.');
    }
  };


const handleDownloadPDF = async (booking) => {
  try {
    const {
      id,
      bookingId,
      passenger_name,
      gender,
      phone,
      seat_number,
      busNumber,
      origin,
      destination,
      date,
      time,
      booked_at,
    } = booking;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(16);
    doc.text('Bus Booking Receipt', 65, 20);

    doc.setFontSize(12);
    const yStart = 30;

    const finalBookingId = bookingId || id || 'unknown';
    const seat = seat_number || 'N/A';
    const name = passenger_name || 'N/A';
    const genderText = gender || 'N/A';
    const phoneText = phone || 'N/A';
    const from = origin || 'N/A';
    const to = destination || 'N/A';
    const busNo = busNumber || 'N/A';
    const dateText = date ? new Date(date).toLocaleDateString() : 'N/A';
    const timeText =
      typeof time === 'string' && time !== '00:00:00'
        ? time
        : new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    doc.text(`Booking ID: ${finalBookingId}`, 10, yStart);
    doc.text(`Passenger Name: ${name}`, 10, yStart + 10);
    doc.text(`Gender: ${genderText}`, 10, yStart + 20);
    doc.text(`Phone: ${phoneText}`, 10, yStart + 30);
    doc.text(`Seat Number: ${seat}`, 10, yStart + 40);

    doc.text(`Bus Number: ${busNo}`, 10, yStart + 60);
    doc.text(`Route: ${from} to ${to}`, 10, yStart + 70);
    doc.text(`Date: ${dateText}`, 10, yStart + 80);
    doc.text(`Time: ${timeText}`, 10, yStart + 90);
    doc.text(`Booked At: ${new Date(booked_at).toLocaleString()}`, 10, yStart + 100);

    //  QR Code 
    const qrText = `Booking ID: ${finalBookingId}\nPassenger: ${name}\nSeat: ${seat}\nBus: ${busNo}`;
    const qrDataUrl = await QRCode.toDataURL(qrText);

    doc.addImage(qrDataUrl, 'PNG', 140, yStart, 50, 50); 

    // Save PDF
    doc.save(`receipt-${finalBookingId}.pdf`);
  } catch (err) {
    console.error('PDF error:', err);
    alert('Could not generate PDF');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-300">No bookings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white text-black p-4 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-1">
                Bus {booking.busNumber} — {booking.origin} to {booking.destination}
              </h2>
              
   <p>
  Date: {new Date(booking.date).toLocaleDateString()}<br />
  Time: {
    new Date(`1970-01-01T${booking.time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }
</p>


              <p className="text-sm text-gray-600">
                Booked At: {new Date(booking.booked_at).toLocaleString()}
              </p>

              <div className="mt-3 border-t pt-2">
                <h3 className="font-semibold mb-1">Passenger Info:</h3>
                <p><strong>Name:</strong> {booking.passenger_name || 'N/A'}</p>
                <p><strong>Gender:</strong> {booking.gender || 'N/A'}</p>
                <p><strong>Phone:</strong> {booking.phone || 'N/A'}</p>
                <p><strong>Seat No:</strong> {booking.seat_number || 'N/A'}</p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>



<button
  onClick={() => handleDownloadPDF(booking)}
  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
>
  Download PDF
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
