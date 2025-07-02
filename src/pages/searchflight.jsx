
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authStore";

const FlightResults = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const departure = params.get("departure") || "";
  const returnDate = params.get("returnDate") || "";

  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [animate, setAnimate] = useState(false); // هنا

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    const flightData = localStorage.getItem("flightData");

    if (flightData) {
      setFlights(JSON.parse(flightData));
    } else {
      async function fetchData() {
        try {
          const res = await axios.get("http://192.168.1.9:4000/flights");
          setFlights(res.data);
          localStorage.setItem("flightData", JSON.stringify(res.data));
        } catch (err) {
          console.error("حدث خطأ أثناء تحميل الرحلات:", err);
        }
      }

      fetchData();
    }
  }, []);

  useEffect(() => {
    let filtered = flights.filter((flight) => {
      const matchesFrom = flight.from.toLowerCase().includes(from.toLowerCase());
      const matchesTo = flight.to.toLowerCase().includes(to.toLowerCase());
      const matchesDeparture = departure ? flight.departure.startsWith(departure) : true;
      return matchesFrom && matchesTo && matchesDeparture;
    });

    setFilteredFlights(filtered);
  }, [from, to, departure, returnDate, flights]);

  // تفعيل الحركة بعد تحميل الصفحة
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleBooking = (flight) => {
    if (isLoggedIn) {
      alert(`تم الحجز من ${flight.from} إلى ${flight.to} بنجاح! يرجى التأكيد على رقمنا الخاص بنا.`);
    } else {
      alert("يرجى تسجيل الدخول أولاً لإتمام الحجز.");
    }
  };

  return (
    <div
      className={`p-4 mt-20 max-w-3xl mx-auto transition-transform duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
      }`}
      style={{ willChange: "transform, opacity" }}
      dir="rtl"
    >
      <h2 className="text-xl font-bold mb-4">نتائج البحث</h2>

      {filteredFlights.length === 0 ? (
        <p>لا توجد رحلات متاحة حسب البحث.</p>
      ) : (
        filteredFlights.map((flight) => (
          <div key={flight.id} className="border p-4 rounded mb-4 shadow">
            <p>
              <strong>من:</strong> {flight.from}
            </p>
            <p>
              <strong>إلى:</strong> {flight.to}
            </p>
            <p>
              <strong>السعر:</strong> {flight.price} ج.م
            </p>
            <p>
              <strong>شركة الطيران:</strong> {flight.airline}
            </p>
            <p>
              <strong>تاريخ المغادرة:</strong> {new Date(flight.departure).toLocaleString()}
            </p>
            <p>
              <strong>تاريخ الوصول:</strong> {new Date(flight.arrival).toLocaleString()}
            </p>
            <button
              onClick={() => handleBooking(flight)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              احجز الآن
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FlightResults;
