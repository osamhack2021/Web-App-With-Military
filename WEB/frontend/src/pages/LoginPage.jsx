import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import LoginTemplate from '../components/login/LoginTemplate';
import { login } from '../modules/userAuth';

const LoginPage = ({ history }) => {
  const dispatch = useDispatch();

  const error = { email: false, password: false }; // error 행

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: form.email,
      password: form.password,
    };

    dispatch(login(formData))
      .then((response) => {
        if (response.success) {
          history.push('/main');
        }
      });
  };

  return (
    <LoginTemplate>
      <LoginForm form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
    </LoginTemplate>
  );
};

export default withRouter(LoginPage);
