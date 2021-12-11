import { all } from "redux-saga/effects";
import TaskSaga from "./TaskSaga";
import TagSaga from "./TagSaga";

export default function* allSaga() {
  yield all([TaskSaga(), TagSaga()]);
}
