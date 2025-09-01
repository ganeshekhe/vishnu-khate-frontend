


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext"; // context मध्ये user info आहे

// // const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// // const ServicesSection = () => {
// //   const [services, setServices] = useState([]);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const navigate = useNavigate();
// //   const { user } = useAuth(); // user context

// //   useEffect(() => {
// //     const fetchServices = async () => {
// //       try {
// //         const res = await axios.get(`${BASE_URL}/api/services`);
// //         setServices(res.data);
// //       } catch (err) {
// //         console.error("Failed to fetch services:", err);
// //       }
// //     };
// //     fetchServices();
// //   }, []);


// //   const handleApply = (serviceId) => {
// //     if (!user?.token) {
// //       setShowPopup(true); // show login popup
// //     } else {
// //       navigate(`/application-form/${serviceId}`);
// //     }
// //   };

// //   const closePopupAndRedirect = () => {
// //     setShowPopup(false);
// //     navigate("/login"); // login page redirect
// //   };

// //   return (
// //         <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
// //    <div className="max-w-7xl mx-auto px-4">
// //         {/* Heading */}
// //         <div className="text-center mb-14">
// //           <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 tracking-tight">
// //             Our Services
// //           </h2>
// //           <p className="text-gray-600 mt-3 text-lg md:text-xl"></p><p className="text-lg mt-4 text-gray-300 max-w-2xl mx-auto">
// //             Unlock premium digital services designed to accelerate your success.
// //           </p>
// //         </div>

// //         {/* Services Grid */}
// // <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
// //           {services.length === 0 ? (
// //             <p className="col-span-full text-center text-gray-500 text-lg animate-pulse">No services available</p>
// //           ) : (
// //             services.map((service) => (
// //               <div
// //                 key={service._id}
// //                 className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 group overflow-hidden">

// //                      {/* gradient overlay hover */}
// //                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition duration-500"></div>
// //   {/* Service Title */}
// //                  <h3 className="text-xl font-bold text-indigo-700 mb-2 group-hover:text-purple-700 transition-colors">
// //                   {service.name}
// //                 </h3>
// //           {/* Description */}
// //                <p className="text-sm text-gray-600 leading-relaxed mb-4">
// //                   {service.description || `Apply for ${service.name} service online.`}
// //                 </p>
// //  {/* Apply Button */}
// //                 <button
// //                   onClick={() => handleApply(service._id)}
// //                   className="relative z-10 inline-block text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
// //                 >
// //                   Apply Now →
// //                 </button>

// //                 {/* Animated Bottom Border Glow */}
// //                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>

// //       {/* Login Popup */}
// //    {showPopup && (
// //   <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
// //     <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all duration-500 scale-95 hover:scale-100">
      
// //       {/* Heading */}
// //       <h3 className="text-xl font-bold text-purple-700 mb-3">
// //         ⚠️ Please Login First!
// //       </h3>
// //       <p className="text-gray-600 mb-6 text-sm sm:text-base">
// //         You need to login to apply for a service.
// //       </p>

// //       {/* Buttons */}
// //       <div className="flex flex-col sm:flex-row justify-center gap-4">
// //         {/* Login Now */}
// //         <button
// //           onClick={closePopupAndRedirect}
// //           className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-5 rounded-lg font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex-1"
// //         >
// //           Login Now
// //         </button>

// //         {/* Cancel */}
// //         <button
// //           onClick={() => setShowPopup(false)}
// //           className="bg-gray-200 text-gray-800 py-2 px-5 rounded-lg font-medium hover:bg-gray-300 hover:scale-105 transition-all duration-300 flex-1"
// //         >
// //           Cancel
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // )}


// //     </section>
// //   );
// // };

