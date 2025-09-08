


// // import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";

// import ApplicationForm from "./pages/ApplicationForm";
// import OperatorPanel from "./pages/OperatorPanel";
// import UserDashboard from "./pages/UserDashboard";

// import { AuthProvider } from "./context/AuthContext";


// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import ForgotPassword from './pages/ForgotPassword';
// import UserProfile from './pages/UserProfile'; // ✅ UserProfile import


// function App() {
//   return (
//     <AuthProvider>
      
        
       
 
//         <Router>
//           <Navbar /> {/* Navbar always visible */}
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<Home />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />

//             {/* User Routes */}
//             <Route path="/profile" element={<UserProfile />} />
//             <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
//             <Route path="/user/dashboard" element={<UserDashboard />} />

//             {/* 🔗 Application Form with serviceId (dynamic route added) */}
//             <Route path="/application-form" element={<ApplicationForm />} />
//             <Route path="/application-form/:serviceId" element={<ApplicationForm />} />

//             {/* Admin Routes */}
//             <Route path="/admin" element={<AdminDashboard />} />
            

//             {/* Operator Route */}
//             <Route path="/operator" element={<OperatorPanel />} />
//           </Routes>
//         </Router>
     
 
//     </AuthProvider>
//   );
// }

// export default App;


// import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import ApplicationForm from "./pages/ApplicationForm";
import OperatorPanel from "./pages/OperatorPanel";
import UserDashboard from "./pages/UserDashboard";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ForgotPassword from './pages/ForgotPassword';
import UserProfile from './pages/UserProfile';

// ✅ Razorpay Policy Pages
import CancellationRefund from "./pages/CancellationRefund";
import TermsConditions from "./pages/TermsConditions";
import Shipping from "./pages/Shipping";
import Privacy from "./pages/Privacy";
import ContactUs from "./pages/ContactUs";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar always visible */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User Routes */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />

          {/* 🔗 Application Form */}
          <Route path="/application-form" element={<ApplicationForm />} />
          <Route path="/application-form/:serviceId" element={<ApplicationForm />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Operator Route */}
          <Route path="/operator" element={<OperatorPanel />} />

          {/* Razorpay Policy Pages */}
          <Route path="/cancellation-refund" element={<CancellationRefund />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
