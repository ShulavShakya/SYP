import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
// import { publicAPI } from "../utils/config";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await publicAPI.post("/auth/login", { email, password });
  //     const user = res.data.user;
  //     Cookies.set("user", JSON.stringify(user));
  //     Cookies.set("token", res.data.data);
  //     toast.success("Logged in Successfully");
  //     if (user.role === "librarian") navigate("/admin-dashboard");
  //     else navigate(-1);
  //   } catch (error) {
  //     toast.error("Login Failed");
  //     console.error("Error: ", error);
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <>
      <span
        className="absolute top-4 left-4 text-white"
        onClick={() => navigate(-1)}
      >
        {/* <FaArrowLeft /> */}
      </span>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#166FE5] to-[#1A73E8] px-4">
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl sm:w-lg md:w-full lg:w-full">
          {/* Left Illustration (hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 bg-linear-to-b from-[#166FE5] to-[#1A73E8] flex-col items-center justify-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            {/* <p className="text-lg text-white/90 text-center leading-relaxed">
                Access your library account and explore thousands of books at your
                fingertips.
            </p> */}
            {/* <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?fit=crop&w=400&q=80"
              alt="Library Illustration"
              className="mt-8 rounded-xl shadow-lg"
            /> */}
          </div>

          {/* Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-[#111827] text-center mb-8">
              Sign in to CureCloud
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166FE5] text-gray-900"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166FE5] text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#166FE5] hover:bg-[#1A73E8] text-white font-semibold py-3 rounded-xl transition-all shadow-md"
              >
                Login
              </button>
            </form>

            {/* Footer */}
            <p className="text-center mt-8 text-gray-500">
              Don't have an account?{" "}
              <button
                className="text-[#166FE5] font-semibold hover:text-[#1A73E8]"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
