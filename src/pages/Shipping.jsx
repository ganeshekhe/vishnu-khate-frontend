import React from "react";

const Shipping = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Shipping Policy
      </h1>
      <p className="text-gray-600 mb-4">
        Thank you for choosing our digital services. Please note that we do not
        deal with physical products. Therefore, **no shipping of goods is
        applicable** for our services.
      </p>
      <p className="text-gray-600 mb-4">
        Once your payment is successfully completed, access to the digital
        service/product will be provided instantly to your registered account or
        email.
      </p>
      <p className="text-gray-600 mb-4">
        In case of any issues related to service activation or delivery, please
        contact us immediately via the{" "}
        <a
          href="/contact-us"
          className="text-blue-600 hover:underline font-medium"
        >
          Contact Us
        </a>{" "}
        page.
      </p>
      <p className="text-gray-600 font-semibold">
        📌 Note: Since this is a digital service, shipping timelines, courier
        partners, and physical delivery terms are not applicable.
      </p>
    </div>
  );
};

export default Shipping;
