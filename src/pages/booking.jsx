import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// استيراد التوستفاي
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Booking() {
  // UseVerifyToken(); // تم تعطيلها لتفتح الصفحة للجميع
  
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
  const [popupVisible, setPopupVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
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
        setTimeout(() => setAnimate(true), 100);
        setTimeout(() => setButtonAnimate(true), 600);
      } catch (error) {
        console.error("فشل تحميل بيانات الفندق:", error);
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const totalPrice = hotel ? hotel.price * nights * rooms : 0;

  const handleBooking = () => {
    // 1. التأكد من إدخال التواريخ أولاً
    if (!checkIn || !checkOut) {
      setError("يرجى اختيار تواريخ الدخول والخروج");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    // تصفير الساعات لضمان دقة المقارنة بين الأيام فقط
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // 2. حساب الفرق الفعلي بالأيام
    const differenceInTime = end.getTime() - start.getTime();
    const actualNights = Math.round(differenceInTime / (1000 * 3600 * 24));

    // 3. التحقق من الترتيب الزمني (الخروج بعد الدخول)
    if (actualNights <= 0) {
      setError("تاريخ الخروج يجب أن يكون بعد تاريخ الدخول بليلة واحدة على الأقل");
      return;
    }

    // 4. التحقق من مطابقة الرقم المكتوب للفرق بين التواريخ
    if (parseInt(nights) !== actualNights) {
      setError(`⚠️ عذراً، عدد الليالي المدخل (${nights}) غير صحيح. بناءً على التواريخ المختارة، يجب أن يكون (${actualNights}) ليلة.`);
      return;
    }

    // إذا تم اجتياز كل الشروط
    setError("");
    setShowPopup(true);
    setTimeout(() => setPopupVisible(true), 50);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  const confirmBooking = () => {
    const token = document.cookie.includes("token") || localStorage.getItem("token");

    if (!token) {
      toast.error("👑 عذراً، يجب تسجيل الدخول أولاً لإتمام هذا الحجز الفاخر", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
      });
      return;
    }

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

    const endpoint = "https://booking-hotels-back-end-api.vercel.app/api/Booking";

    axios.post(endpoint, bookingData, { withCredentials: true })
      .then((res) => {
        if (paymentMethod === "card") {
          if (res.data.checkoutUrl) {
            window.location.href = res.data.checkoutUrl;
          } else {
            toast.warning("⚠️ لم يتم استلام رابط الدفع.");
          }
        } else {
          toast.success("✅ تم الحجز بنجاح. سنقوم بالتواصل معك.");
          closePopup();
          setTimeout(() => navigate("/"), 2500);
        }
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "❌ حدث خطأ أثناء الحجز.";
        toast.error(errorMsg);
      });
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-[#D4AF37] animate-pulse font-bold tracking-[0.3em] text-xl">جارٍ تجهيز جناحك الملكي...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pb-20 overflow-x-hidden font-sans" dir="rtl">
      <div
        className={`max-w-xl mx-auto p-8 mt-40 rounded-[2.5rem] bg-[#0f0f0f] border border-[#D4AF37]/20 shadow-2xl transition-all duration-1000 ease-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-[#D4AF37] text-3xl font-black mb-2 italic">تأكيد الحجز الفندقي</h2>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">{hotel?.name}</p>
        </div>

        <div className="space-y-6">
          {[
            { label: "عدد الغرف", value: rooms, setter: setRooms, type: "number" },
            { label: "عدد الأفراد", value: guests, setter: setGuests, type: "number" },
            { label: "عدد الليالي", value: nights, setter: setNights, type: "number" },
            { label: "تاريخ الدخول", value: checkIn, setter: setCheckIn, type: "date" },
            { label: "تاريخ الخروج", value: checkOut, setter: setCheckOut, type: "date" },
          ].map((field, idx) => (
            <div key={idx} className="group">
              <label className="block mb-2 mr-2 text-zinc-400 font-bold text-sm">{field.label}</label>
              <input
                type={field.type}
                min="1"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full bg-black border-b-2 border-r-2 border-[#D4AF37]/20 rounded-2xl text-white focus:border-[#D4AF37] px-5 py-3 outline-none transition-all duration-300 shadow-inner group-hover:border-[#D4AF37]/50"
                style={{ colorScheme: "dark" }}
              />
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-5 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
            <p className="text-red-500 text-center font-bold text-sm leading-relaxed">{error}</p>
          </div>
        )}

        <button
          onClick={handleBooking}
          className={`w-full mt-10 py-5 rounded-2xl text-black font-black bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 transition-all duration-700 hover:bg-white hover:scale-[1.02] active:scale-95 ${
            buttonAnimate ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          مراجعة بيانات الحجز 
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closePopup}></div>
          <div
            className={`relative bg-white p-10 rounded-[3rem] shadow-2xl max-w-md w-full z-10 transform transition-all duration-500 ${
              popupVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
            }`}
          >
            <h3 className="text-2xl font-black mb-6 text-black border-b-2 border-[#D4AF37] pb-2 inline-block">تفاصيل الفاتورة</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-500 font-bold">
                <span>الفندق:</span>
                <span className="text-black">{hotel?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-bold">
                <span>عدد الليالي:</span>
                <span className="text-black">{nights} ليلة</span>
              </div>
              <div className="flex justify-between text-zinc-500 font-bold">
                <span>إجمالي السعر:</span>
                <span className="text-[#D4AF37] text-2xl font-black">{totalPrice} ج.م</span>
              </div>
            </div>
            <div className="mb-8">
              <label className="block mb-3 font-black text-black text-sm uppercase">اختر وسيلة الدفع</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-zinc-100 border-none rounded-xl px-4 py-4 text-black font-bold outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="card">💳 بطاقة ائتمان (Visa/Mastercard)</option>
                <option value="cash">💵 الدفع النقدي عند الوصول</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={confirmBooking}
                className="w-full py-4 rounded-xl bg-black text-[#D4AF37] font-black text-lg hover:bg-[#1a1a1a] transition-all"
              >
                تأكيد ودفع
              </button>
              <button
                onClick={closePopup}
                className="w-full py-3 rounded-xl border border-zinc-200 text-zinc-400 font-bold hover:bg-zinc-50 transition-all"
              >
                تراجع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}