// // export default ServicesSection;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const ServicesSection = () => {
//   const [categories, setCategories] = useState([]);
//   const [services, setServices] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchCategories();
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     filterServices();
//   }, [services, activeCategory, searchTerm]);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/categories`);
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//     }
//   };

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/services`);
//       setServices(res.data);
//       setFilteredServices(res.data);
//     } catch (err) {
//       console.error("Failed to fetch services:", err);
//     }
//   };

//   const filterByCategory = (catId) => {
//     setActiveCategory(catId);
//   };

//   const filterServices = () => {
//     let filtered = [...services];

//     // Category filter
//     if (activeCategory !== "all") {
//       filtered = filtered.filter((s) => s.category?._id === activeCategory);
//     }

//     // Search filter
//     if (searchTerm.trim() !== "") {
//       const term = searchTerm.toLowerCase();
//       filtered = filtered.filter((s) => {
//         const serviceName = s.name.toLowerCase();
//         const categoryName = s.category?.name.toLowerCase() || "";
//         const subserviceNames = s.subservices?.map(sub => sub.name.toLowerCase()).join(" ") || "";
//         return serviceName.includes(term) || categoryName.includes(term) || subserviceNames.includes(term);
//       });
//     }

//     setFilteredServices(filtered);
//   };

//   return (
//     <section className="py-12 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h2 className="text-4xl font-bold text-purple-700">Our Services</h2>
//           <p className="text-gray-600 mt-3 text-lg">
//             Apply for various services online with ease and speed.
//           </p>

//           {/* Search Input */}
//           <input
//             type="text"
//             placeholder="Search by service, subservice or category..."
//             className="mt-4 p-2 border rounded w-full max-w-md mx-auto block"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Category Buttons */}
//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           <button
//             onClick={() => filterByCategory("all")}
//             className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
//               activeCategory === "all"
//                 ? "bg-purple-600 text-white"
//                 : "bg-white text-purple-600 border border-purple-600"
//             }`}
//           >
//             All
//           </button>
//           {categories.map((cat) => (
//             <button
//               key={cat._id}
//               onClick={() => filterByCategory(cat._id)}
//               className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
//                 activeCategory === cat._id
//                   ? "bg-purple-600 text-white"
//                   : "bg-white text-purple-600 border border-purple-600"
//               }`}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>

//         {/* Services Grid */}
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
//           {filteredServices.length === 0 ? (
//             <p className="col-span-full text-center text-gray-500 text-lg">
//               No services available
//             </p>
//           ) : (
//             filteredServices.map((service) => (
//               <div
//                 key={service._id}
//                 className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 group relative overflow-hidden"
//               >
//                 <h3 className="text-lg font-bold text-indigo-700 mb-2">
//                   {service.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3">
//                   {service.description || `Apply for ${service.name} service online.`}
//                 </p>

               

//                 <Link
//                   to={`/application-form/${service._id}`}
//                   className="mt-4 inline-block text-white bg-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
//                 >
//                   Apply Now →
//                 </Link>

//                 <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // login context

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const ServicesSection = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false); // modal state
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, activeCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/services`);
      setServices(res.data);
      setFilteredServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  const filterByCategory = (catId) => {
    setActiveCategory(catId);
  };

  const filterServices = () => {
    let filtered = [...services];

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((s) => s.category?._id === activeCategory);
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((s) => {
        const serviceName = s.name.toLowerCase();
        const categoryName = s.category?.name.toLowerCase() || "";
        const subserviceNames = s.subservices?.map(sub => sub.name.toLowerCase()).join(" ") || "";
        return serviceName.includes(term) || categoryName.includes(term) || subserviceNames.includes(term);
      });
    }

    setFilteredServices(filtered);
  };

  const handleApplyClick = (serviceId) => {
    if (!user?.token) {
      setSelectedServiceId(serviceId);
      setShowPopup(true);
    } else {
      navigate(`/application-form/${serviceId}`);
    }
  };

  const handleLoginRedirect = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <section className="py-12 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-purple-700">Our Services</h2>
          <p className="text-gray-600 mt-3 text-lg">
            Apply for various services online with ease and speed.
          </p>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by service, subservice or category..."
            className="mt-4 p-2 border rounded w-full max-w-md mx-auto block"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => filterByCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeCategory === "all"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border border-purple-600"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => filterByCategory(cat._id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat._id
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border border-purple-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {filteredServices.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No services available
            </p>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service._id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-300 group relative overflow-hidden"
              >
                <h3 className="text-lg font-bold text-indigo-700 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {service.description || `Apply for ${service.name} service online.`}
                </p>

                <button
                  onClick={() => handleApplyClick(service._id)}
                  className="mt-4 inline-block text-white bg-purple-600 px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition"
                >
                  Apply Now →
                </button>

                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all duration-300 scale-95 hover:scale-100 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-purple-700 mb-3">
              ⚠️ Please Login First!
            </h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              You need to login before applying for this service.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleLoginRedirect}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-5 rounded-lg font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex-1"
              >
                Login Now
              </button>

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
