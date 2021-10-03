import client from './client';

export const login = ({email, password}) =>{
    return client.post('/users/login', {email, password});
};

export const register = ({email, password, name}) =>{
    return client.post('/users/register', {email, password, name});
};