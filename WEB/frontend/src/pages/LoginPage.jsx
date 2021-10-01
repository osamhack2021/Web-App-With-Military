import React, {useState, useCallback} from 'react';
import LoginForm from '../components/views/login/LoginForm';
import LoginTemplate from '../components/views/login/LoginTemplate';
import {login} from '../modules/userAuth';

import { useDispatch } from 'react-redux';
import { withRouter  } from 'react-router-dom';


const LoginPage = ({history}) => {
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

        let formData = {
            email: form.email,
            password: form.password
        }
        
        dispatch(login(formData))
            .then(response => {
                if(response.success){
                    history.push('/main');
                }
            });
    }

    return(
        <LoginTemplate>
            <LoginForm form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
        </LoginTemplate>
    )
};

export default withRouter(LoginPage);