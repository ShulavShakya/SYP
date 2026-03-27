import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicAPI } from "../../auth/config/api";
import { useAuth } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import ToastProvider from "../../auth/config/ToastProvider";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
  HeartPulse,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await publicAPI.post("/users/login/", {
        username: email,
        password,
      });

      const { access, refresh, role, username } = res.data;
      console.log("Login response:", res.data);

      login({
        access,
        refresh,
        role,
        username,
        keepSignedIn,
      });

      toast.success("Login successful!");

      setTimeout(() => {
        if (role === "patient") navigate("/patient");
        else if (role === "doctor") navigate("/doctor");
        else if (role === "receptionist") navigate("/reception");
        else if (role === "admin") navigate("/admin");
        else toast.error("Unknown role returned from server.");
      }, 800);
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);

      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.detail ||
        "Login failed";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastProvider />

      <div className="flex min-h-screen flex-col bg-[#F7FAFA] text-[#2C3E50]">
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
                Welcome to Upachaar
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-[#7F8C8D] lg:text-lg">
                Sign in to access the secure hospital management portal.
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

                <form
                  onSubmit={handleSubmit}
                  className="mx-auto max-w-sm space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-bold text-[#2C3E50]">
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          size={18}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F8C8D]"
                        />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-[#E0E6ED] bg-[#F7FAFA] py-3 pl-10 pr-4 text-sm font-medium text-[#2C3E50] outline-none transition placeholder:text-[#7F8C8D] focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
                          required
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
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((prev) => !prev)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                          aria-label={
                            showPw ? "Hide password" : "Show password"
                          }
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

                  <button
                    type="submit"
                    disabled={loading}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-bold text-white shadow-lg transition ${
                      loading
                        ? "cursor-not-allowed bg-slate-400 shadow-slate-300"
                        : "bg-[#008080] shadow-[#008080]/20 hover:bg-[#006666]"
                    }`}
                  >
                    <span>
                      {loading ? "Signing In..." : "Sign In to Upachaar"}
                    </span>
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
    </>
  );
}
