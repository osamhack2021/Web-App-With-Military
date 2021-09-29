import React, {useState, useCallback} from 'react';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';

import { useDispatch } from 'react-redux';
import { withRouter  } from 'react-router-dom';

import axios from 'axios';


const LoginPage = () => {
	const dispatch = useDispatch();

    const error={email: false, password: false}; //error 행

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const onChange = e => {
        const nextForm={
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(nextForm);
        console.log(form);
    }

    const onSubmit = e => {
        e.preventDefault();

        let body = {
            email: form.email,
            password: form.password
        }
        
        dispatch(loginUser(body))
            .then(response => {
                console.log(response);
            });
        
        axios.get('/test').then(response=>console.log(response));
        axios.post('/api/users/login', {id: form.email, password: form.password})
            .then(response=>console.log(response));

    }

    return(
        <AuthTemplate>
            <AuthForm form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
        </AuthTemplate>
    )
};

export default LoginPage;