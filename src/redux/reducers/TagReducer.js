import { ActionType } from "../../constants";

const InitialState = {
  fetchAllData: [],
  fetchAllSuccess: false,
  fetchAllFail: false,
  fetchByIdData: [],
  fetchByIdSuccess: false,
  fetchByIdFail: false,
  createSuccess: false,
  createFail: false,
  editSuccess: false,
  editFail: false,
  deleteSuccess: false,
  deleteFail: false,
};

const TagReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionType.TAG_RESET_REDUCER:
      return {
        ...state,
        fetchAllSuccess: false,
        fetchAllFail: false,
        fetchByIdSuccess: false,
        fetchByIdFail: false,
        createSuccess: false,
        createFail: false,
        editSuccess: false,
        editFail: false,
        deleteSuccess: false,
        deleteFail: false,
      }
    case ActionType.TAG_FETCH_ALL:
      return {
        ...state,
        fetchAllSuccess: false,
        fetchAllFail: false,
      };
    case ActionType.TAG_FETCH_ALL_SUCCESS:
      // console.log("YES")
      return {
        ...state,
        fetchAllData: action.payload.data,
        fetchAllSuccess: true,
        fetchAllFail: false,
      };
    case ActionType.TAG_FETCH_ALL_FAIL:
      return {
        ...state,
        fetchAllSuccess: false,
        fetchAllFail: true,
      };
    case ActionType.TAG_CREATE:
      return {
        ...state,
        createSuccess: false,
        createFail: false,
      };
    case ActionType.TAG_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createFail: false,
      };
    case ActionType.TAG_CREATE_FAIL:
      return {
        ...state,
        createSuccess: false,
        createFail: true,
      };
    case ActionType.TAG_EDIT:
      return {
        ...state,
        editSuccess: false,
        editFail: false,
      };
    case ActionType.TAG_EDIT_SUCCESS:
      return {
        ...state,
        editSuccess: true,
        editFail: false,
      };
    case ActionType.TAG_EDIT_FAIL:
      return {
        ...state,
        editSuccess: false,
        editFail: true,
      };
    case ActionType.TAG_DELETE:
      return {
        ...state,
        deleteSuccess: false,
        deleteFail: false,
      };
    case ActionType.TAG_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteFail: false,
      };
    case ActionType.TAG_DELETE_FAIL:
      return {
        ...state,
        deleteSuccess: false,
        deleteFail: true,
      };

    // OTHERS
    default:
      return {
        ...state,
      };
  }
};

export default TagReducer;
