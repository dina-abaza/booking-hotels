import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div
      className="rounded-2xl bg-white shadow-md overflow-hidden flex flex-col h-full transform transition duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* صورة واحدة فقط */}
      <img
        src={hotel.images[0]}
        alt={`${hotel.name} main`}
        className="w-full h-48 object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        {/* اسم الفندق */}
        <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
        <p className="text-gray-500 text-sm">{hotel.city}</p>

        {/* الوصف */}
        <p className="mt-3 text-gray-600 text-sm flex-grow leading-relaxed line-clamp-3">
          {hotel.description}
        </p>

        {/* السعر والتقييم */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">
            ${hotel.price} <span className="text-sm font-normal">/night</span>
          </span>
          <span className="text-yellow-500 font-medium text-sm flex items-center gap-1">
            ⭐ {hotel.rating}
            <span className="text-gray-400">({hotel.availableRooms} rooms)</span>
          </span>
        </div>

        {/* زر التفاصيل */}
        <Link
          to={`/hotel/${hotel._id}`}
          className="mt-5 inline-block text-center bg-gradient-to-r from-blue-600 to-blue-400 text-white font-medium py-2.5 rounded-xl shadow hover:shadow-lg hover:from-blue-500 hover:to-blue-300 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
