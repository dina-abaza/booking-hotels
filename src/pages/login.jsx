import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(
        `http://192.168.1.9:4000/users?email=${email}&password=${password}`
      );

      if (res.data.length > 0) {
        const user = res.data[0];
        login(user);
        setMessage("✅ تم تسجيل الدخول بنجاح!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage("❌ بيانات الدخول غير صحيحة.");
      }
    } catch (error) {
      console.error("فشل تسجيل الدخول:", error);
      setMessage("❌ حدث خطأ أثناء تسجيل الدخول.");
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-16 p-6 bg-white rounded shadow transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>

      <form onSubmit={handleLogin}>
        <label className="block mb-2">البريد الإلكتروني</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">كلمة المرور</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition"
        >
          تسجيل الدخول
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
