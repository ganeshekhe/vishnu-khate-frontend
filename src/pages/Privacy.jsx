// import React from "react";

// const Privacy = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
//       <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
//         <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
//         <p className="text-gray-700 text-lg mb-4">
//           We respect your privacy. Your personal information is used only for providing digital services 
//           and will not be shared with third parties.
//         </p>
//         <p className="text-gray-700 text-lg mb-4">
//           We may collect minimal information required for service delivery such as your email, name, and transaction details.
//         </p>
//         <p className="text-gray-500 text-sm mt-6">
//           Last updated: 14 September 2025
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Privacy;
import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-center items-start py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-wide">
          Privacy Policy
        </h1>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          We respect your privacy. Your personal information is used only for providing digital services 
          and will not be shared with third parties.
        </p>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          We may collect minimal information required for service delivery such as your email, name, and transaction details.
        </p>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          All your data is securely stored and handled with utmost care in accordance with applicable laws.
        </p>
        <p className="text-gray-400 text-sm mt-8 text-right">
          Last updated: 14 September 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
