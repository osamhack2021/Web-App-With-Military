import client from './client';

export const login = ({email, password}) =>{
    return client.post('/users/login', {email, password});
};

export const register = ({email, password, userName}) =>{
    return client.post('/users/register', {email, password, userName});
};