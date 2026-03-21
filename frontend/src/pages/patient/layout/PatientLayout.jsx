import React, { useMemo, useState } from "react";
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
  Activity,
  Send,
  Trash2,
} from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";

const navItems = [
  { label: "Home", to: "/patient", icon: Home, end: true },
  {
    label: "Appointments",
    to: "/patient/appointment-history",
    icon: CalendarClock,
  },
  { label: "Prescriptions", to: "/patient/prescriptions", icon: Pill },
  {
    label: "Medical Records",
    to: "/patient/medical-records",
    icon: FileText,
  },
  { label: "Billing", to: "/patient/billing", icon: CreditCard },
  { label: "Profile", to: "/patient/profile", icon: Settings },
];

const pageTitles = {
  "/patient": "Patient Dashboard",
  "/patient/appointment-history": "My Appointments",
  "/patient/prescriptions": "My Prescriptions",
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagingOpen, setMessagingOpen] = useState(false);
  const [confirmClearChat, setConfirmClearChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");

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
    return pageTitles[location.pathname] || `Hello, ${firstName}`;
  }, [location.pathname, firstName]);

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
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
    if (!messageInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "You",
        text: messageInput.trim(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessageInput("");
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

  const navLinkClass = ({ isActive }) =>
    [
      "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold",
      isActive
        ? "bg-teal-50 text-teal-700 border-r-4 border-teal-600"
        : "text-slate-500 hover:text-teal-600 hover:bg-teal-50",
    ].join(" ");

  React.useEffect(() => {
    setNotificationsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f7fafa] text-[#181c1d]">
      <div className="flex h-screen w-full overflow-hidden">
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
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={navLinkClass}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-auto bg-slate-50 p-4">
            <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
              <div className="min-w-0 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <CircleUserRound size={22} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#181c1d]">
                    {displayName}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">
                    Patient
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-500"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <header className="h-16 shrink-0 border-b border-teal-50 bg-white/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
              <div className="min-w-0 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 lg:hidden"
                  aria-label="Toggle navigation"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="truncate text-lg font-bold text-teal-800">
                      {title}
                    </h2>
                    <div className="hidden h-4 w-px bg-slate-200 md:block" />
                    <span className="hidden text-sm font-medium text-slate-500 md:block">
                      {today}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mx-4 hidden max-w-md flex-1 md:block">
                <div className="group relative rounded-xl transition-all focus-within:ring-2 focus-within:ring-teal-500/20">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600" />
                  <input
                    type="text"
                    placeholder="Search appointments, records, or bills..."
                    className="w-full rounded-xl border-none bg-[#f1f4f4] py-2 pl-10 pr-4 text-sm text-[#181c1d] outline-none ring-0 placeholder:text-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen((prev) => !prev)}
                    className="relative rounded-lg p-2 text-slate-600 transition-colors hover:text-teal-600"
                    aria-label="Notifications"
                  >
                    <Bell size={22} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                      <div className="border-b border-slate-100 px-4 py-3">
                        <h4 className="text-sm font-bold text-[#181c1d]">
                          Notifications
                        </h4>
                      </div>

                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="border-b border-slate-100 px-4 py-3 hover:bg-slate-50"
                          >
                            <p className="text-sm text-[#181c1d]">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="p-3">
                        <button
                          type="button"
                          onClick={() => setNotificationsOpen(false)}
                          className="w-full rounded-xl bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-100"
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-600 transition-colors hover:text-teal-600"
                  aria-label="Help"
                >
                  <HelpCircle size={22} />
                </button>

                <button
                  type="button"
                  className="hidden rounded-lg bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700 transition-all hover:bg-[#006565] hover:text-white md:inline-flex"
                  onClick={() => setMessagingOpen(true)}
                >
                  Message Doctor
                </button>
              </div>
            </div>
          </header>

          {menuOpen && (
            <div className="border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
              <div className="space-y-1 rounded-2xl border border-slate-200 p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      end={item.end}
                      onClick={closeMenu}
                      className={navLinkClass}
                    >
                      <Icon size={18} />
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
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        {!messagingOpen && (
          <button
            onClick={() => setMessagingOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#006565] text-white shadow-lg transition-colors hover:bg-[#005454]"
            aria-label="Open messaging"
          >
            <MessageSquare size={24} />
          </button>
        )}

        {messagingOpen && (
          <div className="flex h-[32rem] w-[28rem] flex-col overflow-hidden rounded-2xl border border-[#e6eaef] bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#006565] p-4 text-white">
              <h3 className="font-bold">Messages</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearChat}
                  className="rounded-lg p-1 transition-colors hover:bg-[#005454]"
                  title="Clear chat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setMessagingOpen(false)}
                  className="rounded-lg p-1 transition-colors hover:bg-[#005454]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[#f4f6f8] p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      msg.sender === "You"
                        ? "bg-[#006565] text-white"
                        : "border border-[#e6eaef] bg-white text-[#1f2a44]"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p
                      className={`mt-1 text-xs ${
                        msg.sender === "You"
                          ? "text-teal-100"
                          : "text-[#62708b]"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-[#e6eaef] bg-white p-4">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 rounded-lg border border-[#e6eaef] px-4 py-2 text-sm focus:border-[#006565] focus:outline-none focus:ring-2 focus:ring-[#006565]/20"
              />
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center rounded-lg bg-[#006565] px-3 py-2 text-white transition-colors hover:bg-[#005454]"
              >
                <Send size={18} />
              </button>
            </div>

            {confirmClearChat && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                <div className="w-60 rounded-lg border border-[#e6eaef] bg-white p-3 shadow-lg">
                  <h4 className="mb-1 text-sm font-bold text-[#1f2a44]">
                    Clear Chat?
                  </h4>
                  <p className="mb-3 text-xs text-[#62708b]">
                    Delete all messages?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={cancelClear}
                      className="flex-1 rounded-lg border border-[#e6eaef] px-3 py-1.5 text-xs text-[#62708b] transition-colors hover:bg-[#f4f6f8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmClear}
                      className="flex-1 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-600"
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
