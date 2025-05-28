import React from "react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
<div className=" rounded-lg  shadow-xl overflow-hidden">
  <div className="flex overflow-x-auto">
    {hotel.images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`${hotel.name} image ${index + 1}`}
        className="w-48 h-32 object-cover"
      />
    ))}
  </div>
  <div className="p-4">
    <h3 className="text-lg font-semibold">{hotel.name}</h3>
    <p className="text-gray-600">{hotel.city}</p>
    <p className="mt-2 text-sm text-gray-500">{hotel.description}</p>
    <div className="mt-4 flex justify-between items-center">
      <span className="text-blue-600 font-semibold">
        ${hotel.price} per night
      </span>
      <span className="text-yellow-500">
        ⭐ {hotel.rating} ({hotel.availableRooms} Rooms Available)
      </span>
    </div>
    <Link
      to={`/hotel/${hotel.id}`}
      className="block mt-4 text-center bg-blue-700 text-white hover:bg-blue-500 py-2 rounded"
    >
      View Details
    </Link>
  </div>
</div>

  );
};

export default HotelCard;
