import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import navbarEN from "./locales/en/navbar.json";
import navbarAR from "./locales/ar/navbar.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { navbar: navbarEN },
    ar: { navbar: navbarAR }
  },
  lng: localStorage.getItem("language") || "ar",
  fallbackLng: "ar",
  ns: ["navbar"],
  defaultNS: "navbar",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
