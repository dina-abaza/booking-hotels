import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [animate, setAnimate] = useState(false);
  const [lineAnimate, setLineAnimate] = useState(false);
  const login = useAuthStore((state) => state.login); // 👈 من الستور
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    const lineTimer = setTimeout(() => setLineAnimate(true), 400);
    return () => {
      clearTimeout(timer);
      clearTimeout(lineTimer);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://booking-hotels-back-end-api.vercel.app/api/Auth/register",
        { email, password },
        { withCredentials: true }
      );

      // نجاح ✅
      login(res.data.user); // يخزن اليوزر في Zustand
      toast.success("✅ تم إنشاء الحساب بنجاح!");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/"); // يوديك للهوم
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "❌ حدث خطأ أثناء التسجيل. حاول مرة أخرى."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* القسم الشمال */}
      <div
        className={`flex-1 flex flex-col justify-center items-center transition-transform duration-700 ease-in-out ${
          animate ? "translate-x-0 opacity-100" : "-translate-x-40 opacity-0"
        }`}
      >
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4">مرحبـــًا</h1>
        <div
          className={`h-1 bg-blue-900 rounded transition-all duration-1000 ${
            lineAnimate ? "w-40" : "w-0"
          }`}
        ></div>
        <p className="mt-6 text-gray-700 text-center max-w-md mb-5">
          اكتشف أفضل العروض لحجز الفنادق بسهولة وسرعة.
          <br /> نمنحك تجربة مميزة ومريحة.
        </p>
        <Link
          to="/about"
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          اقرأ المزيد
        </Link>
      </div>

      {/* القسم اليمين (الفورم) */}
      {/* القسم اليمين (الفورم) */}
<div
  className={`flex-1 flex justify-center items-center transition-transform duration-700 ease-in-out ${
    animate ? "translate-x-0 opacity-100" : "translate-x-40 opacity-0"
  }`}
>
  <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-lg bg-blue-900
                  min-h-[60vh] sm:min-h-[70vh] md:min-h-[auto]">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
      إنشاء حساب
    </h2>

    <form onSubmit={handleRegister}>
      <label className="block mb-2 text-white text-sm sm:text-base">البريد الإلكتروني</label>
      <input
        type="email"
        className="w-11/12 sm:w-full p-2 sm:p-3 rounded-lg mb-4 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="block mb-2 text-white text-sm sm:text-base">كلمة المرور</label>
      <input
        type="password"
        className="w-11/12 sm:w-full p-2 sm:p-3 rounded-lg mb-6 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-11/12 sm:w-full py-2 sm:py-3 rounded-lg text-white font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 transition"
      >
        إنشاء حساب
      </button>
    </form>
  </div>
</div>

    </div>
  );
}
