import { combineReducers } from 'redux';
import { ActionType } from '../../constants';
import TaskReducer from './TaskReducer';

const allReducers = combineReducers({
  task: TaskReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;