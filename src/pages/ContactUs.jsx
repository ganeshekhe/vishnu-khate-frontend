import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Have questions or need assistance? Reach out to us through:
        </p>
        <ul className="text-gray-700 text-lg list-disc list-inside">
          <li>swayambhupvt.ltd@gmail.com</li>
          <li>Phone:9834883059/9689992252</li>
          <li>Swayambhu Online Services,<br />
                Vita Road, near Rathod Petrol Pump,<br />
                Tq Sonpeth, Dist Parbhani - 431516</li>
        </ul>
        <p className="text-gray-500 text-sm mt-6">
          We will respond within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
