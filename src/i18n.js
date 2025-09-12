import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import navbarEN from "./locales/en/navbar.json";
import navbarAR from "./locales/ar/navbar.json";
import homeEN from "./locales/en/home.json";
import homeAR from "./locales/ar/home.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { navbar: navbarEN, home: homeEN },
    ar: { navbar: navbarAR, home: homeAR }
  },
  lng: localStorage.getItem("language") || "ar",
  fallbackLng: "ar",
  ns: ["navbar", "home"], // كذا namespace
  defaultNS: "navbar", // الافتراضي navbar
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
