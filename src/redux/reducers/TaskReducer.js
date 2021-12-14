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
  updateSuccess: false,
  updateFail: false,
  editSuccess: false,
  editFail: false,
  deleteSuccess: false,
  deleteFail: false,
};

const TaskReducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionType.TASK_RESET_REDUCER:
      return {
        ...state,
        fetchAllSuccess: false,
        fetchAllFail: false,
        fetchByIdSuccess: false,
        fetchByIdFail: false,
        createSuccess: false,
        createFail: false,
        updateSuccess: false,
        updateFail: false,
        editSuccess: false,
        editFail: false,
        deleteSuccess: false,
        deleteFail: false,
      };
    case ActionType.TASK_RESET_TASK_DETAILS:
      return {
        ...state,
        fetchByIdData: [],
      }
    case ActionType.TASK_FETCH_ALL:
      return {
        ...state,
        fetchAllSuccess: false,
        fetchAllFail: false,
      };
    case ActionType.TASK_FETCH_ALL_SUCCESS:
      return {
        ...state,
        fetchAllData: action.payload.data,
        fetchAllSuccess: true,
        fetchAllFail: false,
      };
    case ActionType.TASK_FETCH_ALL_FAIL:
      return {
        ...state,
        fetchAllSuccess: false,
        fetchAllFail: true,
      };
    case ActionType.TASK_FETCH_BY_ID:
      return {
        ...state,
        fetchByIdSuccess: false,
        fetchByIdFail: false,
      };
    case ActionType.TASK_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        fetchByIdData: action.payload.data,
        fetchByIdSuccess: true,
        fetchByIdFail: false,
      };
    case ActionType.TASK_FETCH_BY_ID_FAIL:
      return {
        ...state,
        fetchByIdSuccess: false,
        fetchByIdFail: true,
      };
    case ActionType.TASK_CREATE:
      return {
        ...state,
        createSuccess: false,
        createFail: false,
      };
    case ActionType.TASK_CREATE_SUCCESS:
      return {
        ...state,
        createSuccess: true,
        createFail: false,
      };
    case ActionType.TASK_CREATE_FAIL:
      return {
        ...state,
        createSuccess: false,
        createFail: true,
      };
    case ActionType.TASK_UPDATE:
      return {
        ...state,
        updateSuccess: false,
        updateFail: false,
      };
    case ActionType.TASK_UPDATE_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
        updateFail: false,
      };
    case ActionType.TASK_UPDATE_FAIL:
      return {
        ...state,
        updateSuccess: false,
        updateFail: true,
      };
    case ActionType.TASK_EDIT:
      return {
        ...state,
        editSuccess: false,
        editFail: false,
      };
    case ActionType.TASK_EDIT_SUCCESS:
      return {
        ...state,
        editSuccess: true,
        editFail: false,
      };
    case ActionType.TASK_EDIT_FAIL:
      return {
        ...state,
        editSuccess: false,
        editFail: true,
      };
    case ActionType.TASK_DELETE:
      return {
        ...state,
        deleteSuccess: false,
        deleteFail: false,
      };
    case ActionType.TASK_DELETE_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
        deleteFail: false,
      };
    case ActionType.TASK_DELETE_FAIL:
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

export default TaskReducer;
