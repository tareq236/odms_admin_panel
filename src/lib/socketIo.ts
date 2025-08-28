import { io } from "socket.io-client";

// let socket: Socket;
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_ENDPOINT;

const options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: false,
  rejectUnauthorized: false,
};

export const socket = io(ENDPOINT, options);
