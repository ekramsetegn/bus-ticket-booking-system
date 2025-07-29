import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen w-full flex overflow-y-auto bg-gray-100 relative overflow-x-auto">
      <AdminSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ${isOpen ? 'md:ml-64' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
