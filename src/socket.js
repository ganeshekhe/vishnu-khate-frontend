// // // src/socket.js
// // import { io } from "socket.io-client";

// // const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// // let socket = null;

// // export function initSocket(token) {
// //   if (!socket) {
// //     socket = io(BASE_URL, {
// //       auth: token ? { token } : {},
// //       transports: ["websocket"],
// //     });
// //   }
// //   return socket;
// // }

// // export function getSocket() {
// //   return socket;
// // }


// // src/socket.js
// import { io } from "socket.io-client";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// let socket = null;

// export function initSocket(token) {
//   if (!socket) {
//     socket = io(BASE_URL, {
//       auth: token ? { token } : {},
//       transports: ["websocket"],
//     });
//   }
//   return socket;
// }

// export function getSocket() {
//   return socket;
// }

// client/src/socket.js
import { io } from "socket.io-client";

let socket = null;

/**
 * initSocket(token)
 * - token: optional auth token (string)
 * - returns a singleton socket instance
 *
 * Usage:
 *   import { initSocket, getSocket } from "../socket";
 *   initSocket(user?.token); // on mount
 *   const socket = getSocket();
 */
export function initSocket(token) {
  if (socket && socket.connected) return socket;

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

  // attach auth only if token provided
  socket = io(BASE_URL, {
    auth: token ? { token } : undefined,
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect_error", (err) => {
    console.warn("Socket connect_error:", err?.message || err);
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  try {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  } catch (e) {
    console.warn("disconnectSocket error:", e);
  }
}
