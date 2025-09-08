// src/pages/TermsConditions.jsx
import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border-l-4 border-gray-500">
        <h1 className="text-4xl font-extrabold text-gray-700 mb-6">Terms & Conditions</h1>
        <p className="text-lg text-gray-600 mb-4">
          Users are responsible for providing accurate information. Operators fill forms on behalf of users. 
          We are not liable for incorrect details submitted by users.
        </p>
        <p className="text-lg text-gray-600">
          All payments are final. Service slots and fees are determined by the admin.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
