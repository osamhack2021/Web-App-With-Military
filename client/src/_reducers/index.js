import { combineReducers } from 'redux';
import { auth, profile, ranking, studying, comment, board } from './user_reducer';

const rootReducer = combineReducers({
    auth,
    profile,
    ranking,
    studying,
    comment,
    board,
});

export default rootReducer;