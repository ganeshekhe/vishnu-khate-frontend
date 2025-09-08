// src/pages/Privacy.jsx
import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-green-500">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">Privacy Policy</h1>
        <p className="text-lg text-gray-700 mb-4">
          User data (Name, Email, Phone, Application Details) is used solely for providing our services by <strong>Swayambhu Online Services</strong>.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          All data is securely stored and not shared with third parties. We comply with GDPR/local regulations.
        </p>
        <p className="text-lg text-gray-700 mb-2"><strong>Address:</strong> Swayambhu Online Services, Vita Road, near Rathod Petrol Pump, Tq Sonpeth, Dist Parbhani - 431516</p>
        <p className="text-lg text-gray-700 mb-1"><strong>Contact Persons:</strong></p>
        <ul className="text-lg text-gray-700 mb-2 list-disc list-inside">
          <li>Vishnu Khate - 9689992252</li>
          <li>Shubham Bhandekar - 9834883059</li>
        </ul>
        <p className="text-lg text-gray-700"><strong>Email:</strong> swayambhupvt.ltd@gmail.com</p>
      </div>
    </div>
  );
};

export default Privacy;
