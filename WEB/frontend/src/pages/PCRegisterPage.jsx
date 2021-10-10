/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PCRegisterForm from '../components/pcregister/PCRegisterForm';
import PCRegisterTemplate from '../components/pcregister/PCRegisterTemplate';
import { register } from '../modules/userAuth';

const PCRegisterPage = ({ history }) => {
  // const dispatch = useDispatch();
  // error 행
  const error = { email: false, userName: false };

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
  });

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
    console.log(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.');
    }

    const formData = {
      email: form.email,
      password: form.password,
      userName: form.userName,
    };

  //   dispatch(register(formData))
  //     .then((response) => {
  //       if (response.success) {
  //         history.push('/login');
  //       } else {
  //         alert('Failed to sign up');
  //       }
  //     });
  };

  return (
    <PCRegisterTemplate>
      <PCRegisterForm form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    </PCRegisterTemplate>
  );
};

export default withRouter(PCRegisterPage);
