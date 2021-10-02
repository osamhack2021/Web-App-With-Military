import React, { useState } from 'react';
import {InputLabel, Button, TextField, Typography } from '@mui/material';
import { Grid, Box } from "@material-ui/core";
const RegisterForm = ({form, onChange, onSubmit, error}) => {
  const {email, password, userName} = form;
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  return(
    <>
      <Grid container spacing={1} sx={{display:"block"}}>
        <Grid item xs={12} sm={3}>
          <Typography align="center">이메일</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            fullWidth 
            required
            name="email"
            sx={{ my: 1 }}
            value={email}
            onChange={onChange}
            error={error}
            helperText={error.email?"이미 사용중인 이메일입니다":false}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <Typography align="center">비밀번호</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            fullWidth 
            required
            name="password"
            sx={{ my: 1 }}
            value={password}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography align="center">비밀번호 확인</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            fullWidth 
            required
            name="confirmPassword"
            sx={{ my: 1 }}
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            //error={error}
            helperText={/*비밀번호 비교하는 함수*/false?"비밀번호가 일치하지 않습니다.":false}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography align="center">닉네임</Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            fullWidth 
            required
            name="userName"
            sx={{ my: 1 }}
            value={userName}
            onChange={onChange}
            error={error}
            helperText={error.userName?"이미 사용중인 닉네임입니다":false}
          />
        </Grid>
      </Grid>
      <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
      >
          회원가입
      </Button>

    </>
  )
}

export default RegisterForm;