// // src/context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
// import jwt_decode from "jwt-decode";
// import axios from "axios";

// const AuthContext = createContext();
// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ प्रोफाइल API कॉल
//   const fetchUserProfile = async (decodedUser, token) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/users/${decodedUser.id}/profile`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUser({
//         id: decodedUser.id,
//         name: res.data.name,
//         mobile: res.data.mobile,
//         role: decodedUser.role,
//         gender: res.data.gender,
//         dob: res.data.dob,
//         profilePic: res.data.profilePic || null,
//         token,
//       });
//     } catch (error) {
//       console.error("❌ Failed to fetch profile:", error);
//       setUser(null);
//     }
//   };

//   // ✅ पहिल्यांदा पेज लोडवर टोकन तपासा
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwt_decode(token);
//         fetchUserProfile(decoded, token);
//       } catch (error) {
//         console.error("❌ Invalid token:", error);
//         localStorage.removeItem("token");
//         setUser(null);
//       }
//     }
//   }, []);

//   // ✅ लॉगिन
//   const login = useCallback(async (token) => {
//     try {
//       const decoded = jwt_decode(token);
//       localStorage.setItem("token", token);
//       await fetchUserProfile(decoded, token);
//     } catch (error) {
//       console.error("❌ Invalid token in login:", error);
//       setUser(null);
//     }
//   }, []);

//   // ✅ लॉगआउट
//   const logout = useCallback(() => {
//     localStorage.removeItem("token");
//     setUser(null);
//   }, []);

//   // ✅ Context value
//   const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { initSocket, disconnectSocket } from "../socket"; // 🔴 socket import

const AuthContext = createContext();
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ प्रोफाइल API कॉल
  const fetchUserProfile = async (decodedUser, token) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/users/${decodedUser.id}/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser({
        id: decodedUser.id,
        name: res.data.name,
        mobile: res.data.mobile,
        role: decodedUser.role,
        gender: res.data.gender,
        dob: res.data.dob,
        profilePic: res.data.profilePic || null,
        token,
      });
    } catch (error) {
      console.error("❌ Failed to fetch profile:", error);
      setUser(null);
    }
  };

  // ✅ पहिल्यांदा पेज लोडवर टोकन तपासा
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        fetchUserProfile(decoded, token);
      } catch (error) {
        console.error("❌ Invalid token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // ✅ लॉगिन
  const login = useCallback(async (token) => {
    try {
      const decoded = jwt_decode(token);
      localStorage.setItem("token", token);
      await fetchUserProfile(decoded, token);
    } catch (error) {
      console.error("❌ Invalid token in login:", error);
      setUser(null);
    }
  }, []);

  // ✅ लॉगआउट
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    disconnectSocket(); // 🔴 logout वेळी socket बंद करणे
  }, []);

  // ✅ socket initialization user/token वर अवलंबून
  useEffect(() => {
    if (user?.token) {
      initSocket(user.token); // 🔴 socket connect
    } else {
      disconnectSocket(); // 🔴 जर user नसेल तर disconnect
    }
    return () => disconnectSocket(); // cleanup
  }, [user?.token]);

  // ✅ Context value
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
