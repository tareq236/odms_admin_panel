"use client";

import { socket } from "@/lib/socketIo";
import React from "react";


export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isConnected, setIsConnected] = React.useState(false);


  React.useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  return <>{children}</>;
}
