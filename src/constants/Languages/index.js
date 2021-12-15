import english from "./english";
import chinese from "./chinese"

export const LanguageCode = {
  en: "English",
  ch: "Chinese",
};

const Languages = {
  [LanguageCode.en]: english,
  [LanguageCode.ch]: chinese,
};

export default Languages
