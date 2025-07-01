import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [animate, setAnimate] = useState(false);  // هنا

  useEffect(() => {
    const pendingBooking = localStorage.getItem("pendingBooking");
    if (pendingBooking) {
      setBooking(JSON.parse(pendingBooking));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      setError("يرجى ملء جميع بيانات البطاقة.");
      return;
    }

    if (cardNumber.length !== 16) {
      setError("رقم البطاقة غير صحيح.");
      return;
    }

    setError("");

    try {
      await axios.post("http://localhost:4000/bookings", booking);

      setMessage("تم الدفع بنجاح! شكراً لحجزك.");
      localStorage.removeItem("pendingBooking");
      navigate("/");
    } catch (err) {
      setMessage("حدث خطأ أثناء الدفع. حاول مرة أخرى.");
      console.error(err);
    }
  };

  if (!booking) return null;

  return (
    <div
      className={`max-w-md mx-auto p-6 bg-white shadow rounded mt-16 transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-500">تفاصيل الدفع</h2>

      <p>حجز الفندق: <strong className="text-blue-500">{booking.hotelName}</strong></p>
      <p>عدد الغرف: {booking.rooms}</p>
      <p>عدد الليالي: {booking.nights}</p>
      <p>السعر الإجمالي: <strong className="text-blue-500">{booking.totalPrice} ج.م</strong></p>
      <div className="mt-4">
        <label className="font-bold">اسم صاحب البطاقة:</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="border rounded w-full p-2 mb-3"
        />

        <label className="font-bold">رقم البطاقة:</label>
        <input
          type="text"
          value={cardNumber}
          maxLength={16}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/, ""))}
          className="border rounded w-full p-2 mb-3"
        />

        <label className="font-bold">تاريخ الانتهاء (MM/YY):</label>
        <input
          type="text"
          value={expiryDate}
          placeholder="MM/YY"
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border rounded w-full p-2 mb-3"
        />

        <label className="font-bold">CVV:</label>
        <input
          type="password"
          value={cvv}
          maxLength={3}
          onChange={(e) => setCvv(e.target.value.replace(/\D/, ""))}
          className="border rounded w-full p-2 mb-3"
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}
        {message && <p className="text-green-600 mb-3">{message}</p>}

        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition w-full"
        >
          دفع الآن
        </button>
      </div>
    </div>
  );
}
