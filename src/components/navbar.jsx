import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaQuestionCircle,
  FaInfoCircle,
  FaHotel,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
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
  key={Date.now()}   // يضمن إن كل refresh يعيد الحركة
  initial={{ y: -200, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="w-full fixed top-0 left-0 bg-white shadow z-50"
>
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold text-black"
        >
          <FaHotel className="text-yellow-500 animate-pulse" />
          {t("home")}
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/about"
            className="flex items-center gap-1 text-black hover:bg-black/10 px-3 py-2 rounded-full"
          >
            <FaInfoCircle /> {t("about")}
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-1 text-black hover:bg-black/10 px-3 py-2 rounded-full"
          >
            <FaQuestionCircle /> {t("contact")}
          </Link>

          {/* Language Toggle */}
          <div
            onClick={toggleLanguage}
            className="w-16 h-8 flex items-center bg-gray-200 rounded-full cursor-pointer p-1 transition"
          >
            <div
              className={`w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center transition-transform duration-300 ${
                i18n.language === "ar" ? "translate-x-0" : "translate-x-8"
              }`}
            >
              {i18n.language === "ar" ? "AR" : "EN"}
            </div>
          </div>

          {/* Welcome + Auth */}
          {isLoggedIn && (
            <span className="hidden lg:flex items-center gap-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-sky-500 to-blue-300">
              <FaUserCircle />
              {t("welcome")}
            </span>
          )}

      {isLoggedIn ? (
  <button
    onClick={handleLogout}
    className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
  >
    <FaSignOutAlt />
    {t("logout")}
  </button>
) : (
  <>
    <Link
      to="/register"
      className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
    >
      <FaUser />
      {t("create_account")}
    </Link>
    <Link
      to="/login"
      className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
    >
      <FaSignInAlt />
      {t("login")}
    </Link>
  </>
)}

        </div>
      </div>

      {/* Mobile Menu Content */}
  {/* Mobile Menu Content */}
{isMenuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center gap-3 pb-4"
  >
    <Link
      to="/about"
      className="px-3 py-1 rounded-full hover:bg-black/10 transition duration-300"
      onClick={() => setIsMenuOpen(false)}
    >
      {t("about")}
    </Link>
    <Link
      to="/contact"
      className="px-3 py-1 rounded-full hover:bg-black/10 transition duration-300"
      onClick={() => setIsMenuOpen(false)}
    >
      {t("contact")}
    </Link>
    <Link
      to="/flights"
      className="px-3 py-1 rounded-full hover:bg-black/10 transition duration-300"
      onClick={() => setIsMenuOpen(false)}
    >
      {t("flights")}
    </Link>

    {/* Language Toggle Mobile */}
    <div
      onClick={() => {
        toggleLanguage();
        setIsMenuOpen(false);
      }}
      className="w-16 h-8 flex items-center bg-gray-200 rounded-full cursor-pointer p-1 transition"
    >
      <div
        className={`w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center transition-transform duration-300 ${
          i18n.language === "ar" ? "translate-x-0" : "translate-x-8"
        }`}
      >
        {i18n.language === "ar" ? "AR" : "EN"}
      </div>
    </div>

    {/* Auth Mobile */}
    {isLoggedIn ? (
      <button
        onClick={() => {
          handleLogout();
          setIsMenuOpen(false);
        }}
        className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
      >
        <FaSignOutAlt />
        {t("logout")}
      </button>
    ) : (
      <>
        <Link
          to="/register"
          onClick={() => setIsMenuOpen(false)}
          className="block bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
        >
          {t("create_account")}
        </Link>
        <Link
          to="/login"
          onClick={() => setIsMenuOpen(false)}
          className="block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          {t("login")}
        </Link>
      </>
    )}
  </motion.div>
)}

    </motion.nav>
  );
};

export default Navbar;
