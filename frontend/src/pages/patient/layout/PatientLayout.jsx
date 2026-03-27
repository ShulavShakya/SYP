import React, { useMemo, useState, useEffect, useRef } from "react"; // Added missing hooks
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  CircleUserRound,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
  Home,
  CalendarClock,
  Pill,
  CreditCard,
  FileText,
  MessageSquare,
  Heart,
  HelpCircle,
  Send,
  Trash2,
} from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";
import { privateAPI } from "../../../auth/config/api";

const navItems = [
  { label: "Home", to: "/patient", icon: Home, end: true },
  {
    label: "Appointments",
    to: "/patient/appointment-history",
    icon: CalendarClock,
  },

  { label: "Medical Records", to: "/patient/medical-records", icon: FileText },
  { label: "Billing", to: "/patient/billing", icon: CreditCard },
  { label: "Profile", to: "/patient/profile", icon: Settings },
];

const pageTitles = {
  "/patient": "Patient Dashboard",
  "/patient/appointment-history": "My Appointments",

  "/patient/medical-records": "Medical Records",
  "/patient/billing": "Billing & Payments",
  "/patient/profile": "Profile Settings",
};

function getDisplayName(user) {
  if (user?.full_name) return user.full_name;
  if (user?.username) return user.username;

  const email = user?.email?.trim();
  if (!email) return "Patient";

  const localPart = email.split("@")[0] || "";
  const cleaned = localPart
    .replace(/[0-9]+/g, " ")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = cleaned
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  if (words.length === 0) return "Patient";
  return words.join(" ");
}

