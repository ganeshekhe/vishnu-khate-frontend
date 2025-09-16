import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // ✅ Render backend URL env मधून
});

// ✅ Request Interceptor (JWT Token लावण्यासाठी)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// --------------------
// 📌 Create Razorpay Order
// --------------------
export const createOrder = async (amount, applicationId) => {
  try {
    const { data } = await API.post("/api/payments/create-order", {
      amount,
      applicationId,
    });
    return data; // { orderId, amount, currency }
  } catch (err) {
    console.error("❌ Create order error:", err);
    throw err.response?.data || { message: "Create order failed" };
  }
};

// --------------------
// 📌 Verify Razorpay Payment
// --------------------
export const verifyPayment = async (
  applicationId,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  amount
) => {
  try {
    const { data } = await API.post("/api/payments/verify", {
      applicationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    });
    return data; // { message, application }
  } catch (err) {
    console.error("❌ Verify payment error:", err);
    throw err.response?.data || { message: "Payment verification failed" };
  }
};
