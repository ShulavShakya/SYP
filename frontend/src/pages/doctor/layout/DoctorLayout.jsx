import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  CircleUserRound,
  FileText,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  X,
  Send,
  Trash2,
  Search,
  Users,
  LayoutDashboard,
  Stethoscope,
  HelpCircle,
  HeartPulse,
} from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/doctor", icon: LayoutDashboard, end: true },
  { label: "Patients", to: "/doctor/patient-queue", icon: Users },
  {
    label: "Consultation",
    to: "/doctor/consultations",
    icon: Stethoscope,
  },
  { label: "Profile", to: "/doctor/profile", icon: Settings },
];

function toNameFromEmail(email) {
  if (!email) return "Doctor";
  const head = email.split("@")[0]?.replace(/[._-]+/g, " ") || "Doctor";
  return head
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1))
    .join(" ");
}

export default function DoctorLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = useMemo(
    () => [
      {
        id: 1,
        message: "You have 3 appointments scheduled for this afternoon.",
        time: "30 mins ago",
      },
      {
        id: 2,
        message: "New lab report received from Emma Wilson.",
        time: "2 hours ago",
      },
      {
        id: 3,
        message: "Payment for consultation has been completed.",
        time: "1 day ago",
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
    () => displayName.split(" ")[0] || "Doctor",
    [displayName],
  );

  const title = useMemo(() => {
    if (location.pathname === "/doctor") {
      return `Welcome back, Dr. ${firstName}`;
    }

    if (location.pathname === "/doctor/patient-queue") {
      return "My Patients";
    }

    if (location.pathname.startsWith("/doctor/consultations")) {
      return "Consultation Session";
    }

    if (location.pathname === "/doctor/profile") {
      return "Profile Settings";
    }

    return `Welcome back, Dr. ${firstName}`;
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
              onClick={() => navigate("/doctor")}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008080]/10">
                <HeartPulse className="text-[#008080]" size={22} />
              </div>

              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight text-teal-800">
                  Upachaar Doctor
                </h1>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Doctor Portal
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
                    Dr. {displayName}
                  </p>
                  <p className="text-[11px] font-medium text-slate-500">
                    General Physician
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
                    placeholder="Search patients, consultations, or reports..."
                    className="w-full rounded-xl border-none bg-[#f1f4f4] py-2 pl-10 pr-4 text-sm text-[#181c1d] outline-none ring-0 placeholder:text-slate-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative ">
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

                      <div className="max-h-72 overflow-y-auto z-10000">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="border-b border-slate-100 px-4 py-3 hover:bg-slate-50"
                          >
                            <p className="text-sm text-[#181c1d]">
                              {notif.message}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {notif.time}
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
    </div>
  );
}
