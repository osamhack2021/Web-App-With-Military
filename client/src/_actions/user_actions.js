import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    PROFILE_USER,
    PROFILE_GROUP,
    RANKING_USER,
    RANKING_GROUP,
    STUDYING_STATUS,
    STUDYING_START,
    STUDYING_END,
    STUDYING_PAUSE,
    STUDYING_RESUME,
} from './types';
import {
    USER_SERVER,
    GROUP_SERVER,
    RANKING_SERVER,
    STUDYING_SERVER,
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

export function studyingStatus() {
    const request = axios.get(`${STUDYING_SERVER}`)
    .then(response => response.data);
    return {
        type: STUDYING_STATUS,
        payload: request
    }
}

export function studyingStart(dataToSubmit) {
    const request = axios.post(`${STUDYING_SERVER}/start`, dataToSubmit)
    .then(response => response.data);
    return {
        type: STUDYING_START,
        payload: request
    }
}

export function studyingEnd() {
    const request = axios.get(`${STUDYING_SERVER}/end`)
    .then(response => response.data);
    return {
        type: STUDYING_END,
        payload: request
    }
}

export function studyingPause() {
    const request = axios.get(`${STUDYING_SERVER}/pause`)
    .then(response => response.data);
    return {
        type: STUDYING_PAUSE,
        payload: request
    }
}

export function studyingResume() {
    const request = axios.get(`${STUDYING_SERVER}/resume`)
    .then(response => response.data);
    return {
        type: STUDYING_RESUME,
        payload: request
    }
}

