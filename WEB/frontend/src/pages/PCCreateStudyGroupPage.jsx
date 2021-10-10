import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PCCreateStudyGroupForm from '../components/pccreatestudygroup/PCCreateStudyGroupForm';
import PCCreateStudyGroupTemplate from '../components/pccreatestudygroup/PCCreateStudyGroupTemplate';

const PCCreateStudyGroupPage = () => {
  const error = { email: false, userName: false };

  const [form, setForm] = useState({
    studyGroupName: '',
    studyGroupTheme: '',
    tag1: '',
    tag2: '',
    tag3: '',
    maxMember: 0,
    groupIntro: '',
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
    <>
      <PCCreateStudyGroupTemplate>
        <PCCreateStudyGroupForm form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
      </PCCreateStudyGroupTemplate>
    </>
  );
};

export default withRouter(PCCreateStudyGroupPage);
