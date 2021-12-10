import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { TaskAction } from "../action_creators";
import { URI } from "../../configs/config";
import { axiosRequest, RequestMethod } from "../../configs/axios";
import { ActionType } from "../../constants";

export function* runFetchAllTask(action) {
  try {
    // const fetchAllTaskData = yield axiosRequest(URI.fetchAllTask);
    const fetchAllTaskData = [
      {
        id: 1,
        taskName: "Task 1",
        details: "Details 1",
        deadline: "2021-12-04",
        tagId: [1, 2, 3],
        priority: "high",
        taskStatus: "backlog",
      },
      {
        id: 2,
        taskName: "Task 2",
        details: "Details 2",
        deadline: "2021-12-05",
        tagId: [1],
        priority: "low",
        taskStatus: "backlog",
      },
      {
        id: 3,
        taskName: "Task 3",
        details: "Details 3",
        deadline: "2021-12-04",
        tagId: [2],
        priority: "low",
        taskStatus: "completed",
      },
      {
        id: 4,
        taskName: "Task 4",
        details: "Details 4",
        deadline: "2021-12-04",
        tagId: [1],
        priority: "high",
        taskStatus: "backlog",
      },
      {
        id: 5,
        taskName: "Task 5",
        details: "Details 5",
        deadline: "2021-12-05",
        tagId: [1, 3],
        priority: "medium",
        taskStatus: "inProgress",
      },
      {
        id: 6,
        taskName: "Task 6",
        details: "Details 6",
        deadline: "2021-12-04",
        tagId: [3],
        priority: "low",
        taskStatus: "notStarted",
      },
    ];
    console.log("FETCHING", fetchAllTaskData);
    yield put(TaskAction.fetchAllTaskSuccess(fetchAllTaskData));
  } catch (err) {
    yield put(TaskAction.fetchAllTaskFail());
  }
}

export function* runFetchByIdTask(action) {
  try {
    // const fetchByIdTaskData = yield axiosRequest(URI.fetchByIdTask);
    const fetchByIdTaskData = {
      id: 6,
      taskName: "Task 6",
      details: "Details 6",
      tagId: [3],
      deadline: "2021-12-04",
      createdBy: "me",
      assignedTo: "you",
      priority: "low",
      taskStatus: "notStarted",
    };
    console.log("FETCH ID", action.payload.data, fetchByIdTaskData);
    yield put(TaskAction.fetchByIdTaskSuccess(fetchByIdTaskData));
  } catch (err) {
    yield put(TaskAction.fetchByIdTaskFail());
  }
}

export function* runCreateTask(action) {
  try {
    const createData = {
      taskName: "Task 6",
      details: "Details 6",
      tagId: [3],
      deadline: "2021-12-04",
      createdBy: "me",
      assignedTo: "you",
      priority: "low",
      taskStatus: "notStarted",
    };
    console.log("CREATING", action.payload.data)
    // yield axiosRequest(URI.createTask, action.payload.data, RequestMethod.POST);
    yield put(TaskAction.createTaskSuccess());
  } catch (err) {
    yield put(TaskAction.createTaskFail());
  }
}

export function* runUpdateTask(action) {
  try {
    const updateData = {
      id: 3,
      type: "priority",
      value: "high",
    };
    console.log("UPDATE", action.payload.data);
    // yield axiosRequest(URI.updateTask, action.payload.data, RequestMethod.POST);
    yield put(TaskAction.updateTaskSuccess());
  } catch (err) {
    yield put(TaskAction.updateTaskFail());
  }
}

export function* runEditTask(action) {
  try {
    const editData = {
      taskName: "Task 6",
      details: "Details 6",
      tagId: [3],
      deadline: "2021-12-04",
      createdBy: "me",
      assignedTo: "you",
      priority: "low",
      taskStatus: "notStarted",
    };
    console.log("EDIT", action.payload.data.id, action.payload.data)
    // yield axiosRequest(URI.editTask, action.payload.data, RequestMethod.POST);
    yield put(TaskAction.editTaskSuccess());
  } catch (err) {
    yield put(TaskAction.editTaskFail());
  }
}

export function* runDeleteTask(action) {
  try {
    console.log("DELETE", action.payload.data)
    // yield axiosRequest(URI.deleteTask, action.payload.data, RequestMethod.POST);
    yield put(TaskAction.deleteTaskSuccess());
  } catch (err) {
    yield put(TaskAction.deleteTaskFail());
  }
}

export default function* watchTaskSaga() {
  yield takeLatest(ActionType.TASK_FETCH_ALL, runFetchAllTask);
  yield takeLatest(ActionType.TASK_FETCH_BY_ID, runFetchByIdTask);
  yield takeEvery(ActionType.TASK_CREATE, runCreateTask);
  yield takeEvery(ActionType.TASK_UPDATE, runUpdateTask);
  yield takeEvery(ActionType.TASK_EDIT, runEditTask);
  yield takeEvery(ActionType.TASK_DELETE, runDeleteTask);
}
