



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
      <section className="py-12 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-700">Our Services</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Apply for various services online with ease and speed.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No services available
            </p>
          ) : (
            services.map((service) => (
              <div
                key={service._id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 group relative overflow-hidden"
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description || `Apply for ${service.name} service online.`}
                </p>

                <Link
                  to={`/application-form/${service._id}`}
                  className="mt-4 inline-block text-white bg-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
                >
                  Apply Now →
                </Link>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))
          )}
        </div>
      </div>
      {showPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full animate-fadeIn">
      <h3 className="text-xl font-bold text-red-600 mb-4">
        ⚠️ Please Login First!
      </h3>
      <p className="text-gray-700 mb-6">
        You need to login to apply for a service.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={closePopupAndRedirect}
          className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 transition transform hover:scale-105 flex-1"
        >
          Login Now
        </button>
        <button
          onClick={() => setShowPopup(false)}
          className="bg-gray-300 text-gray-800 py-2 px-5 rounded-lg hover:bg-gray-400 transition transform hover:scale-105 flex-1"
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
