import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaQuestionCircle,
  FaInfoCircle,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";
import { motion } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    setIsMenuOpen(false); // إغلاق القائمة بعد تسجيل الخروج
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-0 left-0 w-full z-50 bg-black shadow-2xl rounded-b-[3rem]"
    >
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <HiSparkles className="text-amber-500 text-2xl" />
          <span
            style={{
              fontFamily: i18n.language === "ar" ? "Lalezar, cursive" : "Pacifico, cursive",
            }}
            className="text-4xl bg-gradient-to-r from-[#4a2f1a] via-[#b08a3e] to-[#f1d28a] bg-clip-text text-transparent"
          >
            {i18n.language === "ar" ? "ترافيللو" : "Travelio"}
          </span>
        </Link>

        {/* Mobile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-amber-400"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/about" className="flex items-center gap-2 text-[#e6c98f] hover:text-amber-400 transition">
            <FaInfoCircle /> {t("about")}
          </Link>

          <Link to="/contact" className="flex items-center gap-2 text-[#e6c98f] hover:text-amber-400 transition">
            <FaQuestionCircle /> {t("contact")}
          </Link>

          {/* Language Toggle */}
          <div onClick={toggleLanguage} className="w-14 h-7 bg-zinc-800 rounded-full p-1 cursor-pointer">
            <div className={`w-5 h-5 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center transition-transform ${i18n.language === "ar" ? "translate-x-0" : "translate-x-7"}`}>
              {i18n.language === "ar" ? "AR" : "EN"}
            </div>
          </div>

          {isLoggedIn && (
            <span className="flex items-center gap-2 text-amber-300 font-semibold">
              <FaUserCircle /> {t("welcome")}
            </span>
          )}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center gap-2 border border-red-500 text-red-400 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition">
              <FaSignOutAlt /> {t("logout")}
            </button>
          ) : (
            <div className="flex gap-4">
              <Link to="/register" className="bg-gradient-to-r from-[#b08a3e] to-[#f1d28a] text-black px-6 py-2 rounded-full font-bold">
                <FaUser />
              </Link>
              <Link to="/login" className="border border-amber-400 text-amber-300 px-6 py-2 rounded-full">
                <FaSignInAlt />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (تعديل هذا الجزء) */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-amber-900/30 pb-10 pt-6 flex flex-col gap-6 items-center px-6">
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-[#e6c98f] text-lg">
            <FaInfoCircle /> {t("about")}
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-[#e6c98f] text-lg">
            <FaQuestionCircle /> {t("contact")}
          </Link>

          {/* Language Toggle in Mobile */}
          <div onClick={toggleLanguage} className="flex items-center gap-3 text-amber-400 cursor-pointer">
             <span>{i18n.language === "ar" ? "English" : "العربية"}</span>
          </div>

          <div className="w-full h-[1px] bg-amber-900/20 my-2"></div>

          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="flex items-center gap-2 text-amber-300 font-semibold">
                <FaUserCircle /> {t("welcome")}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full border border-red-500 text-red-400 py-3 rounded-full"
              >
                <FaSignOutAlt /> {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#b08a3e] to-[#f1d28a] text-black py-3 rounded-full font-bold"
              >
                <FaUser /> {t("register") || "إنشاء حساب"}
              </Link>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 border border-amber-400 text-amber-300 py-3 rounded-full"
              >
                <FaSignInAlt /> {t("login") || "دخول"}
              </Link>
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;