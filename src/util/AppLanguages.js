import { CONSTANT } from "../lang/SupportedLanguages";

const AppLanguage = {
  getAppLanguage() {
    const appLocale =
      navigator.languages === undefined
        ? navigator.language
        : navigator.languages[0];

    if (!appLocale) {
      return "en";
    }

    const trimmedLocale = appLocale.trim();

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
    const browserLang = this.getAppLanguage();
    if (browserLang) {
      if (CONSTANT.SUUPORTED_LANGUAGES.includes(browserLang)) {
        return browserLang;
      } else {
        return "en";
      }
    }
  },
};

export default AppLanguage;
