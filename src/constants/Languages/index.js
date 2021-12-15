import english from "./english";
import chinese from "./chinese"
import japanese from "./japanese"

export const LanguageCode = {
  en: "English",
  ch: "Chinese",
  ja: "Japanese"
};

const Languages = {
  [LanguageCode.en]: english,
  [LanguageCode.ch]: chinese,
  [LanguageCode.ja]: japanese
};

export default Languages
