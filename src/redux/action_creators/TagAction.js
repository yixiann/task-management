import { ActionType } from "../../constants";

const TagAction = {
  resetReducer: (data) => ({
    type: ActionType.TAG_RESET_REDUCER,
    payload: {
      data,
    },
  }),
  fetchAllTag: (data) => ({
    type: ActionType.TAG_FETCH_ALL,
    payload: {
      data,
    },
  }),
  fetchAllTagSuccess: (data) => ({
    type: ActionType.TAG_FETCH_ALL_SUCCESS,
    payload: {
      data,
    },
  }),
  fetchAllTagFail: (data) => ({
    type: ActionType.TAG_FETCH_ALL_FAIL,
    payload: {
      data,
    },
  }),
  createTag: (data) => ({
    type: ActionType.TAG_CREATE,
    payload: {
      data,
    },
  }),
  createTagSuccess: (data) => ({
    type: ActionType.TAG_CREATE_SUCCESS,
    payload: {
      data,
    },
  }),
  createTagFail: (data) => ({
    type: ActionType.TAG_CREATE_FAIL,
    payload: {
      data,
    },
  }),
  editTag: (data) => ({
    type: ActionType.TAG_EDIT,
    payload: {
      data,
    },
  }),
  editTagSuccess: (data) => ({
    type: ActionType.TAG_EDIT_SUCCESS,
    payload: {
      data,
    },
  }),
  editTagFail: (data) => ({
    type: ActionType.TAG_EDIT_FAIL,
    payload: {
      data,
    },
  }),
  deleteTag: (data) => ({
    type: ActionType.TAG_DELETE,
    payload: {
      data,
    },
  }),
  deleteTagSuccess: (data) => ({
    type: ActionType.TAG_DELETE_SUCCESS,
    payload: {
      data,
    },
  }),
  deleteTagFail: (data) => ({
    type: ActionType.TAG_DELETE_FAIL,
    payload: {
      data,
    },
  }),
};

export default TagAction;
