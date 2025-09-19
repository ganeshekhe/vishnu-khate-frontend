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


// src/socket.js
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

let socket = null;

export function initSocket(token) {
  if (!socket) {
    socket = io(BASE_URL, {
      auth: token ? { token } : {},
      transports: ["websocket"],
    });
  }
  return socket;
}

export function getSocket() {
  return socket;
}
