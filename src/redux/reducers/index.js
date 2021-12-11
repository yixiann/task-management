import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";
import TagReducer from "./TagReducer";

const allReducers = combineReducers({
  task: TaskReducer,
  tag: TagReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
