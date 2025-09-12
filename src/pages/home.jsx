import React, { useState, useEffect, useRef } from "react"; // ضفت useRef
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

  // ref للفنادق
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
        ? hotel.city &&
          hotel.city.toLowerCase().includes(city.toLowerCase())
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

    // ينزل للجزء بتاع الفنادق
    if (hotelsRef.current) {
      hotelsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`p-4 mt-20 ${animate ? "page-enter-active" : "page-enter"}`}
    >
      <div
        className="relative flex flex-col items-center bg-cover bg-center p-4 min-h-[110vh] "
        style={{ backgroundImage: "url(/beach.jpeg)" }}
      >
        <TypingTitle />

        {/* Search inputs */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 flex flex-col gap-3 items-center">
          <input
            type="text"
            placeholder={t("search_city")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="outline-none px-3 py-2 rounded-2xl w-full bg-blue-50 shadow-md opacity-0 animate-slide-in"
            style={{ animationDelay: "0.1s" }}
          />
          <input
            type="text"
            placeholder={t("search_hotel")}
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className="outline-none px-3 py-2 rounded-2xl w-full bg-blue-50 shadow-md opacity-0 animate-slide-in"
            style={{ animationDelay: "0.3s" }}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-400 text-white px-3 py-1.5 rounded-xl text-sm w-28 hover:bg-blue-500 transition shadow-md opacity-0 animate-slide-in"
            style={{ animationDelay: "0.5s" }}
          >
            {t("search")}
          </button>
        </div>

        {/* Sorting */}
        <div className="mb-4 absolute top-10 right-10">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="outline-none px-4 py-2 rounded-2xl w-52 bg-blue-50 shadow-md border border-blue-100 cursor-pointer transition-all duration-300 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300"
          >
            <option value="">{t("sort_by")}</option>
            <option value="name-asc">{t("name_asc")}</option>
            <option value="name-desc">{t("name_desc")}</option>
            <option value="rating-asc">{t("rating_asc")}</option>
            <option value="rating-desc">{t("rating_desc")}</option>
          </select>
        </div>
      </div>

      {/* Hotels section */}
      <h2 ref={hotelsRef} className="text-xl font-bold mt-32 text-center">
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
          <p className="text-gray-500 text-center w-full">{t("no_results")}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
