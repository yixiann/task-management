const task = "/task";
const tag = "/tag";

export const URI = {
  // Endpoint URL

  // Task
  fetchAllTask: task,
  fetchByIdTask: task + "/fetch",
  createTask: task + "/create",
  updateTask: task + "/update",
  editTask: task + "/edit",
  deleteTask: task + "/delete",

  // Tag
  fetchTag: tag,
  createTag: tag + "/create",
  editTag: tag + "/edit",
  deleteTag: tag + "/delete",
};
