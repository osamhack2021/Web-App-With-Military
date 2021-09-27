import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import { Typography, TextField, } from "@material-ui/core";
import { styled } from '@material-ui/core/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';


//Input 안 글씨 색깔

const UploadForm = () => {
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

  const onSubmit = e => {
    e.preventDefault();
    console.log("제출");
    // dispatch들어가야함
    // axios.post('/', {title: form.title, subTitle: form.subTitle, content: form.content})
    //     .then(response=>console.log(response));

  }
  
  return (
    <>
      <Box
        sx={{
          '& .MuiTextField-root':
          { m: 1,
            },
        }}
        color='#e6e1e0'
      >

        <form onSubmit={onSubmit}>
          <Box>
            <Toolbar>
              <IconButton size="large" color="inherit">
                <ClearIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="h4">
                글쓰기
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton type="submit" size="large" color="inherit">
                <CheckIcon/>
              </IconButton>
            </Toolbar>
            
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
      </Box>
      

    </>

  );
};

export default UploadForm;