// // // src/pages/ApplicationForm.jsx
// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useAuth } from "../context/AuthContext";

// // const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// // const ApplicationForm = () => {
// //   const { serviceId } = useParams();
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   const [services, setServices] = useState([]);
// //   const [selectedService, setSelectedService] = useState(serviceId || "");
// //   const [selectedPrice, setSelectedPrice] = useState("");
// //   const [userCaste, setUserCaste] = useState("");
// //   const [showPopup, setShowPopup] = useState(false);

// //   useEffect(() => {
// //     if (user?.token) {
// //       const headers = { Authorization: `Bearer ${user.token}` };

// //       axios
// //         .get(`${BASE_URL}/api/users/me`, { headers })
// //         .then((res) => setUserCaste(res.data.caste || "General"))
// //         .catch((err) => console.error("Error fetching user caste:", err));
// //     }
// //   }, [user]);

// //   useEffect(() => {
// //     if (user?.token && userCaste) {
// //       const headers = { Authorization: `Bearer ${user.token}` };

// //       axios
// //         .get(`${BASE_URL}/api/services`, { headers })
// //         .then((res) => {
// //           setServices(res.data);
// //           if (serviceId) handleServiceChange(serviceId, res.data, userCaste);
// //         })
// //         .catch((err) => console.error("Error fetching services:", err));
// //     }
// //   }, [user, userCaste]);

// //   const handleServiceChange = (
// //     serviceIdValue,
// //     serviceList = services,
// //     casteValue = userCaste
// //   ) => {
// //     setSelectedService(serviceIdValue);
// //     const service = serviceList.find((s) => s._id === serviceIdValue);
// //     if (service && service.fees) {
// //       const casteKey = (casteValue || "General").toUpperCase();
// //       const matchingKey = Object.keys(service.fees).find(
// //         (key) => key.toUpperCase() === casteKey
// //       );
// //       const fee = matchingKey
// //         ? service.fees[matchingKey]
// //         : service.fees["General"] || 0;
// //       setSelectedPrice(fee);
// //     } else {
// //       setSelectedPrice(0);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await axios.post(
// //         `${BASE_URL}/api/applications`,
// //         {
// //           serviceId: selectedService,
// //           userId: user.id,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${user.token}` },
// //         }
// //       );

// //       setShowPopup(true);
// //     } catch (err) {
// //       console.error("Error submitting application:", err);
// //       alert("Submission failed");
// //     }
// //   };

// //   const closePopupAndNavigate = () => {
// //     setShowPopup(false);
// //     navigate("/user/dashboard");
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
// //       <form
// //         onSubmit={handleSubmit}
// //         className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform hover:scale-[1.02] transition-transform duration-300"
// //       >
// //         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
// //           Apply for a Service
// //         </h2>

// //         <select
// //           value={selectedService}
// //           onChange={(e) => handleServiceChange(e.target.value)}
// //           className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
// //           required
// //         >
// //           <option value="">-- Select Service --</option>
// //           {services.map((service) => (
// //             <option key={service._id} value={service._id}>
// //               {service.name}
// //             </option>
// //           ))}
// //         </select>

// //         <div className="mt-4 text-lg text-gray-700">
// //           <b>Fees:</b> ₹ {selectedPrice || "0"}
// //         </div>

// //         <button
// //           type="submit"
// //           className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
// //         >
// //           Submit Application
// //         </button>
// //       </form>

// //       {showPopup && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm mx-auto animate-fadeIn">
// //             <h3 className="text-xl font-bold text-green-600 mb-4">
// //               🎉 Application Submitted Successfully!
// //             </h3>
// //             <button
// //               onClick={closePopupAndNavigate}
// //               className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
// //             >
// //               Go to Dashboard
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ApplicationForm;






// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { io } from "socket.io-client";
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// const socket = io(BASE_URL); // 👈 connect once

// const ApplicationForm = () => {
//   const { serviceId } = useParams();
// const { user } = useAuth();
//   const navigate = useNavigate();

