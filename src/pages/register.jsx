
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://192.168.1.9:4000/users", {
        email,
        password,
      });

      setMessage("✅ تم التسجيل بنجاح. سيتم تحويلك إلى صفحة تسجيل الدخول...");
      setEmail("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.error("حدث خطأ أثناء التسجيل:", error);
      setMessage("❌ حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    }
  };

  return (
    <div
      className={`max-w-md mx-auto mt-16 p-6 bg-white rounded shadow transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">إنشاء حساب</h2>

      <form onSubmit={handleRegister}>
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
          className="bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600 transition"
        >
          إنشاء حساب
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
