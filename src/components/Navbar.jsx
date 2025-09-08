
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import logo from "../assets/logo.jpg"; // लोगो import (तू फाईल कुठे सेव्ह केलीय त्यानुसार path बदला)

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center space-x-2">
//             <Link
//               to="/"
//               className="hover:scale-105 transform transition duration-300 flex items-center space-x-2"
//             >
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-10 w-auto md:h-12 rounded-full object-contain"
//               />
//               <span className="hidden sm:inline text-xl font-extrabold tracking-wide">
//                 CEP
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex space-x-8 items-center list-none font-medium">
//             <NavLinks user={user} handleLogout={handleLogout} />
//           </ul>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="focus:outline-none hover:scale-110 transition-transform duration-300"
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden px-6 pb-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-lg rounded-b-2xl animate-slideDown">
//           <ul className="list-none space-y-4 mt-4 font-medium">
//             <NavLinks
//               user={user}
//               handleLogout={handleLogout}
//               setIsOpen={setIsOpen}
//             />
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// const NavLinks = ({ user, handleLogout, setIsOpen }) => (
//   <>
//     {/* Home link: only for non-admin/operator */}
//     {(!user || user.role === "user") && (
//       <li>
//         <NavLink
//           to="/"
//           onClick={() => setIsOpen && setIsOpen(false)}
//           className={({ isActive }) =>
//             `hover:text-yellow-200 transition-colors ${isActive ? "font-bold underline" : ""}`
//           }
//         >
//           Home
//         </NavLink>
//       </li>
//     )}

//     {!user && (
//       <>
//         <li>
//           <NavLink
//             to="/login"
//             onClick={() => setIsOpen && setIsOpen(false)}
//             className="hover:text-yellow-200 transition-colors"
//           >
//             Login
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/signup"
//             onClick={() => setIsOpen && setIsOpen(false)}
//             className="hover:text-yellow-200 transition-colors"
//           >
//             Signup
//           </NavLink>
//         </li>
//       </>
//     )}

//     {user && user.role === "user" && (
//       <>
//         <li>
//           <NavLink
//             to="/user/dashboard"
//             onClick={() => setIsOpen && setIsOpen(false)}
//             className="hover:text-yellow-200 transition-colors"
//           >
//             Dashboard
//           </NavLink>
//         </li>
//         <li>
//           <NavLink
//             to="/application-form"
//             onClick={() => setIsOpen && setIsOpen(false)}
//             className="hover:text-yellow-200 transition-colors"
//           >
//             Apply Service
//           </NavLink>
//         </li>
//       </>
//     )}

//     {user && user.role === "admin" && (
//       <li>
//         <NavLink
//           to="/admin"
//           onClick={() => setIsOpen && setIsOpen(false)}
//           className="hover:text-yellow-200 transition-colors"
//         >
//           Admin Dashboard
//         </NavLink>
//       </li>
//     )}

//     {user && user.role === "operator" && (
//       <li>
//         <NavLink
//           to="/operator"
//           onClick={() => setIsOpen && setIsOpen(false)}
//           className="hover:text-yellow-200 transition-colors"
//         >
//           Operator Panel
//         </NavLink>
//       </li>
//     )}

//     {/* Profile + Logout only for user */}
//     {user && user.role === "user" && (
//       <>
//         <li>
//           <Link
//             to="/profile"
//             onClick={() => setIsOpen && setIsOpen(false)}
//             className="flex items-center"
//           >
//             {user.profilePic?.filename ? (
//               <img
//                 src={`${BASE_URL}/api/files/${user.profilePic.filename}`}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform"
//               />
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center font-bold hover:scale-110 transition-transform">
//                 {user.name ? user.name.charAt(0).toUpperCase() : "U"}
//               </div>
//             )}
//           </Link>
//         </li>
//         <li>
//           <button
//             onClick={() => {
//               handleLogout();
//               setIsOpen && setIsOpen(false);
//             }}
//             className="bg-white text-pink-600 px-3 py-1.5 rounded-lg hover:bg-pink-100 shadow-md hover:scale-105 transition-all"
//           >
//             Logout
//           </button>
//         </li>
//       </>
//     )}

//     {/* Logout for admin/operator */}
//     {user && (user.role === "admin" || user.role === "operator") && (
//       <li>
//         <button
//           onClick={() => {
//             handleLogout();
//             setIsOpen && setIsOpen(false);
//           }}
//           className="bg-white text-pink-600 px-3 py-1.5 rounded-lg hover:bg-pink-100 shadow-md hover:scale-105 transition-all"
//         >
//           Logout
//         </button>
//       </li>
//     )}
//   </>
// );

// export default Navbar;


import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg"; // लोगो import (path verify करा)

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link
              to="/"
              className="hover:scale-105 transform transition duration-300 flex items-center space-x-2"
            >
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto md:h-12 rounded-full object-contain"
              />
              <span className="hidden sm:inline text-xl font-extrabold tracking-wide">
                CEP
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center list-none font-medium">
            <NavLinks user={user} handleLogout={handleLogout} />
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none hover:scale-110 transition-transform duration-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-lg rounded-b-2xl animate-slideDown">
          <ul className="list-none space-y-4 mt-4 font-medium">
            <NavLinks
              user={user}
              handleLogout={handleLogout}
              setIsOpen={setIsOpen}
            />
          </ul>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ user, handleLogout, setIsOpen }) => (
  <>
    {/* Home link for user */}
    {(!user || user.role === "user") && (
      <li>
        <NavLink
          to="/"
          onClick={() => setIsOpen && setIsOpen(false)}
          className={({ isActive }) =>
            `hover:text-yellow-200 transition-colors ${isActive ? "font-bold underline" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
    )}

    {!user && (
      <>
        <li>
          <NavLink
            to="/login"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/signup"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Signup
          </NavLink>
        </li>
      </>
    )}

    {/* User links */}
    {user && user.role === "user" && (
      <>
        <li>
          <NavLink
            to="/user/dashboard"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/application-form"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Apply Service
          </NavLink>
        </li>

        {/* Razorpay Policy Pages */}
        <li>
          <NavLink
            to="/cancellation-refund"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Cancellation & Refunds
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/terms-conditions"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Terms & Conditions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shipping"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Shipping
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/privacy"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Privacy
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact-us"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="hover:text-yellow-200 transition-colors"
          >
            Contact Us
          </NavLink>
        </li>

        {/* Profile + Logout */}
        <li>
          <Link
            to="/profile"
            onClick={() => setIsOpen && setIsOpen(false)}
            className="flex items-center"
          >
            {user.profilePic?.filename ? (
              <img
                src={`${BASE_URL}/api/files/${user.profilePic.filename}`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center font-bold hover:scale-110 transition-transform">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen && setIsOpen(false);
            }}
            className="bg-white text-pink-600 px-3 py-1.5 rounded-lg hover:bg-pink-100 shadow-md hover:scale-105 transition-all"
          >
            Logout
          </button>
        </li>
      </>
    )}

    {/* Admin/Operator Logout only */}
    {user && (user.role === "admin" || user.role === "operator") && (
      <li>
        <button
          onClick={() => {
            handleLogout();
            setIsOpen && setIsOpen(false);
          }}
          className="bg-white text-pink-600 px-3 py-1.5 rounded-lg hover:bg-pink-100 shadow-md hover:scale-105 transition-all"
        >
          Logout
        </button>
      </li>
    )}
  </>
);

export default Navbar;
