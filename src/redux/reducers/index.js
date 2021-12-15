import { combineReducers } from "redux";
import TaskReducer from "./TaskReducer";
import TagReducer from "./TagReducer";
import AppReducer from "./AppReducers";

const allReducers = combineReducers({
  app: AppReducer,
  task: TaskReducer,
  tag: TagReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
