import React from "react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms & Conditions</h1>
        <p className="text-gray-700 text-lg mb-4">
          By purchasing our digital services, you agree to our terms and conditions. 
          All services are delivered digitally and are subject to our discretion.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Unauthorized sharing or redistribution of digital content is prohibited.
        </p>
        <p className="text-gray-500 text-sm mt-6">
          Last updated: 14 September 2025
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
