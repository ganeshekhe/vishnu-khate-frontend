// // import React from "react";

// // const Shipping = () => {
// //   return (
// //     <div className="max-w-4xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
// //       <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
// //         Shipping Policy
// //       </h1>

// //       <p className="mb-4 text-gray-700">
// //         Thank you for choosing our digital services. Please note that we do not
// //         deal with physical products. Therefore,{" "}
// //         <strong>no shipping of goods is applicable</strong> for our services.
// //       </p>

// //       <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
// //         Digital Delivery
// //       </h2>
// //       <p className="mb-4 text-gray-700">
// //         Once your payment is successfully completed, access to the digital
// //         service/product will be provided instantly to your registered account or
// //         email address.
// //       </p>

// //       <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
// //         Service Issues
// //       </h2>
// //       <p className="mb-4 text-gray-700">
// //         In case of any issues related to service activation or digital delivery,
// //         please contact us immediately via the{" "}
// //         <a
// //           href="/contact-us"
// //           className="text-blue-600 hover:underline font-medium"
// //         >
// //           Contact Us
// //         </a>{" "}
// //         page. Our support team will resolve your concerns at the earliest.
// //       </p>

// //       <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
// //         Contact Information
// //       </h2>
// //       <p className="mb-4 text-gray-700">
// //         For any queries related to this Shipping Policy, please contact us at:  
// //         <br />
// //         Email: support@yourdomain.com  
// //         <br />
// //         Phone: +91-9876543210
// //       </p>

// //       <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
// //         Important Note
// //       </h2>
// //       <p className="mb-4 text-gray-700">
// //         Since this is a <strong>digital service</strong>, shipping timelines,
// //         courier partners, and physical delivery terms are{" "}
// //         <strong>not applicable</strong>.
// //       </p>

// //       <p className="mt-8 text-gray-600 italic text-center">
// //         Last updated on {new Date().toLocaleDateString()}
// //       </p>
// //     </div>
// //   );
// // };

// // export default Shipping;


// import React from "react";
// import { Mail, Phone } from "lucide-react";
// import { Link } from "react-router-dom";

// const Shipping = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-center items-start py-16 px-4">
//       <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
//         <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
//           Shipping Policy
//         </h1>

//         <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//           Thank you for choosing our digital services. Please note that we do not
//           deal with physical products. Therefore, <strong>no shipping of goods is applicable</strong> for our services.
//         </p>

//         <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Digital Delivery</h2>
//         <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//           Once your payment is successfully completed, access to the digital service/product will be provided instantly to your registered account or email address.
//         </p>

//         <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Service Issues</h2>
//         <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//           In case of any issues related to service activation or digital delivery,
//           please contact us immediately via the{" "}
//           <Link to="/contact-us" className="text-indigo-600 hover:underline font-medium">
//             Contact Us
//           </Link>{" "}
//           page. Our support team will resolve your concerns at the earliest.
//         </p>

//         <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Contact Information</h2>
//         <p className="mb-6 text-gray-700 text-lg leading-relaxed flex flex-col gap-2">
//           <span className="flex items-center gap-2"><Mail className="text-indigo-600" /> support@yourdomain.com</span>
//           <span className="flex items-center gap-2"><Phone className="text-indigo-600" /> +91-9876543210</span>
//         </p>

//         <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Important Note</h2>
//         <p className="mb-6 text-gray-700 text-lg leading-relaxed">
//           Since this is a <strong>digital service</strong>, shipping timelines,
//           courier partners, and physical delivery terms are <strong>not applicable</strong>.
//         </p>

//         <div className="mt-10 text-center">
//           <p className="text-gray-400 italic mb-4">Last updated on {new Date().toLocaleDateString()}</p>
//           <Link
//             to="/contact-us"
//             className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
//           >
//             Contact Support
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shipping;
import React from "react";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-center items-start py-16 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
          Shipping Policy
        </h1>

        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          Thank you for choosing our digital services. Please note that we do not
          deal with physical products. Therefore, <strong>no shipping of goods is applicable</strong> for our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Digital Delivery</h2>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          Once your payment is successfully completed, access to the digital service/product will be provided instantly to your registered account or email address.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Service Issues</h2>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          In case of any issues related to service activation or digital delivery,
          please contact us immediately via the{" "}
          <Link to="/contact-us" className="text-indigo-600 hover:underline font-medium">
            Contact Us
          </Link>{" "}
          page. Our support team will resolve your concerns at the earliest.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Contact Information</h2>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed flex flex-col gap-2">
          <span className="flex items-center gap-2"><Mail className="text-indigo-600" /> support@yourdomain.com</span>
          <span className="flex items-center gap-2"><Phone className="text-indigo-600" /> +91-9876543210</span>
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Important Note</h2>
        <p className="mb-6 text-gray-700 text-lg leading-relaxed">
          Since this is a <strong>digital service</strong>, shipping timelines,
          courier partners, and physical delivery terms are <strong>not applicable</strong>.
        </p>

        <div className="mt-10 text-center">
          <p className="text-gray-400 italic mb-4">Last updated on {new Date().toLocaleDateString()}</p>
          <Link
            to="/contact-us"
            className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
