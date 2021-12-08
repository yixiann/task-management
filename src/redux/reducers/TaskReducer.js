import { ActionType } from '../../constants';

const InitialState = {
  data: [],
};

const TaskReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "test":
      return {
        ...state,
      }

    // OTHERS
    default:
      return {
        ...state
      };
  }
};

export default TaskReducer;