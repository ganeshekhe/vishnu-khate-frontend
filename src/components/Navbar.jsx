import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <nav className="bg-gradient-to-tr from-pink-600 to-orange-500 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-2xl font-bold tracking-wider">
            <Link to="/">𝒞𝐸𝒫</Link>
          </div>

          <ul className="hidden md:flex space-x-6 items-center list-none">
            <NavLinks user={user} handleLogout={handleLogout} />
          </ul>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="list-none space-y-4 mt-2">
            <NavLinks user={user} handleLogout={handleLogout} setIsOpen={setIsOpen} />
          </ul>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ user, handleLogout, setIsOpen }) => (
  <>
    <li>
      <NavLink to="/" onClick={() => setIsOpen && setIsOpen(false)}>
        Home
      </NavLink>
    </li>

    {!user && (
      <>
        <li>
          <NavLink to="/login" onClick={() => setIsOpen && setIsOpen(false)}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" onClick={() => setIsOpen && setIsOpen(false)}>
            Signup
          </NavLink>
        </li>
      </>
    )}

    {user && user.role === "user" && (
      <>
        <li>
          <NavLink to="/user/dashboard" onClick={() => setIsOpen && setIsOpen(false)}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/application-form" onClick={() => setIsOpen && setIsOpen(false)}>
            Apply Service
          </NavLink>
        </li>
      </>
    )}

    {user && user.role === "admin" && (
      <li>
        <NavLink to="/admin" onClick={() => setIsOpen && setIsOpen(false)}>
          Admin Dashboard
        </NavLink>
      </li>
    )}

    {user && user.role === "operator" && (
      <li>
        <NavLink to="/operator" onClick={() => setIsOpen && setIsOpen(false)}>
          Operator Panel
        </NavLink>
      </li>
    )}

    {user && (
      <>
        <li>
          <Link to="/profile" onClick={() => setIsOpen && setIsOpen(false)}>
            {user.profilePic?.filename ? (
              <img
                src={`${BASE_URL}/api/files/${user.profilePic.filename}`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center font-bold">
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
            className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-pink-100"
          >
            Logout
          </button>
        </li>
      </>
    )}
  </>
);

export default Navbar;
