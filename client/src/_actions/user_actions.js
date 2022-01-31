import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER,
    PROFILE_USER, PROFILE_GROUP,
    RANKING_USER, RANKING_GROUP,
    TIMER_STATUS, TIMER_START, TIMER_END, TIMER_PAUSE, TIMER_RESUME,
    LOAD_COMMENT, SAVE_COMMENT, REMOVE_COMMENT,
    LOAD_BOARD, SAVE_BOARD, REMOVE_BOARD, EDIT_BOARD,
		SEARCH_ALL,
} from './types';
import {
    USER_SERVER,
    GROUP_SERVER,
    RANKING_SERVER,
    TIMER_SERVER,
    COMMENT_SERVER,
    BOARD_SERVER,
		SEARCH_SERVER,
} from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}
export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function profileUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/profile`, dataToSubmit)
    .then(response => response.data);

    return {
        type: PROFILE_USER,
        payload: request
    }
}

export function profileGroup(dataToSubmit) {
    const request = axios.post(`${GROUP_SERVER}/profile`, dataToSubmit)
    .then(response => response.data);

    return {
        type: PROFILE_GROUP,
        payload: request
    }
}

export function rankingUser() {
    const request = axios.get(`${RANKING_SERVER}/user`)
    .then(response => response.data);

    return {
        type: RANKING_USER,
        payload: request
    }
}

export function rankingGroup() {
    const request = axios.get(`${RANKING_SERVER}/group`)
    .then(response => response.data);

    return {
        type: RANKING_GROUP,
        payload: request
    }
}

export function timerStatus() {
    const request = axios.get(`${TIMER_SERVER}`)
    .then(response => response.data);
    return {
        type: TIMER_STATUS,
        payload: request
    }
}

export function timerStart(dataToSubmit) {
    const request = axios.post(`${TIMER_SERVER}/start`, dataToSubmit)
    .then(response => response.data);
    return {
        type: TIMER_START,
        payload: request
    }
}

export function timerEnd() {
    const request = axios.get(`${TIMER_SERVER}/end`)
    .then(response => response.data);
    return {
        type: TIMER_END,
        payload: request
    }
}

export function timerPause() {
    const request = axios.get(`${TIMER_SERVER}/pause`)
    .then(response => response.data);
    return {
        type: TIMER_PAUSE,
        payload: request
    }
}

export function timerResume() {
    const request = axios.get(`${TIMER_SERVER}/resume`)
    .then(response => response.data);
    return {
        type: TIMER_RESUME,
        payload: request
    }
}

export function loadComment(dataToSubmit) {
    const request = axios.post(`${COMMENT_SERVER}`, dataToSubmit)
    .then(response => response.data);
    return {
        type: LOAD_COMMENT,
        payload: request
    }
}

export function saveComment(dataToSubmit) {
    const request = axios.post(`${COMMENT_SERVER}/save`, dataToSubmit)
    .then(response => response.data);
    return {
        type: SAVE_COMMENT,
        payload: request
    }
}

export function removeComment(dataToSubmit) {
    const request = axios.post(`${COMMENT_SERVER}/remove`, dataToSubmit)
    .then(response => response.data);
    return {
        type: REMOVE_COMMENT,
        payload: request
    }
}

export function loadBoard(dataToSubmit) {
    const request = axios.post(`${BOARD_SERVER}/group`, dataToSubmit)
    .then(response => response.data);
    return {
        type: LOAD_BOARD,
        payload: request
    }
}

export function saveBoard(dataToSubmit) {
    const request = axios.post(`${BOARD_SERVER}/save`, dataToSubmit)
    .then(response => response.data);
    return {
        type: SAVE_BOARD,
        payload: request
    }
}

export function removeBoard(dataToSubmit) {
    const request = axios.post(`${BOARD_SERVER}/remove`, dataToSubmit)
    .then(response => response.data);
    return {
        type: REMOVE_BOARD,
        payload: request
    }
}

export function editBoard(dataToSubmit) {
    const request = axios.post(`${BOARD_SERVER}/edit`, dataToSubmit)
    .then(response => response.data);
    return {
        type: EDIT_BOARD,
        payload: request
    }
}

export function searchAll(dataToSubmit) {
    const request = axios.post(`${SEARCH_SERVER}/all`, dataToSubmit)
    .then(response => response.data);
    return {
        type: SEARCH_ALL,
        payload: request
    }
}