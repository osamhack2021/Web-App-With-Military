import { combineReducers } from 'redux';
import userAuth from './userAuth';
import group from './group';

const rootReducer = combineReducers({
  userAuth,
  group,
});

export default rootReducer;
