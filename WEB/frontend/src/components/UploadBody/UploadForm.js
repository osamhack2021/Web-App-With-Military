import React, {useState} from "react";
import Toolbar from '@mui/material/Toolbar';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import { Typography, TextField } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { uploadDiary } from '../../_actions/user_action';

//Input 안 글씨 색깔

const UploadForm = (props) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: '',
    subTitle: '',
    content: ''
  });

  const onChange = e => {
    const nextForm={
        ...form,
        [e.target.name]: e.target.value
    };
    setForm(nextForm);
    console.log(form);
  }


  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(uploadDiary(form))
        .then(response => {
            if (response.payload.loginSuccess) {
                alert('게시글이 등록되었습니다.')
                props.history.push('/')
            } else {
                alert('Failed to Upload')
            }
        })
}
  const StyledToolbar = styled(Toolbar)({
    backgroundColor: '#000F04',
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    height: '3rem'
  })

  const StyledTypography = styled(Typography)({
    fontSize: '1.3rem',
    color: 'white'
  })

  

  const StyledInput = styled(Input)({

  })
  return (
      <Box
        sx={{
          '& .MuiTextField-root': {
            m: 1,
          },
          '& input, & textarea::placeholder':{
            color: 'white',
          },
          '& input, & textarea':{
            color: 'white',
            padding: 'auto 0'
          }
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <Box>
            <StyledToolbar>
              <IconButton size="large" color="inherit">
                <ClearIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <StyledTypography>글쓰기</StyledTypography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton type="submit" size="large" color="inherit">
                <CheckIcon/>
              </IconButton>
            </StyledToolbar>
            
          </Box>
          <Input
            placeholder="제목"
            value={form.title}
            onChange={onChange}
            name="title"
            fullWidth
            required
          />
          <Input
            placeholder="소제목"
            value={form.subTitle}
            onChange={onChange}
            name="subTitle"
            fullWidth
            required
          />
          <Input
            placeholder="내용을 입력하세요."
            value={form.content}
            onChange={onChange}
            name="content"
            fullWidth
            required
            multiline
            rows={8}
          />
        </form>

      <Box sx={{
        display: 'flex',
        '& .MuiBox-root':
          { 
            margin: '1rem'
          },
      }}>
        <Box>
          <StyledTypography>시작시간</StyledTypography>
          <StyledTypography>18:03:08</StyledTypography>
        </Box>
        <Box>
          <StyledTypography>종료시간</StyledTypography>
          <StyledTypography>20:51:24</StyledTypography>
        </Box>
        <Box>
          <StyledTypography>총 집중시간</StyledTypography>
          <StyledTypography>02:48:16</StyledTypography>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadForm;