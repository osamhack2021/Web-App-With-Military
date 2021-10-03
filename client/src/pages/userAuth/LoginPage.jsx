import React, {useState, useEffect} from 'react';
import LoginForm from '../../components/login/LoginForm';
import LoginTemplate from '../../components/login/LoginTemplate';
import {login} from '../../modules/userAuth';

import { useDispatch } from 'react-redux';
import { withRouter  } from 'react-router-dom';


const LoginPage = ({history}) => {
	const dispatch = useDispatch();

    const [error, setError] = useState({
        email: false,
        password: false
    });

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const clearForm = () => {
        setForm({
            email: '',
            password: ''
        })
    };

    const clearPassword = () => {
        setForm({
            ...form,
            password: ''
        })
    };

    const onChange = e => {
        const nextForm={
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(nextForm);
    }

    const onSubmit = e => {
        e.preventDefault();

        let formData = {
            email: form.email,
            password: form.password
        }
        
        dispatch(login(formData))
            .then(res => {
                console.log(res);
                if(res.userData) return history.push('/main');
                if(res.loginFailure.email){
                    clearForm();
                    setError({ email: true });
                    return;
                };
                if(res.loginFailure.password){
                    clearPassword();
                    setError({ password: true });
                    return;
                };
            });
    }
    
    /*
    useEffect(() => {
        console.log(error);
    }, [error]);
    */

    return(
        <LoginTemplate>
            <LoginForm form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
        </LoginTemplate>
    )
};

export default withRouter(LoginPage);