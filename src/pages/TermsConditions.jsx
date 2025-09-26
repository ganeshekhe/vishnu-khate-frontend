
import React from "react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-center items-start py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-wide">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          By purchasing our digital services, you agree to our terms and conditions. 
          All services are delivered digitally and are subject to our discretion.
        </p>

        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Unauthorized sharing or redistribution of digital content is prohibited.
        </p>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          We reserve the right to update or modify these terms at any time. Continued use of our services indicates acceptance of the updated terms.
        </p>

        <p className="text-gray-400 text-sm mt-8 text-right">
          Last updated: 14 September 2025
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
