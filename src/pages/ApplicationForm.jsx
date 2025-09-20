
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { createOrder, verifyPayment } from "../api/paymentApi";
import { initSocket, getSocket } from "../socket";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

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
        .get(`${BASE_URL}/api/users/me`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then((res) => setUserCaste(res.data.caste || "General"))
        .catch((err) => console.error("Error fetching user caste:", err));
    }
  }, [user]);

  useEffect(() => {
    if (user?.token && userCaste) {
      axios
        .get(`${BASE_URL}/api/services`, { headers: { Authorization: `Bearer ${user.token}` } })
        .then((res) => {
          setServices(res.data);
          if (serviceId) handleServiceChange(serviceId, res.data, userCaste);
        })
        .catch((err) => console.error("Error fetching services:", err));
    }
  }, [user, userCaste]);

  // load Razorpay SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => console.log("Razorpay SDK loaded");
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // init socket (auth) so that client can receive server emits if needed
  useEffect(() => {
    initSocket(user?.token);
    return () => {
      // do not disconnect here to keep singleton for other pages;
      // components that want full disconnect can call disconnectSocket()
    };
  }, [user?.token]);

  const calculateFee = (service, casteValue = userCaste) => {
    if (!service?.fees) return 0;
    const casteKey = (casteValue || "General").toUpperCase();
    const matchingKey = Object.keys(service.fees).find((key) => key.toUpperCase() === casteKey);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sub = subservices.find((s) => s._id === selectedSubservice);
      const res = await axios.post(
        `${BASE_URL}/api/applications/draft`,
        {
          serviceId: selectedService,
          subService: sub ? { _id: sub._id, name: sub.name } : null,
          userId: user.id,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const applicationId = res.data.application._id;
      const order = await createOrder(fees.total, applicationId);

      if (!window.Razorpay) {
        alert("Razorpay SDK failed to load. Please refresh the page.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Maha e-Seva Portal",
        description: "Application Fee Payment",
        handler: async function (response) {
          // server payment verify will emit "applicationCreated" after updating DB.
          await verifyPayment(
            applicationId,
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            fees.total
          );
          // No custom socket emit here — server emits the canonical "applicationCreated".
          setShowPopup(true);
        },
        theme: { color: "#3399cc" },
        method: { upi: true, card: true, netbanking: true, wallet: true },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Submission or Payment failed");
    }
  };

  const closePopupAndNavigate = () => {
    setShowPopup(false);
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Apply for a Service</h2>

        <select value={selectedService} onChange={(e) => handleServiceChange(e.target.value)} className="border border-gray-300 rounded-lg p-3 w-full" required>
          <option value="">-- Select Service --</option>
          {services.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>

        {subservices.length > 0 && (
          <select value={selectedSubservice} onChange={(e) => handleSubserviceChange(e.target.value)} className="mt-4 border border-gray-300 rounded-lg p-3 w-full">
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

        <button type="submit" className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg">
          Pay & Submit Application
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h3 className="text-xl font-bold text-green-600 mb-4">Payment Successful & Application Submitted!</h3>
            <p className="text-gray-600 mb-6">Your application has been submitted successfully after payment.</p>
            <button onClick={closePopupAndNavigate} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;
