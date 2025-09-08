// src/pages/CancellationRefund.jsx
import React from 'react';

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl w-full border-l-4 border-blue-500">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Cancellation & Refund Policy</h1>
        <p className="text-lg text-gray-700 mb-4">
          All payments (Service Fee + Platform Fee) are <span className="font-semibold text-red-500">non-refundable</span>.
          Once the user submits the application, fees cannot be returned under any circumstances.
        </p>
        <p className="text-lg text-gray-700">
          Refunds or cancellations are only processed at the discretion of the operator/admin.
        </p>
      </div>
    </div>
  );
};

export default CancellationRefund;
