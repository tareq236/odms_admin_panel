import { io } from "socket.io-client";

// let socket: Socket;
const ENDPOINT = "128.199.199.164:6044";
// const ENDPOINT = "174.138.120.140:6044";
// const ENDPOINT = '192.168.0.101:6043';
// export const SocketIO = {
//   Socket,
//   GetConnection,
// };

// function Socket() {
//   return socket;
// }

const options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: true,
  rejectUnauthorized: false,
};

// function GetConnection() {
//   const options = {
//     rememberUpgrade: true,
//     transports: ["websocket"],
//     secure: true,
//     rejectUnauthorized: false,
//   };

//   socket = io(ENDPOINT, options);

//   return socket;
// }

export const socket = io(ENDPOINT, options)