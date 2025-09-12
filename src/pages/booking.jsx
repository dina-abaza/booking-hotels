import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHotel } from "react-icons/fa";
import UseVerifyToken from "../hooks/useVerifyToken";

export default function Booking() {
  UseVerifyToken();
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [buttonAnimate, setButtonAnimate] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(
          `https://booking-hotels-back-end-api.vercel.app/api/hotels/${id}`
        );
        setHotel(res.data);
        setLoading(false);

        setTimeout(() => {
          setAnimate(true);
        }, 100);

        setTimeout(() => {
          setButtonAnimate(true);
        }, 800); // ⬅ بعد 0.8 ثانية يظهر الزرار بسلاسة
      } catch (error) {
        console.error("فشل تحميل بيانات الفندق:", error);
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const totalPrice = hotel ? hotel.price * nights * rooms : 0;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setError("يرجى اختيار تواريخ الدخول والخروج");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("تاريخ الخروج يجب أن يكون بعد تاريخ الدخول");
      return;
    }
    setError("");
    setShowPopup(true);
  };

  const confirmBooking = () => {
    const bookingData = {
      hotelId: hotel._id,
      rooms,
      guests,
      nights,
      checkIn,
      checkOut,
      paymentMethod,
      totalPrice,
    };

    if (paymentMethod === "visa") {
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));
      navigate("/payment");
      return;
    }

    axios
      .post(
        "https://booking-hotels-back-end-api.vercel.app/api/Booking",
        bookingData,
        { withCredentials: true }
      )
      .then(() => {
        setMessage(
          "✅ تم الحجز بنجاح. يرجى التواصل مع الفندق لتأكيد الحجز."
        );
        setShowPopup(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("خطأ أثناء الحجز:", error.response?.data || error.message);
        setMessage(
          error.response?.data?.message ||
            "❌ حدث خطأ أثناء الحجز. حاول مرة أخرى."
        );
      });
  };

  if (loading)
    return <div className="text-center mt-10">جارٍ تحميل بيانات الفندق...</div>;

  if (!hotel)
    return <div className="text-center mt-10">لم يتم العثور على الفندق.</div>;

  return (
    <div
      dir="rtl"
      className={`max-w-xl mx-auto p-6  mt-30 rounded-xl shadow-md  transition duration-1000 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
  
      {/* الفورم */}
      <div className="space-y-5">
        {[
          { label: "عدد الغرف:", value: rooms, setter: setRooms },
          { label: "عدد الأفراد:", value: guests, setter: setGuests },
          { label: "عدد الليالي:", value: nights, setter: setNights },
        ].map((field, idx) => (
          <div key={idx} className="relative">
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
              type="number"
              min="1"
              value={field.value}
              onChange={(e) => field.setter(Number(e.target.value))}
              className="w-full border-b-2 border-r-2 rounded-full border-blue-400 focus:border-blue-600 px-2 py-2 outline-none transition-all duration-300 appearance-number"
            />
          </div>
        ))}

        <div className="relative">
          <label className="block mb-1 font-semibold">تاريخ الدخول:</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border-b-2 border-r-2 rounded-full border-blue-400 focus:border-blue-600 px-2 py-2 outline-none transition-all duration-300"
          />
        </div>

        <div className="relative">
          <label className="block mb-1 font-semibold">تاريخ الخروج:</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border-b-2 border-r-2 rounded-full border-blue-400 focus:border-blue-600 px-2 py-2 outline-none transition-all duration-300"
          />
        </div>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* زر احجز مع أنيميشن دخول من اليمين */}
      <button
        onClick={handleBooking}
        className={`mt-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-blue-600 shadow-md transition-transform duration-700 ${
          buttonAnimate
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        احجز الآن
      </button>

      {message && (
        <p className="text-center text-green-600 font-semibold my-4">{message}</p>
      )}

     {showPopup && (
  <div className="fixed inset-0 z-50 flex justify-center items-center">
    {/* الخلفية المظلمة */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setShowPopup(false)}
    ></div>

    {/* صندوق البوب أب */}
    <div
      className="relative bg-white p-6 rounded-xl shadow-2xl max-w-md w-full z-10 transform transition-all duration-500"
      style={{
        opacity: 1,
        scale: 1,
        animation: "fadeInScale 0.5s ease forwards",
      }}
    >
      <h3 className="text-xl font-bold mb-4 text-center">مراجعة الحجز</h3>
      <p className="mb-3 text-center">
        السعر الإجمالي:{" "}
        <span className="font-bold text-blue-600">{totalPrice} ج.م</span>
      </p>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">طريقة الدفع:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border rounded px-2 py-2 w-full focus:border-blue-600"
        >
          <option value="visa">فيزا</option>
          <option value="cash">الدفع عند الوصول</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowPopup(false)}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
        >
          إلغاء
        </button>
        <button
          onClick={confirmBooking}
          className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-blue-600 text-white hover:scale-105 transition-transform"
        >
          تأكيد الحجز
        </button>
      </div>
    </div>
  </div>
)}

    
    </div>
  );
}
