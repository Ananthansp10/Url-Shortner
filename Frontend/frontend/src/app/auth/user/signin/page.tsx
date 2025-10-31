"use client";

import { useState } from "react";
import { Mail, Lock, Link2, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { loginUser } from "@/services/authServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/slice/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      loginUser({ email: formData.email, password: formData.password })
        .then((response) => {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.data)
          );
          toast.success(response.data.message);
          dispatch(login(response.data.data));
          router.push("/user/dashboard");
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Sign In Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-lg mb-4 transform hover:scale-110 transition-transform duration-300">
              <Link2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-purple-200 text-center">
              Sign in to continue shortening your URLs
            </p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl backdrop-blur-sm">
              <p className="text-green-200 text-center font-medium">
                Successfully signed in!
              </p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-purple-100 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border ${
                    errors.email ? "border-red-400" : "border-white/20"
                  } rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-purple-100 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-white/10 border ${
                    errors.password ? "border-red-400" : "border-white/20"
                  } rounded-xl px-12 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-purple-200">
              Don't have an account?{" "}
              <Link
                href="/auth/user/signup"
                className="text-white font-semibold hover:underline transition-all duration-200"
              >
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-20 -z-10"></div>
      </div>
    </div>
  );
}
