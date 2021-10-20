import client from './client';

export const login = ({ email, password }) => client.post('/users/login', { email, password });

export const register = ({ email, password, userName }) => client.post('/users/register', { email, password, userName });

export const logout = () => client.get('/users/logout');
