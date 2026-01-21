import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HotelCard from "../components/hotelcard";
import TypingTitle from "../components/typingTitle";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("home");

  const [city, setCity] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [sortedHotels, setSortedHotels] = useState([]);
  const [animate, setAnimate] = useState(false);

  const hotelsRef = useRef(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    axios
      .get("https://booking-hotels-back-end-api.vercel.app/api/hotels")
      .then((res) => {
        setHotels(res.data);
        setFilteredHotels(res.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  useEffect(() => {
    let sorted = [...filteredHotels];
    if (sortOption === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === "rating-asc") {
      sorted.sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "rating-desc") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    setSortedHotels(sorted);
  }, [sortOption, filteredHotels]);

  const handleSearch = () => {
    let filtered = hotels.filter((hotel) => {
      const matchCity = city
        ? hotel.city && hotel.city.toLowerCase().includes(city.toLowerCase())
        : true;
      const matchName = hotelName
        ? hotel.name &&
          hotel.name.toLowerCase().includes(hotelName.toLowerCase())
        : true;
      return matchCity && matchName;
    });
    setFilteredHotels(filtered);
    setCity("");
    setHotelName("");

    if (hotelsRef.current) {
      hotelsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`p-4 mt-20 transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      {/* Hero Section */}
      <div className="relative flex flex-col items-center w-full min-h-[80vh] rounded-3xl overflow-hidden border border-[#3a2a16]">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/imagesea.jpg')" }}
        ></div>

        {/* Overlay دهبي شفاف */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full p-8">
          <TypingTitle />

          {/* Search Inputs */}
          <div className="mt-16 w-full max-w-md flex flex-col gap-4 items-center">
            <input
              type="text"
              placeholder={t("search_city")}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="outline-none px-4 py-2 rounded-2xl w-full bg-black/50 text-[#f5d37b] placeholder-[#d6c3a3] shadow-lg"
            />
            <input
              type="text"
              placeholder={t("search_hotel")}
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              className="outline-none px-4 py-2 rounded-2xl w-full bg-black/50 text-[#f5d37b] placeholder-[#d6c3a3] shadow-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#c9a24d] to-[#f5d37b] text-black font-bold px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition-all"
            >
              {t("search")}
            </button>
          </div>

          {/* Sorting */}
          <div className="mt-6 w-full flex justify-end">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="outline-none px-4 py-2 rounded-2xl w-52 bg-black/50 text-[#f5d37b] shadow-md border border-[#c9a24d] cursor-pointer transition-all duration-300 hover:bg-black/60 focus:ring-2 focus:ring-[#c9a24d]"
            >
              <option value="">{t("sort_by")}</option>
              <option value="name-asc">{t("name_asc")}</option>
              <option value="name-desc">{t("name_desc")}</option>
              <option value="rating-asc">{t("rating_asc")}</option>
              <option value="rating-desc">{t("rating_desc")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hotels Section */}
      <h2
        ref={hotelsRef}
        className="text-xl font-bold mt-20 text-center text-[#f5d37b]"
      >
        {t("available_hotels")}
      </h2>

      <div
        className={`mt-5 gap-4 ${
          sortedHotels.length <= 2
            ? "flex justify-center flex-wrap"
            : "grid grid-cols-1 md:grid-cols-3"
        }`}
      >
        {sortedHotels.length > 0 ? (
          sortedHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">{t("no_results")}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
