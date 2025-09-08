// src/pages/ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-yellow-500">
        <h1 className="text-4xl font-extrabold text-yellow-600 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-2">
          Address: Swayambhu Online Services, Vita Road, near Rathod Petrol Pump, Tq Sonpeth, Dist Parbhani - 431516
        </p>
        <p className="text-lg text-gray-700 mb-1">Contact Persons:</p>
        <ul className="text-lg text-gray-700 mb-2 list-disc list-inside">
          <li>Vishnu Khate - 9689992252</li>
          <li>Shubham Bhandekar - 9834883059</li>
        </ul>
        <p className="text-lg text-gray-700 mb-1">Email: swayambhupvt.ltd@gmail.com</p>
        <p className="text-lg text-gray-700">Working Hours: Mon - Sat, 10:00 AM - 6:00 PM</p>
      </div>
    </div>
  );
};

export default ContactUs;
