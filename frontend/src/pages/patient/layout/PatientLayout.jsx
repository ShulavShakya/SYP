import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  CircleUserRound,
  CreditCard,
  FileText,
  Heart,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  X,
  Send,
  Trash2,
  Search,
} from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";

const navItems = [
  { label: "Home", to: "/patient", icon: Home, end: true },
  { label: "Appointment", to: "/patient/appointment-history", icon: FileText },
  { label: "Medical Records", to: "/patient/medical-records", icon: MessageSquare },
  { label: "Billing", to: "/patient/billing", icon: CreditCard },
  { label: "Profile", to: "/patient/profile", icon: Settings },
];

const pageTitles = {
  "/patient": "Hello, John!",
  "/patient/appointment-history": "My Appointments",
  "/patient/medical-records": "Medical Records",
  "/patient/billing": "Billing & Payments",
  "/patient/profile": "Profile Settings",
};

function toNameFromEmail(email) {
  if (!email) return "John Doe";
  const head = email.split("@")[0]?.replace(/[._-]+/g, " ") || "John Doe";
  return head
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1))
    .join(" ");
}

export default function PatientLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [confirmClearChat, setConfirmClearChat] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Doctor",
      text: "How are you feeling today?",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "You",
      text: "I'm doing well, thank you!",
      time: "10:35 AM",
    },
  ]);
  const [notifications] = useState([
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
  ]);
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName = useMemo(
    () => toNameFromEmail(user?.email),
    [user?.email],
  );
  const firstName = useMemo(
    () => displayName.split(" ")[0] || "John",
    [displayName],
  );

  const title = useMemo(() => {
    const template = pageTitles[location.pathname] || "Hello, {firstName}! ";
    return template.replace("{firstName}", firstName);
  }, [location.pathname, firstName]);

  // close notifications when navigating to a new route
  React.useEffect(() => {
    setNotificationsOpen(false);
  }, [location.pathname]);

  // unused user id now; we'll show the current date instead
  // const userId = "#PT-9920";
  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          text: messageInput,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessageInput("");
    }
  };

  const handleClearChat = () => {
    setConfirmClearChat(true);
  };

  const confirmClear = () => {
    setMessages([]);
    setConfirmClearChat(false);
  };

  const cancelClear = () => {
    setConfirmClearChat(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="flex h-screen w-full">
        <aside className="hidden w-[var(--sidebar-width)] bg-white border-r border-[#e6eaef] flex-col shrink-0 lg:flex">
          <div className="p-8 flex items-center gap-3">
            <div className="bg-[#0b8a8e] size-10 rounded-xl flex items-center justify-center text-white">
              <Heart size={24} />
            </div>
            <span
              className="text-xl font-bold text-[#0b8a8e] tracking-tight"
              onClick={() => {
                navigate("/");
              }}
            >
              Upachaar
            </span>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-colors",
                      isActive
                        ? "bg-[#e6edef] text-[#0b8a8e]"
                        : "text-[#62708b] hover:bg-[#eef3f5]",
                    ].join(" ")
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-6 border-t border-[#e6eaef] flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="size-12 h-12 rounded-full bg-[#d4ecec] flex items-center justify-center overflow-hidden">
                <CircleUserRound size={24} className="text-[#0b8a8e]" />
              </div>
              <p className="text-sm font-semibold text-[#1f2a44] truncate">
                {displayName}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="mt-4 w-full bg-[#0b8a8e] text-white text-xs font-bold py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="h-20 shrink-0 px-10 flex items-center justify-between bg-white border-b border-gray-200">
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-xl border border-[#dbe2ea] bg-white p-2 text-[#62708b]"
                aria-label="Toggle navigation"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>

            <div className="flex-1 px-4 lg:px-0 lg:pl-0">
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            </div>

            <div className="flex items-center gap-6">
              {/* search bar */}
              <div className="relative bg-slate-100">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 pl-3 pr-10 py-2 text-sm rounded-lg border border-[#e6eaef] focus:outline-none focus:ring-2 focus:ring-[#0b8a8e]"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#62708b]" />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative text-[#8a97ab] hover:text-[#62708b]"
                  aria-label="Notifications"
                >
                  <Bell size={28} />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-lg shadow-lg border border-[#e6eaef] z-50">
                    <div className="p-4 border-b border-[#e6eaef]">
                      <h4 className="font-bold text-[#1f2a44]">
                        Notifications
                      </h4>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-4 border-b border-[#e6eaef] hover:bg-[#f4f6f8] cursor-pointer"
                        >
                          <p className="text-sm text-[#1f2a44]">
                            {notif.message}
                          </p>
                          <p className="text-xs text-[#62708b] mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="w-full text-center text-sm text-[#0b8a8e] hover:underline"
                      >
                        View All
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pl-6 border-l border-[#e1e7ef]">
                <p className="text-sm font-bold text-[#1f2a44] leading-none">
                  {today}
                </p>
              </div>
            </div>
          </header>

          {menuOpen && (
            <div className="px-4 pb-3 lg:hidden">
              <div className="bg-white border border-[#dbe2ea] rounded-2xl p-2 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      end={item.end}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        [
                          "flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-colors",
                          isActive
                            ? "bg-[#e6edef] text-[#0b8a8e]"
                            : "text-[#62708b] hover:bg-[#eef3f5]",
                        ].join(" ")
                      }
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </NavLink>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onLogout();
                  }}
                  className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl border border-[#dbe2ea] px-4 py-3 text-[#62708b] font-semibold"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 px-10 pb-10">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Messaging Floating Button and Window */}
      <div className="fixed bottom-6 right-6 z-40">
        {!messagingOpen && (
          <button
            onClick={() => setMessagingOpen(true)}
            className="flex items-center justify-center w-14 h-14 bg-[#0b8a8e] text-white rounded-full shadow-lg hover:bg-[#096d72] transition-colors"
            aria-label="Open messaging"
          >
            <MessageSquare size={24} />
          </button>
        )}

        {messagingOpen && (
          <div className="w-[28rem] h-[32rem]  bg-white rounded-2xl shadow-2xl border border-[#e6eaef] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#0b8a8e] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold">Messages</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="hover:bg-[#096d72] p-1 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setMessagingOpen(false)}
                  className="hover:bg-[#096d72] p-1 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f4f6f8]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-[#0b8a8e] text-white"
                        : "bg-white text-[#1f2a44] border border-[#e6eaef]"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${msg.sender === "You" ? "text-blue-100" : "text-[#62708b]"}`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#e6eaef] bg-white flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 px-4 py-2 border border-[#e6eaef] rounded-lg text-sm focus:outline-none focus:border-[#0b8a8e] focus:ring-2 focus:ring-[#0b8a8e]/20"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#0b8a8e] text-white px-3 py-2 rounded-lg hover:bg-[#096d72] transition-colors flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>

            {/* Confirmation Dialog */}
            {confirmClearChat && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                <div className="bg-white p-3 rounded-lg shadow-lg border border-[#e6eaef] w-60">
                  <h4 className="font-bold text-sm text-[#1f2a44] mb-1">
                    Clear Chat?
                  </h4>
                  <p className="text-xs text-[#62708b] mb-3">
                    Delete all messages?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={cancelClear}
                      className="flex-1 px-3 py-1.5 text-xs border border-[#e6eaef] rounded-lg text-[#62708b] hover:bg-[#f4f6f8] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmClear}
                      className="flex-1 px-3 py-1.5 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
