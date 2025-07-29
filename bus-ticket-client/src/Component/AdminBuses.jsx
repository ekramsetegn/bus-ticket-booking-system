import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const AdminBuses = () => {
  const [buses, setBuses] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  const fetchBuses = () => {
    fetch('http://localhost:3001/api/buses')
      .then((res) => res.json())
      .then((data) => setBuses(data))
      .catch((err) => console.error('Error fetching buses:', err));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bus?')) return;
    try {
      const res = await fetch(`http://localhost:3001/api/buses/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchBuses();
      } else {
        alert(data.error || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (bus) => {
    setEditingBus(bus.id);
    setEditForm(bus);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/buses/${editingBus}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Bus updated!');
        setEditingBus(null);
        fetchBuses();
      } else {
        alert(data.error || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
     <div className="flex">
    <AdminLayout>
        <main className="ml-40 min-h-screen w-full p-6 bg-gray-100 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">All Buses</h1>

   
      <div className="overflow-x-auto">
        <p className="text-sm text-gray-600 mb-2 sm:hidden text-center">
  Swipe left or right to see more 
</p>
  <table className="w-full min-w-[700px] text-sm border-collapse bg-white text-black rounded-xl overflow-hidden shadow-md">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-2 whitespace-nowrap text-left">Bus No</th>
        <th className="p-2 whitespace-nowrap text-left">From</th>
        <th className="p-2 whitespace-nowrap text-left">To</th>
        <th className="p-2 whitespace-nowrap text-left">Date</th>
        <th className="p-2 whitespace-nowrap text-left">Time</th>
        <th className="p-2 whitespace-nowrap text-left">Seats</th>
        <th className="p-2 whitespace-nowrap text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      {buses.map((bus) =>
        editingBus === bus.id ? (
          <tr key={bus.id}>
            {['number', 'origin', 'destination', 'date', 'time', 'seats'].map((field) => (
              <td key={field} className="p-2">
                <input
                  className="w-full px-2 py-1 border rounded text-sm"
                  name={field}
                  value={editForm[field] || ''}
                  onChange={handleEditChange}
                />
              </td>
            ))}
            <td className="p-2 whitespace-nowrap">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-2 py-1 mb-1 rounded hover:bg-green-700 mr-1"
              >
                Save
              </button>
              <button
                onClick={() => setEditingBus(null)}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </td>
          </tr>
        ) : (
          <tr key={bus.id} className="border-t">
            <td className="p-2 whitespace-nowrap">{bus.number}</td>
            <td className="p-2 whitespace-nowrap">{bus.origin}</td>
            <td className="p-2 whitespace-nowrap">{bus.destination}</td>
            <td className="p-2 whitespace-nowrap">{bus.date}</td>
            <td className="p-2 whitespace-nowrap">{bus.time}</td>
            <td className="p-2 whitespace-nowrap">{bus.seats}</td>
            <td className="p-2 whitespace-nowrap">
              <button
                onClick={() => handleEdit(bus)}
                className="bg-yellow-500 text-black px-3 py-1 mb-1 rounded hover:bg-yellow-400 mr-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(bus.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
</div>

       </main>
    </AdminLayout>
   
    </div>
  );
};

export default AdminBuses;
