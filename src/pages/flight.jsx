
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [animate, setAnimate] = useState(false); 

  const navigate = useNavigate();

  const cities = ["القاهرة", "الغردقة", "الإسكندرية"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      from,
      to,
      departure,
      returnDate,
    }).toString();

    console.log(queryParams);
    navigate(`/flights/search?${queryParams}`);
  };

  return (
    <div
      className={`p-4 mt-20 max-w-md mx-auto transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
      dir="rtl"
    >
      <h1 className="text-2xl font-bold mb-4">ابحث عن رحلتك</h1>
      <div className="flex flex-col gap-4">

        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="" disabled>من</option>
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
          <option value="" disabled>إلى</option>
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
