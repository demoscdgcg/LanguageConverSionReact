import { CONSTANT } from "../lang/SupportedLanguages";
import CommonUtil from "./CommonUtils";

const BrowserLanguage = {
  getBrowserLanguage() {
    //const browserLocale = navigator.languages === undefined ? navigator.language : navigator.languages[0];
    const browserLocale = "en";

    if (!browserLocale) {
      return "en";
    }

    const trimmedLocale = browserLocale.trim();

    return trimmedLocale.split(/-|_/)[0];
  },

  getPrevLanguage() {
    return localStorage
      ? localStorage.getItem(CONSTANT.LOCAL_STORAGE_LANG_KEY)
      : null;
  },

  setLanguage(lang) {
    if (localStorage) {
      localStorage.setItem(CONSTANT.LOCAL_STORAGE_LANG_KEY, lang);
      return true;
    }
    return false;
  },

  getDefaultLanguage() {
    const langSet = this.getPrevLanguage();
    if (langSet) {
      return langSet;
    }
    const browserLang = this.getBrowserLanguage();
    if (browserLang) {
      //const lang = '';
      if (CONSTANT.SUUPORTED_LANGUAGES.includes(browserLang)) {
        return browserLang;
      } else {
        return "en";
      }
      // for (let lang of CONSTANT.LANGUAGES) {
      //   if (lang.key === browserLang) {
      //     lang = lang.key;
      //     break;
      //   }
      // }
      // return lang;
    }
  },
};

export default BrowserLanguage;
