import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        <p className="text-gray-700 text-lg mb-4">
          We respect your privacy. Your personal information is used only for providing digital services 
          and will not be shared with third parties.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          We may collect minimal information required for service delivery such as your email, name, and transaction details.
        </p>
        <p className="text-gray-500 text-sm mt-6">
          Last updated: 14 September 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
