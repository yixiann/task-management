import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { TagAction } from "../action_creators";
import { URI } from "../../configs/config";
import { axiosRequest, RequestMethod } from "../../configs/axios";
import { ActionType } from "../../constants";

export function* runFetchAllTag(action) {
  try {
    const fetchAllTagData = [
      { id: 1, tagName: "TAGS1", colour: "red" },
      { id: 2, tagName: "TAGGING2", colour: "volcano" },
      { id: 3, tagName: "TAGGER3", colour: "green" },
      { id: 4, tagName: "TAGME4", colour: "lime" },
      { id: 5, tagName: "TAGNOBODY5", colour: "blue" },
    ];
    console.log("FETCH TAG", fetchAllTagData);
    // const fetchAllTagData = yield axiosRequest(URI.fetchAllTag);
    yield put(TagAction.fetchAllTagSuccess(fetchAllTagData));
  } catch (err) {
    yield put(TagAction.fetchAllTagFail());
  }
}

export function* runCreateTag(action) {
  try {
    const createData = {
      tagName: "TAGS1",
      colour: "red",
    };
    console.log("CREATE TAG", action.payload.data)
    // yield axiosRequest(URI.createTag, action.payload.data, RequestMethod.POST);
    yield put(TagAction.createTagSuccess());
  } catch (err) {
    yield put(TagAction.createTagFail());
  }
}

export function* runEditTag(action) {
  try {
    const editData = {
      id: 1,
      value: "red",
      type: "colour",
    };
    console.log("EDIT TAG", action.payload.data);
    // yield axiosRequest(URI.updateTag, action.payload.data, RequestMethod.POST);
    yield put(TagAction.editTagSuccess());
  } catch (err) {
    yield put(TagAction.editTagFail());
  }
}

export function* runDeleteTag(action) {
  try {
    const deleteData = [1];
    console.log("DELETE TAG", action.payload.data)
    // yield axiosRequest(URI.deleteTag, action.payload.data, RequestMethod.POST);
    yield put(TagAction.deleteTagSuccess());
  } catch (err) {
    yield put(TagAction.deleteTagFail());
  }
}

export default function* watchTagSaga() {
  yield takeLatest(ActionType.TAG_FETCH_ALL, runFetchAllTag);
  yield takeEvery(ActionType.TAG_CREATE, runCreateTag);
  yield takeEvery(ActionType.TAG_EDIT, runEditTag);
  yield takeEvery(ActionType.TAG_DELETE, runDeleteTag);
}
