// // import { createContext, useContext, useState } from "react";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(() => {
// //     const saved = localStorage.getItem("user");
// //     return saved ? JSON.parse(saved) : null;
// //   });

// //   const login = (data) => {
// //     localStorage.setItem("token", data.token);
// //     localStorage.setItem("user", JSON.stringify(data.user));
// //     setUser(data.user);
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
// import jwt_decode from "jwt-decode";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // ✅ टोकनवरून युजर प्रोफाइल मिळवणे
//   const fetchUserProfile = async (decodedUser, token) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/users/${decodedUser.id}/profile`,
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

//   // ✅ लॉगिन फंक्शन
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

//   // ✅ लॉगआउट फंक्शन
//   const logout = useCallback(() => {
//     localStorage.removeItem("token");
//     setUser(null);
//   }, []);

//   // ✅ मेमोइझ्ड value
//   const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ प्रोफाइल API कॉल
  const fetchUserProfile = async (decodedUser, token) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${decodedUser.id}/profile`,
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
  }, []);

  // ✅ Context value
  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
