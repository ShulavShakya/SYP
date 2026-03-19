import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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
  Image as ImageIcon,
  Shield,
  Users,
} from "lucide-react";

export default function PatientSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    agree: false,
  });

  const [imagePreview, setImagePreview] = useState("");
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
      form.gender.trim() &&
      form.address.trim() &&
      form.emergencyContactName.trim() &&
      form.emergencyContactPhone.trim() &&
      form.password.trim() &&
      form.confirmPassword.trim() &&
      !pwMismatch &&
      form.agree
    );
  }, [form, pwMismatch]);

  const onChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profileImage: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.dob ||
      !form.gender ||
      !form.address ||
      !form.emergencyContactName ||
      !form.emergencyContactPhone ||
      !form.password ||
      !form.confirmPassword
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

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-[#008080]/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008080]/10">
              <HeartPulse className="text-[#008080]" size={22} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">MedFlow</h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="hidden text-sm font-medium text-slate-600 sm:block">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-[#008080] px-5 text-sm font-bold text-white transition hover:bg-[#007070]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="bg-gradient-to-b from-[#f0fdfa] to-white px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Create your patient account
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-500">
              Register once to manage appointments, prescriptions, billing, and
              medical records in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-[#008080]/5 bg-white p-6 shadow-xl md:p-10">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#008080]"
              >
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back
              </button>
            </div>

            {err && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-8">
              <SectionTitle
                icon={<User size={18} />}
                title="Personal Information"
              />

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
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="john@example.com"
                  icon={<Mail size={18} />}
                />

                <Field
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="+1 (555) 000-0000"
                  icon={<Phone size={18} />}
                />

                <Field
                  label="Date of Birth"
                  type="date"
                  value={form.dob}
                  onChange={onChange("dob")}
                  icon={<Calendar size={18} />}
                />

                <SelectField
                  label="Gender"
                  value={form.gender}
                  onChange={onChange("gender")}
                  icon={<Users size={18} />}
                  options={["Male", "Female", "Other", "Prefer not to say"]}
                />

                <Field
                  label="Residential Address"
                  value={form.address}
                  onChange={onChange("address")}
                  placeholder="123 Medical Way, Health City"
                  icon={<MapPin size={18} />}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  Profile Image
                </label>
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={28} className="text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#008080] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007070]">
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={onImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-2 text-xs text-slate-500">
                        Optional, but helpful for profile identification.
                      </p>
                      {form.profileImage && (
                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {form.profileImage.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <SectionTitle
                icon={<Shield size={18} />}
                title="Emergency Contact"
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field
                  label="Emergency Contact Name"
                  value={form.emergencyContactName}
                  onChange={onChange("emergencyContactName")}
                  placeholder="Jane Doe"
                  icon={<User size={18} />}
                />

                <Field
                  label="Emergency Contact Phone"
                  type="tel"
                  value={form.emergencyContactPhone}
                  onChange={onChange("emergencyContactPhone")}
                  placeholder="+1 (555) 111-2222"
                  icon={<Phone size={18} />}
                />
              </div>

              <SectionTitle
                icon={<Lock size={18} />}
                title="Account Security"
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

              <label className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={onChange("agree")}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#008080] focus:ring-[#008080]"
                />
                <span className="text-sm leading-relaxed text-slate-600">
                  I agree to the{" "}
                  <a href="#" className="text-[#008080] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#008080] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "group flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition-all",
                  canSubmit
                    ? "bg-[#008080] hover:bg-[#007070]"
                    : "cursor-not-allowed bg-slate-300",
                ].join(" ")}
              >
                Create Account
                <ArrowRight
                  size={18}
                  className={
                    canSubmit
                      ? "transition-transform group-hover:translate-x-1"
                      : ""
                  }
                />
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#008080]/5 bg-white py-6 text-center">
        <p className="text-xs text-slate-400">
          © 2024 MedFlow Health Systems. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
      <span className="text-[#008080]">{icon}</span>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
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

function SelectField({ label, icon, options, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </span>

        <select
          className="h-[48px] w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition-all focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
          {...props}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          ▾
        </span>
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
