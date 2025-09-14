import React from "react";

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Shipping Policy
      </h1>

      <p className="mb-4 text-gray-700">
        Thank you for choosing our digital services. Please note that we do not
        deal with physical products. Therefore, <strong>no shipping of goods is applicable</strong> for our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        Digital Delivery
      </h2>
      <p className="mb-4 text-gray-700">
        Once your payment is successfully completed, access to the digital
        service/product will be provided instantly to your registered account or
        email address.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        Service Issues
      </h2>
      <p className="mb-4 text-gray-700">
        In case of any issues related to service activation or digital delivery,
        please contact us immediately via the{" "}
        <a
          href="/contact-us"
          className="text-blue-600 hover:underline font-medium"
        >
          Contact Us
        </a>{" "}
        page. Our support team will resolve your concerns at the earliest.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        Important Note
      </h2>
      <p className="mb-4 text-gray-700">
        Since this is a <strong>digital service</strong>, shipping timelines,
        courier partners, and physical delivery terms are <strong>not applicable</strong>.
      </p>

      <p className="mt-8 text-gray-600 italic text-center">
        Last updated on {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Shipping;
