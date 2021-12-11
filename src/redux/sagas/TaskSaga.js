import { put, takeEvery } from "redux-saga/effects";
import { TaskAction } from "../action_creators";
import { URI } from "../../configs/config";
import { axiosRequest, RequestMethod } from "../../configs/axios";
import { ActionType } from "../../constants";

export function* runFetchAllTask(action) {
  try {
    const fetchAllTaskData = yield axiosRequest(URI.fetchAllTask);
    const formatFetchAllTaskData = !!fetchAllTaskData.data
      ? fetchAllTaskData.data
      : [];
    console.log("FETCH ALL TASK", formatFetchAllTaskData);
    yield put(TaskAction.fetchAllTaskSuccess(formatFetchAllTaskData));
  } catch (err) {
    yield put(TaskAction.fetchAllTaskFail());
  }
}

export function* runFetchByIdTask(action) {
  try {
    const fetchByIdTaskData = yield axiosRequest(
      URI.fetchByIdTask.replace("{id}", action.payload.data)
    );
    console.log("FETCH BY ID TASK", fetchByIdTaskData.data);
    yield put(TaskAction.fetchByIdTaskSuccess(fetchByIdTaskData.data));
  } catch (err) {
    yield put(TaskAction.fetchByIdTaskFail());
  }
}

export function* runCreateTask(action) {
  try {
    console.log("CREATE TASK", action.payload.data);
    yield axiosRequest(URI.createTask, action.payload.data, RequestMethod.POST);
    yield put(TaskAction.createTaskSuccess());
  } catch (err) {
    yield put(TaskAction.createTaskFail());
  }
}

export function* runUpdateTask(action) {
  try {
    const formatUpdate = {
      ...action.payload.data.record,
      [action.payload.data.type]: action.payload.data.value,
    };
    console.log("UPDATE TASK", action.payload.data, formatUpdate);
    yield axiosRequest(
      URI.updateTask.replace("{id}", formatUpdate.id),
      formatUpdate,
      RequestMethod.POST
    );
    yield put(TaskAction.updateTaskSuccess());
  } catch (err) {
    yield put(TaskAction.updateTaskFail());
  }
}

export function* runEditTask(action) {
  try {
    yield axiosRequest(
      URI.editTask.replace("{id}", action.payload.data.id),
      action.payload.data,
      RequestMethod.POST
    );
    yield put(TaskAction.editTaskSuccess());
  } catch (err) {
    yield put(TaskAction.editTaskFail());
  }
}

export function* runDeleteTask(action) {
  try {
    yield axiosRequest(
      URI.deleteTask.replace("{id}", action.payload.data),
      action.payload.data,
      RequestMethod.POST
    );
    console.log("YEY")
    yield put(TaskAction.deleteTaskSuccess());
  } catch (err) {
    yield put(TaskAction.deleteTaskFail());
  }
}

export default function* watchTaskSaga() {
  yield takeEvery(ActionType.TASK_FETCH_ALL, runFetchAllTask);
  yield takeEvery(ActionType.TASK_FETCH_BY_ID, runFetchByIdTask);
  yield takeEvery(ActionType.TASK_CREATE, runCreateTask);
  yield takeEvery(ActionType.TASK_UPDATE, runUpdateTask);
  yield takeEvery(ActionType.TASK_EDIT, runEditTask);
  yield takeEvery(ActionType.TASK_DELETE, runDeleteTask);
}
