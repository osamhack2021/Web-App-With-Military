import client from './client';

export const login = ({email, password}) =>{
    return client.post('/users/login', {email, password})
}
