import React, { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarClock,
  CircleUserRound,
  ClipboardCheck,
  CreditCard,
  Heart,
  LogOut,
  Menu,
  Search,
  UserCog,
  X,
} from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/reception", icon: UserCog, end: true },
  {
    label: "Approvals",
    to: "/reception/approvals",
    icon: ClipboardCheck,
    end: true,
  },
  {
    label: "Messages",
    to: "/reception/messages",
    icon: Bell,
  },
  {
    label: "Patient Records",
    to: "/reception/records",
    icon: CalendarClock,
    end: true,
  },
  {
    label: "Appointments",
    to: "/reception/appointments",
    icon: CalendarClock,
    end: true,
  },
  {
    label: "Billing",
    to: "/reception/billing",
    icon: CreditCard,
  },
];

const pageTitles = {
  "/reception": "Hello Receptionist, welcome back!",
  "/reception/approvals": "Appointment Approvals",
  "/reception/assign": "Assign Doctor",
  "/reception/billing": "Billing Management",
  "/reception/records": "Patient Records",
  "/reception/appointments": "Manage Appointments",
  "/reception/messages": "Messages",
};

function toNameFromEmail(email) {
  if (!email) return "Reception Staff";
  const head =
    email.split("@")[0]?.replace(/[._-]+/g, " ") || "Reception Staff";
  return head
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk[0].toUpperCase() + chunk.slice(1))
    .join(" ");
}

export default function ReceptionistLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hideTopbar, setHideTopbar] = useState(false);

  const [notifications] = useState([
    {
      id: 1,
      message: "3 new appointment approvals are waiting.",
      time: "15 minutes ago",
    },
    {
      id: 2,
      message: "A doctor assignment request needs review.",
      time: "1 hour ago",
    },
    {
      id: 3,
      message: "Billing record updated successfully.",
      time: "Today",
    },
  ]);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const displayName = useMemo(
    () => toNameFromEmail(user?.email),
    [user?.email],
  );

  const title = useMemo(() => {
    return pageTitles[location.pathname] || "Reception Dashboard";
  }, [location.pathname]);

  React.useEffect(() => {
    setNotificationsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

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

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <div className="flex h-screen w-full">
        <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[#e6eaef] bg-white lg:flex">
          <div className="flex items-center gap-3 p-8">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#0b8a8e] text-white">
              <Heart size={24} />
            </div>
            <span
              className="cursor-pointer text-xl font-bold tracking-tight text-[#0b8a8e]"
              onClick={() => navigate("/")}
            >
              Upachaar
            </span>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-4 rounded-xl px-4 py-3 font-semibold transition-colors",
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

          <div className="flex flex-col items-center border-t border-[#e6eaef] p-6">
            <div className="flex w-full items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d4ecec]">
                <CircleUserRound size={24} className="text-[#0b8a8e]" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#1f2a44]">
                  Dr. {displayName}
                </p>
                <p className="truncate text-xs text-[#62708b]">
                  General Physician
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="mt-4 w-full rounded-lg bg-[#0b8a8e] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#096d72]"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex flex-1 flex-col overflow-y-auto">
          {!hideTopbar && (
            <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-10">
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
                <div className="relative bg-slate-100">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-48 rounded-lg border border-[#e6eaef] py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0b8a8e]"
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#62708b]" />
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
                    <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-lg border border-[#e6eaef] bg-white shadow-lg">
                      <div className="border-b border-[#e6eaef] p-4">
                        <h4 className="font-bold text-[#1f2a44]">
                          Notifications
                        </h4>
                      </div>

                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className="cursor-pointer border-b border-[#e6eaef] p-4 hover:bg-[#f4f6f8]"
                          >
                            <p className="text-sm text-[#1f2a44]">
                              {notif.message}
                            </p>
                            <p className="mt-1 text-xs text-[#62708b]">
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

                <div className="border-l border-[#e1e7ef] pl-6">
                  <p className="text-sm font-bold leading-none text-[#1f2a44]">
                    {today}
                  </p>
                </div>
              </div>
            </header>
          )}

          {!hideTopbar && menuOpen && (
            <div className="px-4 pb-3 lg:hidden">
              <div className="space-y-1 rounded-2xl border border-[#dbe2ea] bg-white p-2">
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
                          "flex items-center gap-4 rounded-xl px-4 py-3 font-semibold transition-colors",
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
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dbe2ea] px-4 py-3 font-semibold text-[#62708b]"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}

          <div className="flex-1">
            <Outlet context={{ setHideTopbar }} />
          </div>
        </main>
      </div>
    </div>
  );
}
