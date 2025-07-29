import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
    
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin</h1>
        <p>Use the sidebar to manage buses, view users, and bookings.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
