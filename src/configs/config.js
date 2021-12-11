// const base = "/localhost:10000"
const task = "/task";
const tag = "/tag";

export const URI = {
  // Endpoint URL

  // Task
  fetchAllTask: task,
  fetchByIdTask: task + "/details/{id}",
  createTask: task + "/create",
  updateTask: task + "/update/{id}",
  editTask: task + "/edit",
  deleteTask: task + "/delete",

  // Tag
  fetchAllTag: tag,
  createTag: tag + "/create",
  editTag: tag + "/edit/{id}",
  deleteTag: tag + "/delete/{id}",
};
