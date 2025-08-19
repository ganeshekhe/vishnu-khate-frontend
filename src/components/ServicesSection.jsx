


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // context मध्ये user info आहे

const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // user context

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/services`);
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, []);


  const handleApply = (serviceId) => {
    if (!user?.token) {
      setShowPopup(true); // show login popup
    } else {
      navigate(`/application-form/${serviceId}`);
    }
  };

  const closePopupAndRedirect = () => {
    setShowPopup(false);
    navigate("/login"); // login page redirect
  };

  return (
        <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
   <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight">
            Our Services
          </h2>
          <p className="text-gray-600 mt-3 text-lg md:text-xl"></p><p className="text-lg mt-4 text-gray-300 max-w-2xl mx-auto">
            Unlock premium digital services designed to accelerate your success.
          </p>
        </div>

        {/* Services Grid */}
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg animate-pulse">No services available</p>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 group overflow-hidden">

                     {/* gradient overlay hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition duration-500"></div>
  {/* Service Title */}
                 <h3 className="text-xl font-bold text-indigo-700 mb-2 group-hover:text-purple-700 transition-colors">
                  {service.name}
                </h3>
          {/* Description */}
               <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {service.description || `Apply for ${service.name} service online.`}
                </p>
 {/* Apply Button */}
                <button
                  onClick={() => handleApply(service._id)}
                  className="relative z-10 inline-block text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now →
                </button>

                {/* Animated Bottom Border Glow */}
                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Login Popup */}
   {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
    <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all duration-500 scale-95 hover:scale-100">
      
      {/* Heading */}
      <h3 className="text-xl font-bold text-purple-700 mb-3">
        ⚠️ Please Login First!
      </h3>
      <p className="text-gray-600 mb-6 text-sm sm:text-base">
        You need to login to apply for a service.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {/* Login Now */}
        <button
          onClick={closePopupAndRedirect}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-5 rounded-lg font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex-1"
        >
          Login Now
        </button>

        {/* Cancel */}
        <button
          onClick={() => setShowPopup(false)}
          className="bg-gray-200 text-gray-800 py-2 px-5 rounded-lg font-medium hover:bg-gray-300 hover:scale-105 transition-all duration-300 flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


    </section>
  );
};

export default ServicesSection;
