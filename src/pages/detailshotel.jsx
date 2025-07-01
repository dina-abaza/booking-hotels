
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
    const hotelFromStorage = localStorage.getItem(`hotel-${id}`);
    if (hotelFromStorage) {
      setHotel(JSON.parse(hotelFromStorage));
      setLoading(false);
    } else {
      const fetchHotel = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/hotels/${id}`);
          setHotel(res.data);
          setLoading(false);
          localStorage.setItem(`hotel-${id}`, JSON.stringify(res.data));
        } catch (error) {
          console.error("Failed to fetch hotel:", error);
          setLoading(false);
        }
      };
      fetchHotel();
    }
  }, [id]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) return <div className="text-center mt-10">جارٍ تحميل التفاصيل...</div>;

  if (!hotel) return <div className="text-center mt-10">لم يتم العثور على الفندق.</div>;

  return (
    <div
      className={`p-6 max-w-4xl mx-auto pt-10 transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-100 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-2xl font-bold mb-4">{hotel.name}</h2>
      <p className="text-gray-600 mb-2">{hotel.city}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {hotel.images && hotel.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Hotel ${index}`}
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>
      <p className="mb-2">{hotel.description}</p>
      <p className="mb-1">عدد الغرف: {hotel.rooms}</p>
      <p className="mb-1">الغرف المتاحة: {hotel.availableRooms}</p>
      <p className="mb-1 font-semibold">السعر: {hotel.price} ج.م / الليلة</p>
      <p className="mb-1">التقييم: ⭐ {hotel.rating}</p>

      {hotel.services && hotel.services.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">الخدمات المتوفرة:</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {hotel.services.map((service, index) => (
              <li
                key={index}
                className="bg-gray-100 rounded px-3 py-1 flex items-center gap-2"
              >
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">سياسة الفندق:</h3>
        <p className="mb-2">
          • يتم الدفع عند الوصول. <br /> • يجب إلغاء الحجز قبل 24 ساعة. <br /> •
          سياسة الإلغاء قابلة للتغيير حسب تواريخ السفر.
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(`/booking/${id}`)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          احجز الآن
        </button>
      </div>
    </div>
  );
}
