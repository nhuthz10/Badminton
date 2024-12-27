"use client";
import { io } from "socket.io-client";
import { useEffect, createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("notify-order-succeed", (data) => {
      toast(`${data?.UserData?.email} vừa mới đặt hàng thành công`, {
        position: "bottom-left",
        className: "toast-big",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    return () => {
      socket.off("notify-order-succeed");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
