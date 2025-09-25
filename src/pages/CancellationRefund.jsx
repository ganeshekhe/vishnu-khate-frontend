// import React from "react";

// const CancellationRefund = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
//       <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Cancellation & Refund Policy</h1>
//         <p className="text-gray-700 text-lg mb-4">
//           Not Applicable. This is a digital service. Refunds are subject to our discretion. 
//           Please contact us for any queries regarding your purchase.
//         </p>
//         <p className="text-gray-500 text-sm mt-6">
//           Last updated: 14 September 2025
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CancellationRefund;

import React from "react";

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-center items-start py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-wide">
          Cancellation & Refund Policy
        </h1>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Not Applicable. This is a digital service. Refunds are subject to our discretion. 
          Please contact us for any queries regarding your purchase.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-gray-600 text-base">
            For any refund or cancellation queries, please reach out to our support team at 
            <span className="text-indigo-600 font-medium"> support@swayambhu.services</span>.
          </p>
        </div>
        <p className="text-gray-400 text-sm mt-10 text-right">
          Last updated: 14 September 2025
        </p>
      </div>
    </div>
  );
};

export default CancellationRefund;
