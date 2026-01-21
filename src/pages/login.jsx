import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const [lineAnimate, setLineAnimate] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    const lineTimer = setTimeout(() => setLineAnimate(true), 400);
    return () => {
      clearTimeout(timer);
      clearTimeout(lineTimer);
    };
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
      toast.error(
        error.response?.data?.message || "❌ البريد أو كلمة المرور غير صحيحة."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white mt-28 md:mt-12">
      {/* القسم الشمال */}
      <div
        className={`flex-1 flex flex-col justify-center items-center transition-transform duration-700 ease-in-out ${
          animate ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"
        }`}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-[#f5d37b]">مرحبـــًا</h1>
        <div
          className={`h-1 bg-[#f5d37b] rounded transition-all duration-1000 ${
            lineAnimate ? "w-40" : "w-0"
          }`}
        ></div>
        <p className="mt-6 text-gray-300 text-center max-w-md mb-5">
          سجّل دخولك لحسابك واستمتع بأفضل العروض لحجز الفنادق بسهولة وسرعة.
          <br /> نمنحك تجربة مميزة ومريحة.
        </p>
        <Link
          to="/about"
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-[#c9a24d] to-[#f5d37b] text-black font-semibold shadow-md hover:opacity-90 transition"
        >
          اقرأ المزيد
        </Link>
      </div>

      {/* القسم اليمين (الفورم) */}
      <div
        className={`flex-1 flex justify-center items-center mt-8 md:mt-0 transition-transform duration-700 ease-in-out px-4 sm:px-0 ${
          animate ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"
        }`}
      >
        <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg bg-[#3a2a16] min-h-[60vh] sm:min-h-[70vh]">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#f5d37b]">
            تسجيل الدخول
          </h2>

          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm sm:text-base">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-11/12 sm:w-full p-2 sm:p-3 rounded-lg mb-4 bg-black/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f5d37b]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="block mb-2 text-sm sm:text-base">كلمة المرور</label>
            <input
              type="password"
              className="w-11/12 sm:w-full p-2 sm:p-3 rounded-lg mb-6 bg-black/50 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f5d37b]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-11/12 sm:w-full py-2 sm:py-3 rounded-lg text-black font-bold bg-gradient-to-r from-[#c9a24d] to-[#f5d37b] hover:opacity-90 transition"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
