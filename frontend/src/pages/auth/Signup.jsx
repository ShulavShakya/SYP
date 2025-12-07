import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { publicAPI } from "../utils/config";
// import { toast } from "react-toastify";
// import Cookies from "js-cookie";
// import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (password !== confirmPassword)
  //       return toast.error("Passwords do not match");
  //     if (password.length < 8)
  //       return toast.error("Password must be at least 8 characters");

  //     try {
  //   const res = await publicAPI.post("/user/register", {
  //     name,
  //     email,
  //     password,
  //   });
  //   const user = res.data.user;
  //   const token = res.data.data.token;
  //   Cookies.set("user", JSON.stringify(user));
  //   Cookies.set("token", token);
  //   toast.success("Registered successfully");
  //   navigate("/user-dashboard");
  // } catch (error) {
  //   toast.error("Registration failed");
  // }
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
        <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl sm:w-lg lg:w-full md:w-full">
          {/* Illustration Section */}
          <div className="hidden md:flex md:w-1/2 bg-linear-to-b from-[#166FE5] to-[#1A73E8] flex-col items-center justify-center p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Join CureCloud</h2>
            <p className="text-lg text-white/90 text-center"></p>
            {/* <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=400&q=80"
              alt="Library Illustration"
              className="mt-6 rounded-xl shadow-lg"
            /> */}
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-16 max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-[#111827] text-center">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166FE5] text-gray-900"
                />
              </div>

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
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166FE5] text-gray-900"
                />
              </div>

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
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166FE5] text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827]"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166FE5] text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827]"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#166FE5] hover:bg-[#1A73E8] text-white font-semibold py-4 rounded-xl transition-all shadow-md"
              >
                Register
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                className="text-[#166FE5] font-semibold hover:text-[#1A73E8]"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
