import { io } from "socket.io-client";

// let socket: Socket;
const ENDPOINT = "128.199.199.164:6044";


const options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: true,
  rejectUnauthorized: false,
};

export const socket = io(ENDPOINT, options)