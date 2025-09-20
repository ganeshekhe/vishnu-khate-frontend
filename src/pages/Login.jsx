





import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Optional: previous page to go back
  const previousPage = location.state?.from || "/";

  const validate = () => {
    const errs = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      errs.mobile = "❌ Enter valid 10-digit mobile starting with 6-9";
    if (!form.password || form.password.length < 6)
      errs.password = "❌ Password must be at least 6 characters";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/api/auth/login`, form);

      // Save token and login
      localStorage.setItem("token", res.data.token);
      await login(res.data.token);

      // ✅ फक्त neat success message
      toast.success("✅ Login Successful!", {
        position: "top-right",
        autoClose: 1500,
      });

      // Redirect based on role
      setTimeout(() => {
        if (res.data.user.role === "admin") navigate("/admin");
        else if (res.data.user.role === "operator") navigate("/operator");
        else navigate(previousPage);
      }, 1500);
    } catch (err) {
      // ❌ फक्त error message दाखवा
      toast.error("❌ " + (err.response?.data?.message || "Login failed"), {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-200 to-orange-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
          Login
        </h2>

        {/* Mobile Input */}
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          className={`w-full border p-2 mb-2 rounded ${
            errors.mobile ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm">{errors.mobile}</p>
        )}

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className={`w-full border p-2 mb-2 rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(previousPage)}
          className="mt-3 w-full border border-gray-400 hover:bg-gray-200 text-gray-800 py-2 rounded transition"
        >
          Back
        </button>

        {/* Signup Link */}
        <p className="mt-3 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
