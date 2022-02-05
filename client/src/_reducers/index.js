import { combineReducers } from 'redux';

import { auth, profile, ranking, timer, comment, board, search } from './user_reducer';

const rootReducer = combineReducers({
  auth,
  profile,
  ranking,
  timer,
  comment,
  board,
  search,
});

export default rootReducer;