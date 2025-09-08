// src/pages/Shipping.jsx
import React from 'react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-purple-500">
        <h1 className="text-4xl font-extrabold text-purple-600 mb-6">
          Delivery & Digital Services Policy
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          All services provided through Swayambhu Online Services are fully digital. 
          After completing the application and making the payment, users will receive the following documents electronically:
        </p>

        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Hall Ticket / Admit Card</li>
          <li>Submitted Application Form Copy</li>
          <li>Certificates (if applicable)</li>
        </ul>

        <p className="text-lg text-gray-700 mb-4">
          Documents will be delivered through your registered email and user portal. 
          Please ensure that your email and mobile number are correct while submitting the application.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          No physical delivery of documents will be made. Users are requested to download and save copies for their records.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Only users whose application status is <strong>Submitted / Pending Confirmation / Confirmed</strong> will receive documents digitally.
        </p>

        <p className="text-lg text-gray-700">
          For any issues or assistance regarding digital delivery, please contact us at:
        </p>

        <div className="mt-4 text-gray-700">
          <p><strong>Address:</strong> Swayambhu Online Services, Vita Road, near Rathod Petrol Pump, Tq Sonpeth, Dist Parbhani - 431516</p>
          <p><strong>Contact:</strong> Vishnu Khate - 9689992252, Shubham Bhandekar - 9834883059</p>
          <p><strong>Email:</strong> swayambhupvt.ltd@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
