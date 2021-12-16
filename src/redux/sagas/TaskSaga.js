import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { TaskAction } from "../action_creators";
import { URI } from "../../configs/config";
import { axiosRequest, RequestMethod } from "../../configs/axios";
import { ActionType } from "../../constants";

export function* runFetchAllTask(action) {
  try {
    const fetchAllTaskData = yield axiosRequest(URI.fetchAllTask);
    const formatFetchAllTaskData = !!fetchAllTaskData.data
      ? fetchAllTaskData?.data?.map((item) => ({
          ...item,
          tagId: item.tagId.split(",").map(Number),
        }))
      : [];
    // console.log("FETCH ALL TASK", formatFetchAllTaskData);
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
    const formatFetchByIdTaskData = !!fetchByIdTaskData.data
      ? {
          ...fetchByIdTaskData?.data,
          tagId: fetchByIdTaskData?.data?.tagId?.split(",").map(Number),
        }
      : [];
    // console.log("FETCH BY ID TASK", formatFetchByIdTaskData);
    yield put(TaskAction.fetchByIdTaskSuccess(formatFetchByIdTaskData));
  } catch (err) {
    yield put(TaskAction.fetchByIdTaskFail());
  }
}

export function* runCreateTask(action) {
  try {
    const createData = action.payload.data;
    const formatCreateData = {
      ...createData,
      userId: 1,
      tagId: createData?.tagId?.toString(),
    };
    // console.log("CREATE TASKS", formatCreateData);
    yield axiosRequest(URI.createTask, formatCreateData, RequestMethod.POST);
    yield put(TaskAction.createTaskSuccess());
  } catch (err) {
    yield put(TaskAction.createTaskFail());
  }
}

export function* runUpdateTask(action) {
  try {
    const updateData = action.payload.data;
    const formatUpdateData = {
      ...updateData.record,
      [updateData.type]: updateData.value,
      tagId: updateData.record.tagId.toString(),
    };
    yield axiosRequest(
      URI.updateTask.replace("{id}", formatUpdateData.id),
      formatUpdateData,
      RequestMethod.PUT
    );
    yield put(TaskAction.updateTaskSuccess());
  } catch (err) {
    yield put(TaskAction.updateTaskFail());
  }
}

export function* runEditTask(action) {
  try {
    const editData = action.payload.data;
    const formatEditData = {
      ...editData,
      tagId: editData.tagId.toString(),
    };
    // console.log("EDIT TASKS", formatEditData);
    yield axiosRequest(
      URI.editTask.replace("{id}", editData.id),
      formatEditData,
      RequestMethod.PUT
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
      RequestMethod.DELETE
    );
    yield put(TaskAction.deleteTaskSuccess());
  } catch (err) {
    yield put(TaskAction.deleteTaskFail());
  }
}

export default function* watchTaskSaga() {
  yield takeLatest(ActionType.TASK_FETCH_ALL, runFetchAllTask);
  yield takeLatest(ActionType.TASK_FETCH_BY_ID, runFetchByIdTask);
  yield takeLatest(ActionType.TASK_CREATE, runCreateTask);
  yield takeLatest(ActionType.TASK_UPDATE, runUpdateTask);
  yield takeLatest(ActionType.TASK_EDIT, runEditTask);
  yield takeEvery(ActionType.TASK_DELETE, runDeleteTask);
}
