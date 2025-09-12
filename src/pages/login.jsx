import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://booking-hotels-back-end-api.vercel.app/api/Auth/login",
        { email, password },
        { withCredentials: true }
      );

      login(response.data.user); // حفظ بيانات المستخدم
      toast.success("✅ تم تسجيل الدخول بنجاح!");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/"); // يوديك للهوم
      }, 1000);
    } catch (error) {
      console.error(
        "❌ فشل تسجيل الدخول:",
        error.response ? error.response.data.message : error.message
      );
      toast.error(error.response?.data?.message || "❌ البريد أو كلمة المرور غير صحيحة.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* الفورم */}
      <div
        className={`flex-1 flex justify-center items-center transition-transform duration-700 ease-in-out ${
          animate ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"
        }`}
      >
        <div className="w-full max-w-lg p-8 rounded-2xl shadow-lg bg-blue-900">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            تسجيل الدخول
          </h2>

          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-white">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg mb-4 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block mb-2 text-white">كلمة المرور</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg mb-6 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 rounded-lg text-white font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition"
              >
                تسجيل الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
