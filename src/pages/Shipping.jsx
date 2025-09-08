// src/pages/Shipping.jsx
import React from 'react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-purple-500">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">Delivery Policy</h1>
        <p className="text-lg text-gray-700 mb-4">
          Our services are fully digital. Hall Ticket, Form Copy, and Certificates are delivered 
          electronically through the user portal or email.
        </p>
        <p className="text-lg text-gray-700">
          No physical delivery is provided.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
