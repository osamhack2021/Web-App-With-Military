import { combineReducers } from 'redux';
import {
	auth, profile, ranking, studying, comment, board, search
} from './user_reducer';

const rootReducer = combineReducers({
	auth,
	profile,
	ranking,
	studying,
	comment,
	board,
	search,
});

export default rootReducer;