"use client";

import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { User, Mail, Phone, Lock, Check, Link2 } from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/services/authServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const router = useRouter();

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "fullName":
        return value.trim().length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email address"
          : "";
      case "phone":
        return !/^\+?[\d\s-()]{10,}$/.test(value) ? "Invalid phone number" : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters" : "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof FormData, value),
      }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof FormData, value),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(newErrors).length === 0) {
      registerUser({
        userName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.password,
      })
        .then((response) => {
          toast.success(response.data.message);
          router.push("/auth/user/signin");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center space-y-6 text-white">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl backdrop-blur-lg border border-white/10 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <Link2
                  className="w-32 h-32 text-indigo-300"
                  strokeWidth={1.5}
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-xl">
                <Check className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Simplify Your Links
            </h2>
            <p className="text-lg text-slate-300 text-center max-w-md">
              Join thousands of users who trust Shortify to manage and track
              their shortened URLs with ease.
            </p>
          </div>

          {/* Right side form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 sm:p-10">
              {/* Mobile logo */}
              <div className="lg:hidden flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Link2 className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Create Your Account
                </h1>
                <p className="text-slate-300">
                  Join Shortify and start simplifying your links
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  {
                    name: "fullName",
                    label: "Full Name",
                    icon: <User className="h-5 w-5 text-slate-400" />,
                    type: "text",
                    placeholder: "John Doe",
                  },
                  {
                    name: "email",
                    label: "Email",
                    icon: <Mail className="h-5 w-5 text-slate-400" />,
                    type: "email",
                    placeholder: "john@example.com",
                  },
                  {
                    name: "phone",
                    label: "Phone Number",
                    icon: <Phone className="h-5 w-5 text-slate-400" />,
                    type: "tel",
                    placeholder: "+1 (555) 000-0000",
                  },
                  {
                    name: "password",
                    label: "Password",
                    icon: <Lock className="h-5 w-5 text-slate-400" />,
                    type: "password",
                    placeholder: "••••••••",
                  },
                  {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    icon: <Lock className="h-5 w-5 text-slate-400" />,
                    type: "password",
                    placeholder: "••••••••",
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-slate-200 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {field.icon}
                      </div>
                      <input
                        type={field.type}
                        name={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`block w-full pl-10 pr-3 py-3 border ${
                          errors[field.name as keyof FormErrors] &&
                          touched[field.name]
                            ? "border-red-500"
                            : "border-white/20"
                        } rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                        placeholder={field.placeholder}
                      />
                    </div>
                    {errors[field.name as keyof FormErrors] &&
                      touched[field.name] && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors[field.name as keyof FormErrors]}
                        </p>
                      )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                >
                  Register
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-300">
                  Already have an account?{" "}
                  <Link
                    href="/auth/user/signin"
                    className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
