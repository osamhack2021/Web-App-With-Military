import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    PROFILE_USER,
    RANKING_USER,
    RANKING_GROUP,
} from './types';
import { USER_SERVER, RANKING_SERVER} from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}
export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
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
    const request = axios.post(`${USER_SERVER}/profile`, dataToSubmit).
    then(response => response.data);

    return {
        type: PROFILE_USER,
        payload: request
    }
}

export function rankingUser(dataToSubmit) {
    const request = axios.get(`${RANKING_SERVER}/user`).
    then(response => response.data);

    return {
        type: RANKING_USER,
        payload: request
    }
}

export function rankingGroup(dataToSubmit) {
    const request = axios.get(`${RANKING_SERVER}/group`).
    then(response => response.data);

    return {
        type: RANKING_GROUP,
        payload: request
    }
}

