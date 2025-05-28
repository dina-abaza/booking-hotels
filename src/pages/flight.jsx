
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const navigate = useNavigate();


  const cities = ["القاهرة", "الغردقة", "الإسكندرية"];

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      from,
      to,
      departure,
      returnDate,
    }).toString();
console.log(queryParams)
    navigate(`/flights/search?${queryParams}`);
  };

  return (
    <div className="p-4 mt-20">
      <h1 className="text-2xl font-bold mb-4">ابحث عن رحلتك</h1>
      <div className="flex flex-col gap-4 max-w-md mx-auto">

        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        >
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          بحث
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;
