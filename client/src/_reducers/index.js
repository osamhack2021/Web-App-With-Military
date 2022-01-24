import { combineReducers } from 'redux';
import { auth, profile, ranking, studying } from './user_reducer';

const rootReducer = combineReducers({
    auth,
    profile,
    ranking,
    studying
});

export default rootReducer;