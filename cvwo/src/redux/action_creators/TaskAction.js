const { ActionType } = require("../../constants");

const TaskAction = {
  createTask: data => ({
    type: "test",
    payload: {
      data
    }
  }),
};

export default TaskAction;