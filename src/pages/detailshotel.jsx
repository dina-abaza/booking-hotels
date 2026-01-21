import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Details() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`https://booking-hotels-back-end-api.vercel.app/api/hotels/${id}`);
        setHotel(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch hotel:", error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-[#D4AF37] animate-bounce font-bold tracking-[0.5em] text-xl">جارٍ التحميل...</div>
    </div>
  );

  if (!hotel) return <div className="min-h-screen bg-black text-[#D4AF37] flex items-center justify-center">الفندق غير موجود.</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-20 overflow-x-hidden" dir="rtl">
      <div
        className={`p-6 max-w-6xl mx-auto pt-40 transition-all duration-1000 ease-out ${
          animate ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {/* الهيدر: اسم الفندق بالذهبي مع مسافة علوية كافية */}
        <div className="mb-12 border-r-8 border-[#D4AF37] pr-6">
          <h2 className="text-5xl font-black text-[#D4AF37] mb-2 uppercase leading-tight">{hotel.name}</h2>
          <p className="text-zinc-400 text-lg flex items-center gap-2">📍 {hotel.city}</p>
        </div>

        {/* الجاليري */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 h-[400px]">
          <div className="md:col-span-2 h-full rounded-3xl overflow-hidden border-2 border-[#D4AF37]/20 shadow-lg shadow-[#D4AF37]/5">
            <img src={hotel.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2 h-full">
            {hotel.images.slice(1, 5).map((img, index) => (
              <img key={index} src={img} className="w-full h-full object-cover rounded-2xl border border-white/10 hover:border-[#D4AF37]/30 transition-all shadow-md" alt="Detail" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            
            {/* وصف الفندق */}
            <div className="bg-zinc-900/50 p-8 rounded-3xl border border-[#D4AF37]/10">
              <h3 className="text-[#D4AF37] text-2xl font-bold mb-5 italic underline decoration-1 underline-offset-8">عن الفندق</h3>
              <p className="text-zinc-200 leading-relaxed text-xl font-light leading-loose">{hotel.description}</p>
            </div>

            {/* المميزات: خلفية بيضاء */}
            {hotel.services && hotel.services.length > 0 && (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-transform hover:scale-[1.01]">
                <h3 className="text-black text-2xl font-black mb-8 flex items-center gap-3">
                  <span className="text-[#D4AF37]">✦</span> المميزات والخدمات
                </h3>
                <div className="flex flex-wrap gap-4">
                  {hotel.services.map((service, index) => (
                    <span key={index} className="bg-black text-[#D4AF37] border-2 border-[#D4AF37]/30 px-6 py-2 rounded-full text-sm font-black shadow-md transition-all hover:border-[#D4AF37]">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* السياسة: خلفية بيضاء بدون أرقام */}
            <div className="bg-white p-8 rounded-[2.5rem] border-r-[12px] border-[#D4AF37] shadow-xl">
              <h3 className="text-black font-black text-2xl mb-8">سياسة الإقامة الفاخرة</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-black font-bold border-b border-zinc-100 pb-4">
                  <span className="text-[#D4AF37] text-xl">✨</span>
                  <p>طريقة الدفع: <span className="text-[#D4AF37] font-black underline decoration-black/10">نقداً عند الوصول</span> أو بالبطاقة الائتمانية.</p>
                </div>
                <div className="flex items-center gap-4 text-black font-bold border-b border-zinc-100 pb-4">
                  <span className="text-[#D4AF37] text-xl">✨</span>
                  <p>سياسة الإلغاء: <span className="text-[#D4AF37] font-black underline decoration-black/10">إلغاء مرن</span> متاح حتى 24 ساعة قبل الموعد.</p>
                </div>
                <div className="flex items-center gap-4 text-black font-bold">
                  <span className="text-[#D4AF37] text-xl">✨</span>
                  <p>تقييم النزلاء: <span className="bg-black text-[#D4AF37] px-4 py-1.5 rounded-xl ml-2 text-lg shadow-inner">⭐ {hotel.rating}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* كرت السعر الجانبي */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-10 rounded-[3rem] shadow-2xl border-2 border-[#D4AF37]/20 text-center">
              <h4 className="text-black/30 font-bold uppercase tracking-[0.25em] text-[10px] mb-6">Exclusive Offer</h4>
              
              <div className="mb-8">
                <span className="text-7xl font-white text-black block mb-3 tracking-tighter">{hotel.price}</span>
                <span className="text-[#D4AF37] text-lg font-extrabold tracking-widest border-y-2 border-[#D4AF37]/30 py-1.5 px-6 inline-block">
                  جنيه مصري / ليلة
                </span>
              </div>

              <div className="space-y-5 mb-10 text-right font-bold text-black">
                <div className="flex justify-between items-center text-lg bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                   <span className="text-zinc-400 font-medium">الغرف المتاحة</span>
                   <span className="bg-black text-[#D4AF37] px-5 py-1 rounded-full text-sm font-black">{hotel.availableRooms} غرفة</span>
                </div>
                <p className="text-center text-zinc-400 text-xs font-semibold mt-4 italic">الأسعار تشمل ضريبة القيمة المضافة</p>
              </div>

              <button
                onClick={() => navigate(`/booking/${id}`)}
                className="w-full bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-black py-6 rounded-2xl transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 text-xl border-2 border-black group"
              >
                احجز مكانك الآن
                <span className="group-hover:translate-x-[-8px] transition-transform duration-300">←</span>
              </button>

              <div className="mt-8 border-t border-zinc-50 pt-6">
                 <p className="text-[10px] text-zinc-300 font-black tracking-[0.4em] uppercase">Security Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}