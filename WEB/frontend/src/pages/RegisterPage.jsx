import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterForm from '../components/views/register/RegisterForm';
import RegisterTemplate from '../components/views/register/RegisterTemplate';

const RegisterPage = ({history}) => {
    const dispatch = useDispatch();
    //error 행  
    const error={email: false, password: false ,userName: false}; 
    

    const [form, setForm] = useState({
        email: '',
        password: '',
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

        let formData = {
            email: form.email,
            password: form.password,
            userName: form.userName
        }
    }
        
    // dispatch(register(formData))
    //     .then(response => {
    //         if (response.success) {
    //             history.push("/login")
    //         } else {
    //             alert("Failed to sign up")
    //         }
    //     })
    

    return (
        <RegisterTemplate>
            <RegisterForm form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
        </RegisterTemplate>
    );
}

export default withRouter(RegisterPage);    