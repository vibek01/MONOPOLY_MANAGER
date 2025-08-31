// contexts/SocketContext.js
import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

// Use the same IP as your API. Sockets connect to the base server, not the /api path.
const SOCKET_URL = "http://192.168.43.8:4000";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establish connection when the provider mounts
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    // Clean up the connection when the app is closed
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
