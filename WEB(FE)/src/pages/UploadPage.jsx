import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import UploadTemplate from '../components/upload/UploadTemplate';
import UploadForm from '../components/upload/UploadForm';
// import { useDispatch } from 'react-redux';
// import { uploadDiary } from '../../_actions/user_action';

const UploadPage = () => {
  // const dispatch = useDispatch();

  const time = { startTime: '00:00:00', endTime: '00:00:00' };

  const [form, setForm] = useState({
    title: '',
    subTitle: '',
    content: '',
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
    // dispatch(uploadDiary(form))
    //     .then(response => {
    //         if (response.payload.loginSuccess) {
    //             alert('게시글이 등록되었습니다.')
    //             props.history.push('/')
    //         } else {
    //             alert('Failed to Upload')
    //         }
    //     })
  };

  return (
    <>
      <UploadTemplate>
        <UploadForm form={form} time={time} onChange={onChange} onSubmit={onSubmit} />
      </UploadTemplate>
    </>
  );
};
export default withRouter(UploadPage);
