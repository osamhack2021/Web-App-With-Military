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
      <Box sx={{
        display:"flex",
        textAlign: "center",
      }}>
        <Box sx={{
            width: "20%",
            mr: "1rem"
          }}>
          <Typography>이메일</Typography>
        </Box>
        <TextField
          variant="outlined"
          size="small"
          name="email"
          fullWidth 
          required
          sx={{ my: 1 }}
          value={email}
          onChange={onChange}
          error={error}
          helperText={error.email?"이미 사용중인 이메일입니다":false}
        />
      </Box>

      <Box sx={{
        display:"flex",
      }}>
        <Box sx={{
            width: "20%",
            mr: "1rem"
          }}>
          <Typography align="center">비밀번호</Typography>
        </Box>
        <TextField
          variant="outlined"
          size="small"
          name="password"
          fullWidth 
          required
          sx={{ my: 1 }}
          value={password}
          onChange={onChange}
        />
      </Box>
      <Box sx={{
        display:"flex",
        }}>
        <Box sx={{
          width: "20%",
          mr: "1rem"
        }}>
        <Typography align="center">비밀번호 확인</Typography>
        </Box>
        <TextField
          variant="outlined"
          size="small"
          name="confirmPassword"
          fullWidth 
          required
          sx={{ my: 1 }}
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
          //error={error}
          helperText={/*비밀번호 비교하는 함수*/false?"비밀번호가 일치하지 않습니다.":false}
        />
      </Box>
      <Box sx={{
        display:"flex",
      }}>
        <Box sx={{
          width: "20%",
          mr: "1rem"
        }}>
          <Typography align="center">닉네임</Typography>
        </Box>
        <TextField
          variant="outlined"
          size="small"
          name="userName"
          fullWidth 
          required
          sx={{ my: 1 }}
          value={userName}
          onChange={onChange}
          error={error}
          helperText={error.userName?"이미 사용중인 닉네임입니다":false}
        />
      </Box>
        
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