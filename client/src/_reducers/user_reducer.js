import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    PROFILE_USER,
    RANKING_USER,
    RANKING_GROUP,
} from '../_actions/types';
 

export default function(state={}, action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case PROFILE_USER:
            return {...state, userProfile: action.payload }
        case RANKING_USER:
            return {...state, userRank: action.payload }
        case RANKING_GROUP:
            return {...state, groupRank: action.payload }
        default:
            return state;
    }
}