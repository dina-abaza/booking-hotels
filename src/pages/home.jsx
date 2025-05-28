import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HotelCard from "../components/hotelcard";

const Home = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
 const [sortOption, setSortOption] = useState("");  
  const [sortedHotels, setSortedHotels] = useState([]); 

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
  let sorted = [...hotels];

  if (sortOption === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "name-desc") {
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "rating-asc") {
    sorted.sort((a, b) => a.rating - b.rating);
  } else if (sortOption === "rating-desc") {
    sorted.sort((a, b) => b.rating - a.rating);
  } else {
    sorted = hotels;
  }

  setSortedHotels(sorted);
}, [sortOption, hotels]);


  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      city,
      checkIn,
      checkOut,
      rooms,
      guests,
    }).toString();
    console.log("City before navigating:", city);

    navigate(`/search?${queryParams}`);
  };

  return (
    <div className="p-4 mt-20">
     
      <div className="relative flex flex-col bg-cover bg-center p-4 h-screen" style={{ backgroundImage: 'url(/bg.jpg)' }}>
 <h1 className="text-white font-bold ">استمتع بالاسترخاء </h1>
  <div className="absolute top-1/2 right-1/2 translate-1/2 flex justify-center items-center gap-2 mb-4">
 
    <input
      type="text"
      placeholder="City or Hotel"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="outline-none px-3 py-2 rounded-2xl  sm:w-auto bg-blue-50" 
    >
      
    </input>
    <input
      type="date"
      value={checkIn}
      onChange={(e) => setCheckIn(e.target.value)}
      className="outline-none px-3 py-2 rounded-2xl sm:w-auto bg-blue-50"
    />
    <input
      type="date"
      value={checkOut}
      onChange={(e) => setCheckOut(e.target.value)}
      className="outline-none px-3 py-2 rounded-2xl sm:w-auto bg-blue-50"
    />
    <input
      type="number"
      value={rooms}
      min={1}
      onChange={(e) => setRooms(e.target.value)}
      className="outline-none px-3 py-2 rounded-2xl sm:w-auto bg-blue-50"
    />
    <input
      type="number"
      value={guests}
      min={1}
      onChange={(e) => setGuests(e.target.value)}
      className="outline-none px-3 py-2 rounded-2xl sm:w-auto bg-blue-50"
    />
  </div>
       <div className="mb-4 absolute top-10 right-10 bg-blue-50">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)} 
            className=" outline-none px-3 py-2 rounded-2xl w-full sm:w-auto"
          >
            <option value="">ترتيب حسب</option>
            <option value="name-asc">الاسم (من A-Z)</option>
            <option value="name-desc">الاسم (من Z-A)</option>
            <option value="rating-asc">التقييم (من الأقل للأعلى)</option>
            <option value="rating-desc">التقييم (من الأعلى للأقل)</option>
          </select>
        </div>
  
  <div className="mt-4 absolute top-2/3 right-1/2 translate-1/2">
    <button onClick={handleSearch} className="bg-blue-400 text-white px-4 py-2 rounded-2xl w-full sm:w-auto hover:bg-blue-50 hover:text-blue-400 transform duration-300">
      Search
    </button>
  </div>
</div>

      <h2 className="text-xl font-bold mt-32">Available Hotels</h2>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-3 gap-4">
        {sortedHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default Home;
