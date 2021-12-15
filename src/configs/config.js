const task = "/task";
const tag = "/tag";

export const URI = {
  // Endpoint URL

  // Task
  fetchAllTask: task + "/fetch",
  fetchByIdTask: task + "/details/{id}",
  createTask: task + "/create",
  updateTask: task + "/update/{id}",
  editTask: task + "/edit/{id}",
  deleteTask: task + "/delete/{id}",

  // Tag
  fetchAllTag: tag + "/fetch",
  createTag: tag + "/create",
  editTag: tag + "/edit/{id}",
  deleteTag: tag + "/delete/{id}",
};
