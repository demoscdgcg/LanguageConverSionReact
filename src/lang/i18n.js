import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enUsTrans from "./modules/en";
import zhCnTrans from "./modules/zh";
import thGerman from "./modules/th";
// import arUsTrans from "./modules/ar";
// import idnUsTrans from "./modules/idn";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "",
    initImmediate: false,
    fallbackLng: "en",
    // preload: ["en", "ar", "zh", "th", "idn"],
    preload: ["en", "th", "zh"],
    debug: false,
    logger: {
      level: "error",
    },

    resources: {
      en: {
        translation: enUsTrans,
      },
      zh: {
        translation: zhCnTrans,
      },
      th: {
        translation: thGerman,
      },
      // ar: {
      //   translation: arUsTrans,
      // },
      // idn: {
      //   translation: idnUsTrans,
      // },
    },

    keySeparator: ".",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      bindI18n: "languageChanged loaded",
      bindStore: "added removed",
      nsMode: "default",
      useSuspense: true,
    },
  });

export default i18n;
