

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-center items-start py-16 px-4">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-10 border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 tracking-wide">
          Contact Us
        </h1>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Have questions or need assistance? Reach out to us through any of the following ways:
        </p>
        <ul className="space-y-4 text-gray-700 text-lg">
          <li className="flex items-center gap-3">
            <Mail className="text-indigo-600" /> 
            <a href="mailto:swayambhupvt.ltd@gmail.com" className="hover:text-indigo-800 font-medium">
              swayambhupvt.ltd@gmail.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="text-indigo-600" /> 
            <a href="tel:+919834883059" className="hover:text-indigo-800 font-medium">
              9834883059 / 9689992252
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="text-indigo-600 mt-1" /> 
            <span>
              Swayambhu Online Services,<br />
              Vita Road, near Rathod Petrol Pump,<br />
              Tq Sonpeth, Dist Parbhani - 431516
            </span>
          </li>
        </ul>
        <p className="text-gray-400 text-sm mt-8 text-right">
          We will respond within 24 hours
        </p>
        <div className="mt-6 flex justify-center">
          <a
            href="mailto:swayambhupvt.ltd@gmail.com"
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
