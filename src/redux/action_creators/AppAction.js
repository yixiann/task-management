import { ActionType } from "../../constants";

const AppAction = {
  updateLanguage: (data) => ({
    type: ActionType.APP_UPDATE_LANGUAGE,
    payload: {
      data,
    },
  }),
};

export default AppAction;
