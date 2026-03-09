import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  HeartPulse,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [err, setErr] = useState("");

  const pwMismatch = useMemo(() => {
    return (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    );
  }, [form.password, form.confirmPassword]);

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.dob.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      !pwMismatch &&
      form.agree
    );
  }, [form, pwMismatch]);

  const onChange = (key) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((p) => ({ ...p, [key]: v }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.dob ||
      !form.password
    ) {
      setErr("Please fill all required fields.");
      return;
    }
    if (pwMismatch) {
      setErr("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      setErr("Please accept the terms to continue.");
      return;
    }

    // UI-only: go to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-slate-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#008080]/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008080]/10">
              <HeartPulse className="text-[#008080]" size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              MedFlow
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden text-sm font-medium text-slate-600 sm:block">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#008080] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#007070]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#f0fdfa] to-white px-4 pb-12 pt-6 md:pb-20 md:pt-10">
        <div className="flex w-full flex-col items-center gap-8 py-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
              Create your account
            </h1>
            <p className="mx-auto max-w-xl text-lg text-slate-500">
              Join our medical community for seamless wellness management.
            </p>
          </div>

          <div className="w-full max-w-[640px] rounded-2xl border border-[#008080]/5 bg-white p-8 shadow-xl md:p-12">
            {/* Back */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#008080]"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back
              </button>
            </div>

            {/* Error */}
            {err && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {err}
              </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="Full Name"
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  placeholder="John Doe"
                  icon={<User size={18} />}
                />

                <Field
                  label="Email Address"
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="email@example.com"
                  icon={<Mail size={18} />}
                  type="email"
                />

                <Field
                  label="Phone Number"
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="+1 (555) 000-0000"
                  icon={<Phone size={18} />}
                  type="tel"
                />

                <Field
                  label="Date of Birth"
                  value={form.dob}
                  onChange={onChange("dob")}
                  icon={<Calendar size={18} />}
                  type="date"
                />

                <PasswordField
                  label="Password"
                  value={form.password}
                  onChange={onChange("password")}
                  show={showPw}
                  setShow={setShowPw}
                />

                <PasswordField
                  label="Confirm Password"
                  value={form.confirmPassword}
                  onChange={onChange("confirmPassword")}
                  show={showCpw}
                  setShow={setShowCpw}
                  error={pwMismatch ? "Passwords do not match" : ""}
                />
              </div>

              <Field
                label="Residential Address"
                value={form.address}
                onChange={onChange("address")}
                placeholder="123 Medical Way, Health City, HC 12345"
                icon={<MapPin size={18} />}
              />

              <label className="flex items-start gap-3 pt-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.agree}
                  onChange={onChange("agree")}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#008080] focus:ring-[#008080]"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#008080] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#008080] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-slate-200" />
                <span className="mx-4 shrink-0 text-xs font-bold uppercase tracking-widest text-slate-400">
                  OR
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              <button
                type="button"
                className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
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
                Continue with Google
              </button>

              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "group flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-lg transition-all",
                  canSubmit
                    ? "bg-[#008080] shadow-[#008080]/20 hover:bg-[#007070]"
                    : "cursor-not-allowed bg-slate-300 shadow-none",
                ].join(" ")}
              >
                Create Account
                <ArrowRight
                  size={18}
                  className={`transition-transform ${canSubmit ? "group-hover:translate-x-1" : ""}`}
                />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#008080]/5 bg-white py-6 text-center">
        <p className="text-xs text-slate-400">
          © 2024 MedFlow Health Systems. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function Field({ label, icon, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
          {...props}
        />
      </div>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, setShow, error }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>

      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock size={18} />
        </span>

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          autoComplete="new-password"
          className={[
            "w-full rounded-xl border bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:ring-2",
            error
              ? "border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border-slate-200 focus:border-[#008080] focus:ring-[#008080]/20",
          ].join(" ")}
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error ? (
        <div className="text-[11px] font-semibold text-red-700">{error}</div>
      ) : null}
    </div>
  );
}
