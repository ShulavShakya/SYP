import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ClipboardCheck,
  CreditCard,
  LogOut,
  Menu,
  Stethoscope,
  UserCog,
  X,
} from "lucide-react";
import { useAuth } from "../../../auth/AuthContext";

const navItem = ({ isActive }) =>
  [
    "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-black transition-colors",
    isActive
      ? "bg-[#1E88E5]/10 text-[#1E88E5]"
      : "text-slate-600 hover:bg-slate-50",
  ].join(" ");

export default function ReceptionistLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  const Links = ({ onNavigate }) => (
    <>
      <NavLink to="/reception" end className={navItem} onClick={onNavigate}>
        <ClipboardCheck size={16} />
        Approvals
      </NavLink>

      <NavLink to="/reception/assign" className={navItem} onClick={onNavigate}>
        <Stethoscope size={16} />
        Assign Doctor
      </NavLink>

      <NavLink to="/reception/billing" className={navItem} onClick={onNavigate}>
        <CreditCard size={16} />
        Billing
      </NavLink>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F4F8FB]">
      {/* Topbar (tablet + mobile) */}
      <header className="lg:hidden bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#1E88E5] flex items-center justify-center shadow">
              <UserCog size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-black text-[#263238] leading-tight">
                Reception
              </div>
              <div className="text-xs font-semibold text-[#607D8B] truncate max-w-[160px]">
                {user?.email || "staff@hospital.com"}
              </div>
            </div>
          </div>

          {/* Tablet nav */}
          <nav className="hidden sm:flex items-center gap-2">
            <Links />
            <button
              onClick={onLogout}
              className="ml-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-black text-slate-600 hover:bg-slate-50 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </nav>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="sm:hidden rounded-xl border border-slate-200 px-2.5 py-2 text-slate-600 hover:bg-slate-50"
            aria-label="Open menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="sm:hidden px-4 pb-3">
            <div className="mt-2 bg-white border border-slate-200 rounded-2xl p-2 space-y-1">
              <Links onNavigate={() => setOpen(false)} />
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-black text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Desktop layout */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar desktop */}
          <aside className="hidden lg:block bg-white border border-slate-200 rounded-2xl p-4 h-fit sticky top-6">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-10 h-10 rounded-xl bg-[#1E88E5] flex items-center justify-center shadow">
                <UserCog className="text-white" size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-[#263238]">
                  Reception
                </div>
                <div className="text-xs font-semibold text-[#607D8B] truncate max-w-[160px]">
                  {user?.email || "staff@hospital.com"}
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Links />
              <button
                onClick={onLogout}
                className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-black text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </aside>

          <section className="space-y-4">
            <div className="hidden lg:flex bg-white border border-slate-200 rounded-2xl p-4 items-center justify-between">
              <div>
                <div className="text-sm font-black text-[#263238]">
                  Reception Dashboard
                </div>
                <div className="text-xs font-semibold text-[#607D8B]">
                  Approve requests, assign doctors, manage billing.
                </div>
              </div>
              <div className="text-xs font-bold text-[#607D8B]">
                Role: <span className="text-[#263238]">Staff</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <Outlet />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
