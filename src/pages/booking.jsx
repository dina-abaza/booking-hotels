import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore";

export default function Booking() {
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

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/hotels/${id}`);
        setHotel(res.data);
        setLoading(false);

        // شغل الأنيميشن بعد التحميل
        setTimeout(() => {
          setAnimate(true);
        }, 100); // تأخير بسيط لضمان عرض المكون
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

  const confirmBooking = async () => {
    const bookingData = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      user: user ? user.email || user.name : "guest",
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
    } else {
      try {
        await axios.post("http://localhost:4000/bookings", bookingData);
        setMessage("✅ تم الحجز بنجاح. يرجى التواصل مع الفندق لتأكيد الحجز.");
        setShowPopup(false);
        navigate("/");
      } catch (error) {
        setMessage("❌ حدث خطأ أثناء الحجز. حاول مرة أخرى.");
        console.error(error);
      }
    }
  };

  if (loading)
    return <div className="text-center mt-10">جارٍ تحميل بيانات الفندق...</div>;

  if (!hotel)
    return <div className="text-center mt-10">لم يتم العثور على الفندق.</div>;

  return (
    <div
      dir="rtl"
      className={`max-w-xl mx-auto p-4 mt-20 overflow-hidden transition duration-1000 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        حجز الفندق: {hotel.name}
      </h2>

      {/* باقي الكود كما هو */}
      <div className="mb-3">
        <label>عدد الغرف:</label>
        <input
          type="number"
          min="1"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-3">
        <label>عدد الأفراد:</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-3">
        <label>عدد الليالي:</label>
        <input
          type="number"
          min="1"
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-3">
        <label>تاريخ الدخول:</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      <div className="mb-3">
        <label>تاريخ الخروج:</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        احجز
      </button>

      {message && (
        <p className="text-center text-green-600 font-semibold my-4">{message}</p>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-transparent backdrop-brightness-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">مراجعة الحجز</h3>
            <p>
              السعر الإجمالي: <span className="font-bold">{totalPrice} ج.م</span>
            </p>

            <div className="mt-4">
              <label className="block mb-1 font-semibold">طريقة الدفع:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="border rounded px-2 py-1 w-full"
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
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
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
