import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import useSWR from 'swr';
import PCCreateStudyGroupForm from '../components/pccreatestudygroup/PCCreateStudyGroupForm';
import PCCreateStudyGroupTemplate from '../components/pccreatestudygroup/PCCreateStudyGroupTemplate';
import { fetcher } from '../lib/api/fetcher';

const PCCreateStudyGroupPage = () => {
  const error = { email: false, userName: false };

  const [form, setForm] = useState({
    groupName: '',
    category: '',
    tag1: '',
    tag2: '',
    tag3: '',
    members: 0,
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

    const { data, error } = useSWR('/board/{userId}', fetcher);
    const formData = {
      groupName: form.gorupName,
      category: form.category,
      tags: [form.tag1, form.tag2, form.tag3],
      members: form.members,

    };
    return {
      user: data,
      isLoading: !error && !data,
      isError: error,
    };
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
