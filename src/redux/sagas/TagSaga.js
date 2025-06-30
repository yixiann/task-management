import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { TagAction } from "../action_creators";
import { URI } from "../../configs/config";
import { axiosRequest, RequestMethod } from "../../configs/axios";
import { ActionType } from "../../constants";

export function* runFetchAllTag() {
  try {
    const fetchAllTagData = yield axiosRequest(URI.fetchAllTag);
    const formatFetchAllTagData = fetchAllTagData.data
      ? fetchAllTagData.data
      : [];
    yield put(TagAction.fetchAllTagSuccess(formatFetchAllTagData));
  } catch (err) {
    console.log(err);
    yield put(TagAction.fetchAllTagFail());
  }
}

export function* runCreateTag(action) {
  try {
    yield axiosRequest(URI.createTag, action.payload.data, RequestMethod.POST);
    yield put(TagAction.createTagSuccess());
  } catch (err) {
    console.log(err);
    yield put(TagAction.createTagFail());
  }
}

export function* runEditTag(action) {
  try {
    const formatEdit = {
      ...action.payload.data.record,
      [action.payload.data.type]: action.payload.data.value,
    };
    yield axiosRequest(
      URI.editTag.replace("{id}", formatEdit.id),
      formatEdit,
      RequestMethod.PUT
    );
    yield put(TagAction.editTagSuccess());
  } catch (err) {
    console.log(err);
    yield put(TagAction.editTagFail());
  }
}

export function* runDeleteTag(action) {
  try {
    yield axiosRequest(
      URI.deleteTag.replace("{id}", action.payload.data[0]),
      action.payload.data[0],
      RequestMethod.DELETE
    );
    yield put(TagAction.deleteTagSuccess());
  } catch (err) {
    console.log(err);
    yield put(TagAction.deleteTagFail());
  }
}

export default function* watchTagSaga() {
  yield takeLatest(ActionType.TAG_FETCH_ALL, runFetchAllTag);
  yield takeLatest(ActionType.TAG_CREATE, runCreateTag);
  yield takeLatest(ActionType.TAG_EDIT, runEditTag);
  yield takeEvery(ActionType.TAG_DELETE, runDeleteTag);
}
