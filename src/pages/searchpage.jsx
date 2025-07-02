
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HotelCard from '../components/hotelcard';

const SearchPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const city = params.get("city") || "";

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [animate, setAnimate] = useState(false); 

  useEffect(() => {
    const hotelsFromStorage = localStorage.getItem("hotels");

    if (hotelsFromStorage) {
      setHotels(JSON.parse(hotelsFromStorage));
    } else {
      axios.get("http://localhost:4000/hotels")
        .then((res) => {
          setHotels(res.data);
          localStorage.setItem("hotels", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.error("Error fetching hotels:", error);
        });
    }
  }, []);

  useEffect(() => {
    let filtered = hotels.filter(hotel =>
      hotel.city.toLowerCase().includes(city.toLowerCase())
    );

    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-asc") {
      filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sortBy === "rating-desc") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredHotels(filtered);
  }, [city, hotels, sortBy]);


  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`p-4 mt-14 transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4">نتائج البحث لـ: {city}</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">ترتيب حسب:</label>
        <select
          className="border px-2 py-1 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">بدون ترتيب</option>
          <option value="price-asc">الأقل سعرًا</option>
          <option value="price-desc">الأعلى سعرًا</option>
          <option value="rating-asc">أقل تقييم</option>
          <option value="rating-desc">أعلى تقييم</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {filteredHotels.length === 0 ? (
          <p>لم يتم العثور على فنادق تطابق البحث.</p>
        ) : (
          filteredHotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
