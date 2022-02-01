import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER,
    PROFILE_USER, PROFILE_GROUP,
    RANKING_USER, RANKING_GROUP,
    TIMER_STATUS, TIMER_START, TIMER_END, TIMER_PAUSE, TIMER_RESUME,
    LOAD_COMMENT, SAVE_COMMENT, REMOVE_COMMENT,
    LOAD_BOARD, SAVE_BOARD, REMOVE_BOARD, EDIT_BOARD,
		SEARCH_ALL,
} from '../_actions/types';
 

export function auth(state={}, action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, loginUserData: action.payload }
        case LOGOUT_USER:
            return {...state }
        default:
            return state;
    }
}

export function profile(state={}, action){
    switch(action.type){
        case PROFILE_USER:
            return {...state, userProfile: action.payload }
        case PROFILE_GROUP:
            return {...state, groupProfile: action.payload }
        default:
            return state;
    }
}

export function ranking(state={}, action){
    switch(action.type){
        case RANKING_USER:
            return {...state, }
        case RANKING_GROUP:
            return {...state, }
        default:
            return state;
    }
}

export function timer(state={}, action){
    switch(action.type){
        case TIMER_STATUS:
            return {...state, }
        case TIMER_START:
            return {...state, }
        case TIMER_END:
            return {...state, timerData: action.payload }
        case TIMER_PAUSE:
            return {...state, }
        case TIMER_RESUME:
            return {...state, }
        default:
            return state;
    }
}

export function comment(state={}, action){
    switch(action.type){
        case LOAD_COMMENT:
            return {...state, }
        case SAVE_COMMENT:
            return {...state, }
        case REMOVE_COMMENT:
            return {...state, }
        default:
            return state;
    }
}

export function board(state={}, action){
    switch(action.type){
        case LOAD_BOARD:
            return {...state, }
        case SAVE_BOARD:
            return {...state, }
        case REMOVE_BOARD:
            return {...state, }
        case EDIT_BOARD:
            return {...state, }
        default:
            return state;
    }
}

export function search(state={}, action){
    switch(action.type){
        case SEARCH_ALL:
            return {...state, }
        default:
            return state;
    }
}
