import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./en";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    // the translations
    resources: {
      en: {
        translation: translationEN,
      },
    },
  });

export default i18n;
