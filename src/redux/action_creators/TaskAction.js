const { ActionType } = require("../../constants");

const TaskAction = {
  resetReducer: data => ({
    type: ActionType.TASK_RESET_REDUCER,
    payload: {
      data
    }
  }),
  fetchAllTask: data => ({
    type: ActionType.TASK_FETCH_ALL,
    payload: {
      data
    }
  }),
  fetchAllTaskSuccess: data => ({
    type: ActionType.TASK_FETCH_ALL_SUCCESS,
    payload: {
      data
    }
  }),
  fetchAllTaskFail: data => ({
    type: ActionType.TASK_FETCH_ALL_FAIL,
    payload: {
      data
    }
  }),
  fetchByIdTask: data => ({
    type: ActionType.TASK_FETCH_BY_ID,
    payload: {
      data
    }
  }),
  fetchByIdTaskSuccess: data => ({
    type: ActionType.TASK_FETCH_BY_ID_SUCCESS,
    payload: {
      data
    }
  }),
  fetchByIdTaskFail: data => ({
    type: ActionType.TASK_FETCH_BY_ID_FAIL,
    payload: {
      data
    }
  }),
  createTask: data => ({
    type: ActionType.TASK_CREATE,
    payload: {
      data
    }
  }),
  createTaskSuccess: data => ({
    type: ActionType.TASK_CREATE_SUCCESS,
    payload: {
      data
    }
  }),
  createTaskFail: data => ({
    type: ActionType.TASK_CREATE_FAIL,
    payload: {
      data
    }
  }),
  updateTask: data => ({
    type: ActionType.TASK_UPDATE,
    payload: {
      data
    }
  }),
  updateTaskSuccess: data => ({
    type: ActionType.TASK_UPDATE_SUCCESS,
    payload: {
      data
    }
  }),
  updateTaskFail: data => ({
    type: ActionType.TASK_UPDATE_FAIL,
    payload: {
      data
    }
  }),
  editTask: data => ({
    type: ActionType.TASK_EDIT,
    payload: {
      data
    }
  }),
  editTaskSuccess: data => ({
    type: ActionType.TASK_EDIT_SUCCESS,
    payload: {
      data
    }
  }),
  editTaskFail: data => ({
    type: ActionType.TASK_EDIT_FAIL,
    payload: {
      data
    }
  }),
  deleteTask: data => ({
    type: ActionType.TASK_DELETE,
    payload: {
      data
    }
  }),
  deleteTaskSuccess: data => ({
    type: ActionType.TASK_DELETE_SUCCESS,
    payload: {
      data
    }
  }),
  deleteTaskFail: data => ({
    type: ActionType.TASK_DELETE_FAIL,
    payload: {
      data
    }
  }),
};

export default TaskAction;