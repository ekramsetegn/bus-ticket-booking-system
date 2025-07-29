import React, { useState } from 'react';
const AddBus = () => {
  const [form, setForm] = useState({
    number: '',
    origin: '',
    destination: '',
    date: '',
    time: '',
    seats: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/buses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        alert(' Bus added successfully!');
        setForm({ number: '', origin: '', destination: '', date: '', time: '', seats: '' });
      } else {
        alert(data.error || 'Failed to add bus');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Add New Bus</h1>
      <form onSubmit={handleSubmit} className="bg-white text-black p-6 rounded-xl w-full max-w-md shadow-md">
        {['number', 'origin', 'destination', 'date', 'time', 'seats'].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-medium capitalize mb-1">{field}</label>
            <input
              type={field === 'date' ? 'date' : field === 'time' ? 'time' : field === 'seats' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
        >
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBus;
