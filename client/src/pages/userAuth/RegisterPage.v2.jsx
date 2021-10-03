//승호님이 작성해준 버전 수정 후 적용 예정

import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterForm from '../components/register.v2/RegisterForm';
import RegisterTemplate from '../components/register.v2/RegisterTemplate';
import {register} from '../modules/userAuth';

const RegisterPage = ({history}) => {
    const dispatch = useDispatch();
    //error 행  
    const error={email: false, userName: false}; 
    

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        userName:''
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

        if (form.password !== form.confirmPassword) {
            return alert('비밀번호가 일치하지 않습니다.')
        }

        let formData = {
            email: form.email,
            password: form.password,
            userName: form.userName
        }
        
        dispatch(register(formData))
        .then(response => {
            if (response.success) {
                history.push("/login")
            } else {
                alert("Failed to sign up")
            }
        })
    }
    
    return (
        <RegisterTemplate>
            <RegisterForm form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
        </RegisterTemplate>
    );
}

export default withRouter(RegisterPage);    