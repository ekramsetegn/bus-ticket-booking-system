import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-gray-200 py-8 mt-10 shadow-inner border-t border-indigo-800">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Name */}
        <div className="mb-4 md:mb-0 flex items-center space-x-2">
          <img
            src="../Images/ethiogo.png" 
            alt="EthioGo Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-xl font-semibold text-white">EthioGo</span>
        </div>

        {/* Navigation */}
        <div className="flex space-x-6 text-sm">
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          <a href="/terms" className="hover:text-yellow-400 transition">Terms</a>
          <a href="/privacy" className="hover:text-yellow-400 transition">Privacy</a>
        </div>

        
        <div className="text-xs mt-4 md:mt-0 text-center md:text-right">
          &copy; {new Date().getFullYear()} EthioGo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
