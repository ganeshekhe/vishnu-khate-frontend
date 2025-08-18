



import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
 
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-tr from-pink-600 to-orange-500 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-2xl font-bold tracking-wider"></div>
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold tracking-widest text-yellow-400 hover:tracking-[0.2em] transition-all duration-500">
            <Link to="/" className="hover:text-white">
              VISTORA
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center list-none font-medium">
            <NavLinks user={user} handleLogout={handleLogout} />
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="hover:text-yellow-400 transition">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#1b1f3b] shadow-inner">
          <ul className="list-none space-y-4 mt-2 font-medium">
            <NavLinks user={user} handleLogout={handleLogout} setIsOpen={setIsOpen} />
          </ul>
        </div>
      )}
    </nav>
  );
};

// 🔗 NavLinks Component
const NavLinks = ({ user, handleLogout, setIsOpen }) => {
  const linkClass = "transition-all duration-300 hover:text-yellow-400 hover:scale-105";
  const activeClass = "underline underline-offset-4 font-semibold text-yellow-400";

  return (
    <>
      {/* Home show only for non-admin/operator */}
      {!user || user.role === "user" ? (
        <li>
          <NavLink
            to="/"
            onClick={() => setIsOpen && setIsOpen(false)}
            className={({ isActive }) => isActive ? activeClass : linkClass}
          >
            Home
          </NavLink>
        </li>
      ) : null}

      {!user && (
        <>
          <li>
            <NavLink
              to="/login"
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => isActive ? activeClass : linkClass}
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => isActive ? activeClass : linkClass}
            >
              Signup
            </NavLink>
          </li>
        </>
      )}

      {user && user.role === "user" && (
        <>
          <li>
            <NavLink
              to="/user/dashboard"
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => isActive ? activeClass : linkClass}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/application-form"
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => isActive ? activeClass : linkClass}
            >
              Apply Service
            </NavLink>
          </li>
        </>
      )}

      {user && user.role === "admin" && (
        <>
          <li>
            <NavLink
              to="/admin"
              onClick={() => setIsOpen && setIsOpen(false)}
              className={({ isActive }) => isActive ? activeClass : linkClass}
            >
              Admin Dashboard
            </NavLink>
          </li>
        </>
      )}

      {user && user.role === "operator" && (
        <li>
          <NavLink
            to="/operator"
            onClick={() => setIsOpen && setIsOpen(false)}
            className={({ isActive }) => isActive ? activeClass : linkClass}
          >
            Operator Panel
          </NavLink>
        </li>
      )}

      {/* Logout for all logged-in users */}
      {user && (
        <li>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen && setIsOpen(false);
            }}
            className="bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-300 transition-all font-semibold"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );
};


export default Navbar;
