import { put, takeEvery } from "redux-saga/effects";
import { TagAction } from "../action_creators";
import { URI } from "../../configs/config";
import { axiosRequest, RequestMethod } from "../../configs/axios";
import { ActionType } from "../../constants";

export function* runFetchAllTag(action) {
  try {
    const fetchAllTagData = yield axiosRequest(URI.fetchAllTag);
    const formatFetchAllTagData = !!fetchAllTagData.data
      ? fetchAllTagData.data
      : [];
    console.log("FETCH TAG", formatFetchAllTagData);
    yield put(TagAction.fetchAllTagSuccess(formatFetchAllTagData));
  } catch (err) {
    yield put(TagAction.fetchAllTagFail());
  }
}

export function* runCreateTag(action) {
  try {
    yield axiosRequest(URI.createTag, action.payload.data, RequestMethod.POST);
    yield put(TagAction.createTagSuccess());
  } catch (err) {
    yield put(TagAction.createTagFail());
  }
}

export function* runEditTag(action) {
  try {
    const formatEdit = {
      ...action.payload.data.record,
      [action.payload.data.type]: action.payload.data.value,
    };
    console.log("EDIT TAGS", action.payload.data, formatEdit);
    yield axiosRequest(
      URI.editTag.replace("{id}", formatEdit.id),
      formatEdit,
      RequestMethod.POST
    );
    yield put(TagAction.editTagSuccess());
  } catch (err) {
    yield put(TagAction.editTagFail());
  }
}

export function* runDeleteTag(action) {
  try {
    console.log("DELETE TAG", action.payload.data);
    yield axiosRequest(
      URI.deleteTag.replace("{id}", action.payload.data[0]),
      action.payload.data[0],
      RequestMethod.POST
    );
    yield put(TagAction.deleteTagSuccess());
  } catch (err) {
    yield put(TagAction.deleteTagFail());
  }
}

export default function* watchTagSaga() {
  yield takeEvery(ActionType.TAG_FETCH_ALL, runFetchAllTag);
  yield takeEvery(ActionType.TAG_CREATE, runCreateTag);
  yield takeEvery(ActionType.TAG_EDIT, runEditTag);
  yield takeEvery(ActionType.TAG_DELETE, runDeleteTag);
}
