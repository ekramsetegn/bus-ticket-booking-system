import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-1050 text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About EthioGo</h1>

        <p className="text-lg text-gray-300 mb-8 text-center">
          EthioGo is Ethiopia’s modern solution for hassle-free intercity bus booking.
          We're dedicated to making transportation easier, more accessible, and more reliable for everyone.
        </p>

        <div className="bg-white/10 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            To provide a fast, secure, and convenient platform for reserving bus tickets anywhere in Ethiopia.
            We aim to reduce queues, save time, and empower travelers.
          </p>

          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Why Choose EthioGo?</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li> Easy-to-use online booking system</li>
            <li> Secure payment and seat selection</li>
            <li> Real-time ticket and schedule updates</li>
            <li> Trusted by thousands of daily travelers</li>
          </ul>
        </div>

        <div className="mt-10 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} EthioGo — All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default About;
