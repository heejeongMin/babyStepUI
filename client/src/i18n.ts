import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./utils/String/en";
import ko from "./utils/String/ko";

export const defaultNS = "translation";
export const resources = {
  ko: { ...ko },
  en: { ...en },
};

i18n.use(initReactI18next).init({
  lng: localStorage.getItem("language") || "ko",
  resources,
  defaultNS,
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
