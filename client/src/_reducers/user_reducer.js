import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER,
    PROFILE_USER, PROFILE_GROUP,
    RANKING_USER, RANKING_GROUP,
    STUDYING_STATUS, STUDYING_START, STUDYING_END, STUDYING_PAUSE, STUDYING_RESUME,
    LOAD_COMMENT, SAVE_COMMENT, REMOVE_COMMENT,
    LOAD_BOARD, SAVE_BOARD, REMOVE_BOARD, EDIT_BOARD,
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
            return {...state, userRank: action.payload }
        case RANKING_GROUP:
            return {...state, groupRank: action.payload }
        default:
            return state;
    }
}

export function studying(state={}, action){
    switch(action.type){
        case STUDYING_STATUS:
            return {...state, }
        case STUDYING_START:
            return {...state, }
        case STUDYING_END:
            return {...state, studyingData: action.payload }
        case STUDYING_PAUSE:
            return {...state, }
        case STUDYING_RESUME:
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
            return {...state, boardData: action.payload }
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
