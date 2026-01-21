import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const cardRef = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl bg-[#0a0a0a] shadow-2xl overflow-hidden flex flex-col h-full border border-zinc-800
                  transform transition-all duration-700 ease-out
                  ${visible ? "translate-x-0 opacity-100" : "translate-x-24 opacity-0"}
                  hover:border-[#D4AF37]/50 group`}
    >
      {/* حاوية الصورة مع تأثير تقريب هادئ */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={`${hotel.name} main`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* طبقة تظليل خفيفة فوق الصورة لتحسين الرؤية */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
        
        {/* التقييم فوق الصورة بشكل احترافي */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg border border-[#D4AF37]/30">
          <span className="text-[#D4AF37] font-bold text-xs flex items-center gap-1">
            ⭐ {hotel.rating}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow bg-[#0a0a0a]">
        {/* اسم الفندق والمدينة */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-[#D4AF37]  transition-colors duration-300 uppercase tracking-tight">
            {hotel.name}
          </h3>
          <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
            <span className="text-[#D4AF37]">📍</span> {hotel.city}
          </p>
        </div>

        {/* الوصف القصير */}
        <p className="text-zinc-400 text-sm flex-grow leading-relaxed line-clamp-2">
          {hotel.description}
        </p>

        {/* السعر وتفاصيل الغرف */}
        <div className="mt-5 flex justify-between items-end border-t border-zinc-800 pt-4">
          <div>
            <span className="text-[#D4AF37] text-2xl font-black">
              ${hotel.price}
            </span>
            <span className="text-zinc-500 text-[10px] block uppercase tracking-tighter">
              Per Night
            </span>
          </div>

          {/* رابط عرض التفاصيل مع السهم */}
          <Link
            to={`/hotel/${hotel._id}`}
            className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm group/link hover:text-white transition-all duration-300"
          >
            <span>عرض التفاصيل</span>
            <span className="text-lg transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;