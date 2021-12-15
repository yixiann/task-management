import { ActionType } from "../../constants";
import { LanguageCode } from "../../constants/Languages";

const InitialState = {
  languageCode: window.localStorage.getItem("languageCode")
    ? window.localStorage.getItem("languageCode")
    : LanguageCode.en,
};

const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionType.APP_UPDATE_LANGUAGE:
      const languageData = action.payload.data;
      window.localStorage.setItem("languageCode", languageData);
      return {
        ...state,
        languageCode: languageData,
      };
    // OTHERS
    default:
      return {
        ...state,
      };
  }
};

export default AppReducer;
