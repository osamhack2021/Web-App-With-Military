import { combineReducers } from 'redux';
import { auth, profile, ranking, timer, comment, board } from './user_reducer';

const rootReducer = combineReducers({
    auth,
    profile,
    ranking,
    timer,
    comment,
    board,
});

export default rootReducer;