function getShortDisplayName(name) {
  if (!name || name === "Patient") return "Patient";
  const parts = name.trim().split(" ").filter(Boolean);

  if (parts.length === 1) return parts[0].slice(0, 12);

  return `${parts[0]} ${parts[1][0]}.`;
}
export default function PatientLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [confirmClearChat, setConfirmClearChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [wsStatus, setWsStatus] = useState("closed");

  const [searchQuery, setSearchQuery] = useState("");

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName = useMemo(() => getDisplayName(user), [user]);
  const shortDisplayName = useMemo(
    () => getShortDisplayName(displayName),
    [displayName],
  );
  const firstName = useMemo(
    () => displayName.split(" ")[0] || "User",
    [displayName],
  );
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [],
  );
  const title = useMemo(
    () => pageTitles[location.pathname] || `Hello, ${firstName}`,
    [location.pathname, firstName],
  );

  const notifications = useMemo(
    () => [
      {
        id: 1,
        message: "Your appointment with Dr. Sarah Jenkins is confirmed.",
        time: "2 hours ago",
      },
      {
        id: 2,
        message: "New message from Dr. Michael Chen.",
        time: "1 day ago",
      },
      {
        id: 3,
        message: "Billing statement is ready for download.",
        time: "3 days ago",
      },
    ],
    [],
  );

  useEffect(() => {
    const initChat = async () => {
      try {
        const token = sessionStorage.getItem("access");
        if (!token) return;
        const res = await privateAPI.get("/users/api/my-conversation/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setConversationId(res.data.conversation_id);
      } catch (err) {
        console.error("Error fetching chat ID:", err);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (!messagingOpen || !conversationId) return;

    setWsStatus("connecting");

    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem("access");
        const res = await privateAPI.get(
          `/users/api/conversations/${conversationId}/messages/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setMessages(res.data);
      } catch (err) {
        console.error("Error loading history:", err);
      }
    };

    fetchHistory();

    // --- WebSocket Logic ---
    const token = sessionStorage.getItem("access");
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    // const wsUrl = `${protocol}://10.113.201.239:8000/ws/chat/${conversationId}/?token=${token}`;
    const wsUrl = `${protocol}://localhost:8000/ws/chat/${conversationId}/?token=${token}`;

    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("Connected to Server");
      setWsStatus("open");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender_type: data.sender_type,
          sender_name: data.sender_name,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);
    };

    socketRef.current.onclose = () => {
      setWsStatus("closed");
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket Error:", err);
      setWsStatus("closed");
    };

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, [messagingOpen, conversationId]);

  // 3. Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setSearchQuery("");
    setNotificationsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const onLogout = () => {
    logout();
    navigate("/");
  };
  const closeMenu = () => setMenuOpen(false);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: messageInput.trim() }));
      setMessageInput("");
    } else {
      console.warn("WebSocket not ready");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
      isActive
        ? "bg-teal-50 text-teal-700 border-r-4 border-teal-600"
        : "text-slate-500 hover:text-teal-600 hover:bg-teal-50"
    }`;

  useEffect(() => {
    setNotificationsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f7fafa] text-[#181c1d]">
      <div className="flex h-screen w-full overflow-hidden">
        {/* SIDEBAR */}
        <aside className="hidden w-[270px] shrink-0 flex-col bg-white shadow-[4px_0_20px_rgba(0,101,101,0.05)] lg:flex">
          <div className="px-6 py-8">
            <div
              className="flex cursor-pointer items-center gap-3"
              onClick={() => navigate("/patient")}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006565] text-white shadow-lg">
                <Heart size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight text-teal-800">
                  Upachaar
                </h1>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Patient Portal
                </p>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto bg-slate-50 p-4">
            <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
              <div className="min-w-0 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <CircleUserRound size={22} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#181c1d]">
                    {shortDisplayName}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">
                    Patient
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* HEADER */}
          <header className="h-16 shrink-0 border-b border-teal-50 bg-white/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden p-2 border rounded-xl"
                >
                  <Menu size={18} />
                </button>
                <h2 className="truncate text-lg font-bold text-teal-800">
                  {title}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMessagingOpen(true)}
                  className="hidden md:inline-flex bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 rounded-lg"
                >
                  Support
                </button>
                <button className="p-2 text-slate-600">
                  <Bell size={22} />
                </button>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!messagingOpen ? (
          <button
            onClick={() => setMessagingOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#006565] text-white shadow-lg"
          >
            <MessageSquare size={24} />
          </button>
        ) : (
          <div className="flex h-[32rem] w-[28rem] flex-col overflow-hidden rounded-2xl border border-[#e6eaef] bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#006565] p-4 text-white">
              <h3 className="font-bold">Clinic Support</h3>
              <button
                onClick={() => setMessagingOpen(false)}
                className="p-1 hover:bg-[#005454] rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 space-y-4 overflow-y-auto bg-[#f4f6f8] p-4"
            >
              {/* Important: Optional chaining (?.) prevents crash if messages is null */}
              {messages?.map((msg, idx) => {
                const isMe = msg.sender_type === "PATIENT";
                return (
                  <div
                    key={idx}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 ${isMe ? "bg-[#006565] text-white" : "border border-[#e6eaef] bg-white text-[#1f2a44]"}`}
                    >
                      {!isMe && (
                        <p className="text-[10px] font-bold text-teal-600 mb-1">
                          {msg.sender_name}
                        </p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`mt-1 text-[9px] text-right opacity-60 ${isMe ? "text-teal-100" : "text-slate-500"}`}
                      >
                        {msg.created_at
                          ? new Date(msg.created_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 border-t p-4 bg-white">
              <input
                type="text"
                placeholder={
                  wsStatus === "open"
                    ? "Type a message..."
                    : "Connecting to support..."
                }
                disabled={wsStatus !== "open"} // Disable input while connecting
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm outline-none transition-colors ${
                  wsStatus === "open"
                    ? "bg-slate-50 focus:border-[#006565]"
                    : "bg-slate-200 cursor-not-allowed"
                }`}
              />
              <button
                onClick={handleSendMessage}
                disabled={wsStatus !== "open" || !messageInput.trim()} // Disable button if not ready
                className={`p-2 rounded-lg transition-all ${
                  wsStatus === "open"
                    ? "bg-[#006565] text-white hover:bg-[#004d4d]"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                {wsStatus === "connecting" ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
