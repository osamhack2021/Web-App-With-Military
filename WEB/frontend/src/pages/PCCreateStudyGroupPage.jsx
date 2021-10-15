import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PCCreateStudyGroupForm from '../components/pccreatestudygroup/PCCreateStudyGroupForm';
import PCCreateStudyGroupTemplate from '../components/pccreatestudygroup/PCCreateStudyGroupTemplate';
import { useDispatch } from 'react-redux';
import { createGroup } from '../modules/group';

const PCCreateStudyGroupPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const error = { email: false, userName: false };

  const [form, setForm] = useState({
    groupName: '',
    category: '',
    tag1: '',
    tag2: '',
    tag3: '',
    readme: '',
  });

  const onChange = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
    console.log(form);
  };

  const onSubmit = e => {
    e.preventDefault();

    const { studyGroupName, category, tag1, tag2, tag3, readme } = form;

    axios
      .post('/groups/create', {
        studyGroupName,
        category,
        tags: [tag1, tag2, tag3],
        readme,
      })
      .then(res => res.data)
      .then(({ isSuccessful }) => {
        if (isSuccessful) {
          history.push('/pcstudygroup');
          createGroup({ studyGroupName, category, tag1, tag2, tag3, readme });
        }
      });

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
        <PCCreateStudyGroupForm
          form={form}
          onChange={onChange}
          onSubmit={onSubmit}
          error={error}
        />
      </PCCreateStudyGroupTemplate>
    </>
  );
};

export default withRouter(PCCreateStudyGroupPage);