//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(serviceId || "");
//   const [subservices, setSubservices] = useState([]);
//   const [selectedSubservice, setSelectedSubservice] = useState("");
//   const [fees, setFees] = useState({ serviceFee: 0, platformFee: 0, total: 0 });
//   const [userCaste, setUserCaste] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     if (user?.token) {
//       axios
//         .get(`${BASE_URL}/api/users/me`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         })
//         .then((res) => setUserCaste(res.data.caste || "General"))
//         .catch((err) => console.error("Error fetching user caste:", err));
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user?.token && userCaste) {
//       axios
//         .get(`${BASE_URL}/api/services`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         })
//         .then((res) => {
//           setServices(res.data);
//           if (serviceId) handleServiceChange(serviceId, res.data, userCaste);
//         })
//         .catch((err) => console.error("Error fetching services:", err));
//     }
//   }, [user, userCaste]);

//   const calculateFee = (service, casteValue = userCaste) => {
//     if (!service?.fees) return 0;
//     const casteKey = (casteValue || "General").toUpperCase();
//     const matchingKey = Object.keys(service.fees).find(
//       (key) => key.toUpperCase() === casteKey
//     );
//     return matchingKey ? service.fees[matchingKey] : service.fees.General || 0;
//   };

//   const handleServiceChange = (serviceIdValue, serviceList = services, casteValue = userCaste) => {
//     setSelectedService(serviceIdValue);
//     setSelectedSubservice("");
//     const service = serviceList.find((s) => s._id === serviceIdValue);

//     if (service) {
//       setSubservices(service.subservices || []);
//       const fee = calculateFee(service, casteValue);
//       const platformFee = service.platformFee || 0; // 👈 take from DB
//       setFees({ serviceFee: fee, platformFee, total: fee + platformFee });
//     }
//   };

//   const handleSubserviceChange = (subId) => {
//     setSelectedSubservice(subId);
//     const sub = subservices.find((s) => s._id === subId);
//     const fee = calculateFee(sub);
//     const platformFee = sub?.platformFee || 0; // 👈 take from DB
//     setFees({ serviceFee: fee, platformFee, total: fee + platformFee });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/api/applications`,
//         {
//           serviceId: selectedService,
//           subServiceId: selectedSubservice || null,
//           userId: user.id,
//         },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );

//       // 👇 Emit event for realtime update
//       socket.emit("application:new", res.data.application);

//       setShowPopup(true);
//     } catch (err) {
//       console.error("Error submitting application:", err);
//       alert("Submission failed");
//     }
//   };

//   const closePopupAndNavigate = () => {
//     setShowPopup(false);
//     navigate("/user/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Apply for a Service
//         </h2>

//         <select
//           value={selectedService}
//           onChange={(e) => handleServiceChange(e.target.value)}
//           className="border border-gray-300 rounded-lg p-3 w-full"
//           required
//         >
//           <option value="">-- Select Service --</option>
//           {services.map((service) => (
//             <option key={service._id} value={service._id}>
//               {service.name}
//             </option>
//           ))}
//         </select>

//         {subservices.length > 0 && (
//           <select
//             value={selectedSubservice}
//             onChange={(e) => handleSubserviceChange(e.target.value)}
//             className="mt-4 border border-gray-300 rounded-lg p-3 w-full"
//           >
//             <option value="">-- Select Subservice --</option>
//             {subservices.map((sub) => (
//               <option key={sub._id} value={sub._id}>
//                 {sub.name}
//               </option>
//             ))}
//           </select>
//         )}

//         <div className="mt-4 text-lg text-gray-700">
//           <b>Service Fee:</b> ₹ {fees.serviceFee}
//           <br />
//           <b>Platform Fee:</b> ₹ {fees.platformFee}
//           <br />
//           <b>Total:</b>{" "}
//           <span className="text-green-700 font-bold">₹ {fees.total}</span>
//         </div>

//         <button
//           type="submit"
//           className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg"
//         >
//           Submit Application
//         </button>
//       </form>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
//             <h3 className="text-xl font-bold text-green-600 mb-4">
//               🎉 Application Submitted Successfully!
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Your application has been submitted successfully.
//             </p>
//             <button
//               onClick={closePopupAndNavigate}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicationForm;
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { io } from "socket.io-client";
// import { createOrder, verifyPayment } from "../api/paymentApi"; // ✅ Payment API
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const socket = io(BASE_URL); // 👈 connect once

// const ApplicationForm = () => {
//   const { serviceId } = useParams();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [services, setServices] = useState([]);
//   const [selectedService, setSelectedService] = useState(serviceId || "");
//   const [subservices, setSubservices] = useState([]);
//   const [selectedSubservice, setSelectedSubservice] = useState("");
//   const [fees, setFees] = useState({ serviceFee: 0, platformFee: 0, total: 0 });
//   const [userCaste, setUserCaste] = useState("");
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     if (user?.token) {
//       axios
//         .get(`${BASE_URL}/api/users/me`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         })
//         .then((res) => setUserCaste(res.data.caste || "General"))
//         .catch((err) => console.error("Error fetching user caste:", err));
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user?.token && userCaste) {
//       axios
//         .get(`${BASE_URL}/api/services`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         })
//         .then((res) => {
//           setServices(res.data);
//           if (serviceId) handleServiceChange(serviceId, res.data, userCaste);
//         })
//         .catch((err) => console.error("Error fetching services:", err));
//     }
//   }, [user, userCaste]);

//   const calculateFee = (service, casteValue = userCaste) => {
//     if (!service?.fees) return 0;
//     const casteKey = (casteValue || "General").toUpperCase();
//     const matchingKey = Object.keys(service.fees).find(
//       (key) => key.toUpperCase() === casteKey
//     );
//     return matchingKey ? service.fees[matchingKey] : service.fees.General || 0;
//   };

//   const handleServiceChange = (serviceIdValue, serviceList = services, casteValue = userCaste) => {
//     setSelectedService(serviceIdValue);
//     setSelectedSubservice("");
//     const service = serviceList.find((s) => s._id === serviceIdValue);

//     if (service) {
//       setSubservices(service.subservices || []);
//       const fee = calculateFee(service, casteValue);
//       const platformFee = service.platformFee || 0; // 👈 from DB
//       setFees({ serviceFee: fee, platformFee, total: fee + platformFee });
//     }
//   };

//   const handleSubserviceChange = (subId) => {
//     setSelectedSubservice(subId);
//     const sub = subservices.find((s) => s._id === subId);
//     const fee = calculateFee(sub);
//     const platformFee = sub?.platformFee || 0; // 👈 from DB
//     setFees({ serviceFee: fee, platformFee, total: fee + platformFee });
//   };

//   // ✅ Application + Razorpay Payment Flow
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Step 1: Draft Application create करा
//       const res = await axios.post(
//         `${BASE_URL}/api/applications/draft`,
//         {
//           serviceId: selectedService,
//           subServiceId: selectedSubservice || null,
//           userId: user.id,
//         },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );

//       const applicationId = res.data._id;

//       // Step 2: Create Razorpay Order
//       const order = await createOrder(fees.total, applicationId);

//       // Step 3: Open Razorpay Checkout
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: order.currency,
//         order_id: order.orderId,
//         name: "Maha e-Seva Portal",
//         description: "Application Fee Payment",
//         handler: async function (response) {
//           // Step 4: Verify Payment
//           await verifyPayment(
//             applicationId,
//             response.razorpay_order_id,
//             response.razorpay_payment_id,
//             response.razorpay_signature,
//             fees.total
//           );

//           socket.emit("application:new", res.data.application);
//           setShowPopup(true);
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Error submitting application:", err);
//       alert("❌ Submission or Payment failed");
//     }
//   };

//   const closePopupAndNavigate = () => {
//     setShowPopup(false);
//     navigate("/user/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Apply for a Service
//         </h2>

//         <select
//           value={selectedService}
//           onChange={(e) => handleServiceChange(e.target.value)}
//           className="border border-gray-300 rounded-lg p-3 w-full"
//           required
//         >
//           <option value="">-- Select Service --</option>
//           {services.map((service) => (
//             <option key={service._id} value={service._id}>
//               {service.name}
//             </option>
//           ))}
//         </select>

//         {subservices.length > 0 && (
//           <select
//             value={selectedSubservice}
//             onChange={(e) => handleSubserviceChange(e.target.value)}
//             className="mt-4 border border-gray-300 rounded-lg p-3 w-full"
//           >
//             <option value="">-- Select Subservice --</option>
//             {subservices.map((sub) => (
//               <option key={sub._id} value={sub._id}>
//                 {sub.name}
//               </option>
//             ))}
//           </select>
//         )}

//         <div className="mt-4 text-lg text-gray-700">
//           <b>Service Fee:</b> ₹ {fees.serviceFee}
//           <br />
//           <b>Platform Fee:</b> ₹ {fees.platformFee}
//           <br />
//           <b>Total:</b>{" "}
//           <span className="text-green-700 font-bold">₹ {fees.total}</span>
//         </div>

//         <button
//           type="submit"
//           className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg"
//         >
//           Pay & Submit Application
//         </button>
//       </form>

//       {/* Success Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
//             <h3 className="text-xl font-bold text-green-600 mb-4">
//               🎉 Payment Successful & Application Submitted!
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Your application has been submitted successfully after payment.
//             </p>
//             <button
//               onClick={closePopupAndNavigate}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
//             >
//               Go to Dashboard
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ApplicationForm;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import { createOrder, verifyPayment } from "../api/paymentApi"; // ✅ Payment API

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(BASE_URL); // 👈 connect once

const ApplicationForm = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(serviceId || "");
  const [subservices, setSubservices] = useState([]);
  const [selectedSubservice, setSelectedSubservice] = useState("");
  const [fees, setFees] = useState({ serviceFee: 0, platformFee: 0, total: 0 });
  const [userCaste, setUserCaste] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user?.token) {
      axios
        .get(`${BASE_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => setUserCaste(res.data.caste || "General"))
        .catch((err) => console.error("Error fetching user caste:", err));
    }
  }, [user]);

  useEffect(() => {
    if (user?.token && userCaste) {
      axios
        .get(`${BASE_URL}/api/services`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((res) => {
          setServices(res.data);
          if (serviceId) handleServiceChange(serviceId, res.data, userCaste);
        })
        .catch((err) => console.error("Error fetching services:", err));
    }
  }, [user, userCaste]);

  const calculateFee = (service, casteValue = userCaste) => {
    if (!service?.fees) return 0;
    const casteKey = (casteValue || "General").toUpperCase();
    const matchingKey = Object.keys(service.fees).find(
      (key) => key.toUpperCase() === casteKey
    );
    return matchingKey ? service.fees[matchingKey] : service.fees.General || 0;
  };

  const handleServiceChange = (serviceIdValue, serviceList = services, casteValue = userCaste) => {
    setSelectedService(serviceIdValue);
    setSelectedSubservice("");
    const service = serviceList.find((s) => s._id === serviceIdValue);

    if (service) {
      setSubservices(service.subservices || []);
      const fee = calculateFee(service, casteValue);
      const platformFee = service.platformFee || 0;
      setFees({ serviceFee: fee, platformFee, total: fee + platformFee });
    }
  };

  const handleSubserviceChange = (subId) => {
    setSelectedSubservice(subId);
    const sub = subservices.find((s) => s._id === subId);
    const fee = calculateFee(sub);
    const platformFee = sub?.platformFee || 0;
    setFees({ serviceFee: fee, platformFee, total: fee + platformFee });
  };

  // ✅ Application + Razorpay Payment Flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Draft Application create करा
      const res = await axios.post(
        `${BASE_URL}/api/applications/draft`,
        {
          serviceId: selectedService,
          subServiceId: selectedSubservice || null,
          userId: user.id,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      // ✅ Important Fix: applicationId आता योग्य मिळव
      const applicationId = res.data.application._id;
      console.log("💰 Total fees:", fees.total, "📄 ApplicationId:", applicationId);

      // Step 2: Create Razorpay Order
      const order = await createOrder(fees.total, applicationId);

      // Step 3: Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Maha e-Seva Portal",
        description: "Application Fee Payment",
        handler: async function (response) {
          // Step 4: Verify Payment
          await verifyPayment(
            applicationId,
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            fees.total
          );

          socket.emit("application:new", res.data.application);
          setShowPopup(true);
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("❌ Submission or Payment failed");
    }
  };

  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Apply for a Service
        </h2>

        <select
          value={selectedService}
          onChange={(e) => handleServiceChange(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full"
          required
        >
          <option value="">-- Select Service --</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        {subservices.length > 0 && (
          <select
            value={selectedSubservice}
            onChange={(e) => handleSubserviceChange(e.target.value)}
            className="mt-4 border border-gray-300 rounded-lg p-3 w-full"
          >
            <option value="">-- Select Subservice --</option>
            {subservices.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        )}

        <div className="mt-4 text-lg text-gray-700">
          <b>Service Fee:</b> ₹ {fees.serviceFee}
          <br />
          <b>Platform Fee:</b> ₹ {fees.platformFee}
          <br />
          <b>Total:</b>{" "}
          <span className="text-green-700 font-bold">₹ {fees.total}</span>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg"
        >
          Pay & Submit Application
        </button>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h3 className="text-xl font-bold text-green-600 mb-4">
              🎉 Payment Successful & Application Submitted!
            </h3>
            <p className="text-gray-600 mb-6">
              Your application has been submitted successfully after payment.
            </p>
            <button
              onClick={closePopupAndNavigate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
