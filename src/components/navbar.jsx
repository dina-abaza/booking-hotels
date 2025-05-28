
import React from "react";
import {
  FaQuestionCircle,
  FaInfoCircle,
  FaPlane,
  FaHotel,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLanguageChange = (lang) => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <nav className="w-screen fixed top-0 left-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-black"
          >
            <FaHotel className="text-blue-400" />
            {t("home")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="flex items-center gap-1 text-black px-3 py-2 rounded-full hover:bg-black/10"
          >
            <FaInfoCircle />
            {t("about")}
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-1 text-black px-3 py-2 rounded-full hover:bg-black/10"
          >
            <FaQuestionCircle />
            {t("contact")}
          </Link>

          <Link
            to="/flights"
            className="flex items-center gap-1 text-black px-3 py-2 rounded-full hover:bg-black/10"
          >
            <FaPlane />
            {t("flights")}
          </Link>

          
          <select
            value={i18n.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="border rounded px-2 py-1 text-sm text-gray-700"
          >
            <option value="ar">ar</option>
            <option value="en">en</option>
          </select>

        
          <select
            value={localStorage.getItem("currency") || "USD"}
            onChange={(e) => {
              localStorage.setItem("currency", e.target.value);
              window.location.reload();
            }}
            className="border rounded px-2 py-1 text-sm text-gray-700"
          >
            <option value="USD">$ USD</option>
            <option value="EGP">ج.م EGP</option>
          </select>

        
          {isLoggedIn ? (
            <>
              <span className="flex items-center gap-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-sky-500 to-blue-300">
                <FaUserCircle />
                {t("welcome")} {user.name || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                <FaSignOutAlt />
                {t("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              >
                <FaUser />
                {t("create_account")}
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                <FaSignInAlt />
                {t("login")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
