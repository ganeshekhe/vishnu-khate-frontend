import React from 'react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-gray-500">
        <h1 className="text-4xl font-extrabold text-gray-700 mb-6">Shipping / Delivery Policy</h1>
        <p className="text-lg text-gray-700 mb-4">
          Our services are fully digital. Hall Tickets, Form Copies, and Certificates are delivered
          electronically through the user portal or email.
        </p>
        <p className="text-lg text-gray-700">
          No physical delivery is provided. This page is only for Razorpay verification purposes.
        </p>
      </div>
    </div>
  );
};

export default Shipping;
