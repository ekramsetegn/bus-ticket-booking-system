import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaBus,
  FaUserFriends,
  FaClipboardList,
  FaPlus,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login-admin');
  };

  const menuItems = [
    { path: '/admin/buses', icon: <FaBus />, label: 'Manage Buses' },
    { path: '/admin/add-bus', icon: <FaPlus />, label: 'Add Bus' },
    { path: '/admin/users', icon: <FaUserFriends />, label: 'View Users' },
    { path: '/admin/bookings', icon: <FaClipboardList />, label: 'View Bookings' },
  ];

  return (
    <>
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 md:right-auto md:left-4 z-50 bg-indigo-700 text-white p-2 rounded-full"
      >
        <FaBars />
      </button>

     
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 md:left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0 md:translate-x-0' : 'translate-x-full md:-translate-x-full'
        }`}
      >
        <div className="text-center text-indigo-700 font-bold text-xl py-5 border-b">
          EthioGo Admin
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-indigo-100 ${
                location.pathname === item.path ? 'bg-indigo-200 font-semibold' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 mt-4 text-red-600 hover:bg-red-100 rounded"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;

