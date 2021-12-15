import { ActionType } from "../../constants";
import { LanguageCode } from "../../constants/Languages";

const InitialState = {
  languageCode: LanguageCode.en,
};

const AppReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionType.APP_UPDATE_LANGUAGE:
      return {
        ...state,
        languageCode: action.payload.data,
      };
    // OTHERS
    default:
      return {
        ...state,
      };
  }
};

export default AppReducer;
