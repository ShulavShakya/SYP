// useNotifications.js
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { privateAPI } from "../auth/config/api";

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const token = sessionStorage.getItem("access");
    if (!token) return;

    const socket = new WebSocket(
      `ws://10.124.177.239:8000/ws/notifications/?token=${token}`,
    );
    // const socket = new WebSocket(
    //   `ws://localhost:8000/ws/notifications/?token=${token}`,
    // );
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);

      if (payload.notifications) {
        console.log(payload.notifications);
        if (Array.isArray(payload.notifications)) {
          setNotifications(payload.notifications);
          setUnreadCount(
            payload.notifications.filter((n) => !n.is_read).length,
          );
        } else {
          setNotifications((prev) => [payload.notifications, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user]);

  const clearUnread = async () => {
    try {
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));

      await privateAPI.post("patient/notifications/mark-read/", {});
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  return { notifications, unreadCount, clearUnread };
};
