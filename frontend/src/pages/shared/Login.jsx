import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Stethoscope,
  LogIn,
  ArrowLeft,
  HeartPulse,
  ClipboardPlus,
  ShieldCheck,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("patient");
  const [staffRole, setStaffRole] = useState("doctor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const effectiveRole = useMemo(() => {
    if (role === "staff") return staffRole;
    return role;
  }, [role, staffRole]);

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      role: effectiveRole,
      primaryRole: role,
      subRole: role === "staff" ? staffRole : null,
    });

    if (effectiveRole === "patient") navigate("/patient");
    else if (effectiveRole === "doctor") navigate("/doctor");
    else if (effectiveRole === "receptionist") navigate("/reception");
    else if (effectiveRole === "admin") navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#F7FAFA] text-[#2C3E50] flex flex-col">
      <header className="sticky top-0 z-50 border-b border-[#008080]/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008080]/10">
              <HeartPulse className="text-[#008080]" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#1F2937]">
                Upachaar
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="hidden text-sm font-medium text-slate-500 sm:block">
              New here?
            </p>
            <Link
              to="/patient/signup"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#008080] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#006d6d]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 lg:px-6">
        <div className="flex w-full max-w-5xl flex-col items-center gap-10 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#2C3E50] lg:text-5xl">
              Welcome to MedFlow
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#7F8C8D] lg:text-lg">
              Please select your administrative role to access the secure
              hospital management portal.
            </p>
          </div>

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E0E6ED] bg-white shadow-xl">
            <div className="p-6 lg:p-8">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="mb-8 flex items-center gap-2 text-xs font-bold text-[#7F8C8D] transition hover:text-[#008080]"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <div className="mx-auto mb-6 grid max-w-sm grid-cols-3 gap-3">
                <RoleCard
                  active={role === "patient"}
                  onClick={() => setRole("patient")}
                  icon={<User size={18} />}
                  label="Patient"
                />
                <RoleCard
                  active={role === "staff"}
                  onClick={() => setRole("staff")}
                  icon={<Stethoscope size={18} />}
                  label="Staff"
                />
                <RoleCard
                  active={role === "admin"}
                  onClick={() => setRole("admin")}
                  icon={<ShieldCheck size={18} />}
                  label="Admin"
                />
              </div>

              {role === "staff" && (
                <div className="mx-auto mb-10 max-w-sm">
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#7F8C8D]">
                    Select staff role
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <RoleCard
                      active={staffRole === "doctor"}
                      onClick={() => setStaffRole("doctor")}
                      icon={<Stethoscope size={18} />}
                      label="Doctor"
                    />
                    <RoleCard
                      active={staffRole === "receptionist"}
                      onClick={() => setStaffRole("receptionist")}
                      icon={<ClipboardPlus size={18} />}
                      label="Receptionist"
                    />
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-sm space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold text-[#2C3E50]">
                      Email or Username
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F8C8D]"
                      />
                      <input
                        type="text"
                        placeholder="Enter your credentials"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] py-3 pl-10 pr-4 text-sm font-medium text-[#2C3E50] outline-none transition placeholder:text-[#7F8C8D] focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold text-[#2C3E50]">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F8C8D]"
                      />
                      <input
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] py-3 pl-10 pr-11 text-sm font-medium text-[#2C3E50] outline-none transition placeholder:text-[#7F8C8D] focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((prev) => !prev)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                      >
                        {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#008080] focus:ring-[#008080]"
                    />
                    <span className="text-xs text-[#7F8C8D]">
                      Keep me signed in
                    </span>
                  </label>

                  <button
                    type="button"
                    className="text-xs font-bold text-[#008080] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative flex items-center gap-3 py-1">
                  <div className="flex-grow border-t border-[#E0E6ED]" />
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#7F8C8D]">
                    or
                  </span>
                  <div className="flex-grow border-t border-[#E0E6ED]" />
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#E0E6ED] bg-white py-3 text-sm font-bold text-[#2C3E50] shadow-sm transition hover:bg-slate-50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#008080] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#008080]/20 transition hover:bg-[#006666]"
                >
                  <span>Sign In to MedFlow</span>
                  <LogIn size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-sm text-[#7F8C8D]">
        <div className="flex items-center justify-center gap-6">
          <button type="button" className="transition hover:text-[#008080]">
            Privacy Policy
          </button>
          <button type="button" className="transition hover:text-[#008080]">
            Terms of Service
          </button>
          <button type="button" className="transition hover:text-[#008080]">
            Help Center
          </button>
        </div>
      </footer>
    </div>
  );
}

function RoleCard({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full flex-col items-center rounded-xl border p-4 text-center transition-all ${
        active
          ? "border-2 border-[#008080] bg-[#008080]/5 text-[#008080] shadow-sm ring-2 ring-[#008080]/10 ring-offset-2"
          : "border border-[#E0E6ED] bg-slate-50 text-[#7F8C8D] hover:border-[#008080] hover:bg-[#008080]/5 hover:shadow-md"
      }`}
    >
      <span
        className={`mb-1 ${
          active
            ? "text-[#008080]"
            : "text-[#7F8C8D] group-hover:text-[#008080]"
        }`}
      >
        {icon}
      </span>
      <span
        className={`text-[11px] font-bold ${
          active
            ? "text-[#2C3E50]"
            : "text-[#2C3E50] group-hover:text-[#008080]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
