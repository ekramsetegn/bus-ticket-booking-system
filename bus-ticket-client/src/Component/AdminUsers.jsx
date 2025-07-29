import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen w-full p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-2 text-center">Registered Users</h1>
      <p className="text-gray-600 text-center mb-6">
        Total Users: <span className="font-semibold">{users.length}</span>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full bg-white text-black shadow rounded-xl overflow-hidden table-auto">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-4 text-red-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

