import React from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';

const RegisterForm = ({
  form, onChange, onSubmit, /* error */
}) => {
  const {
    email, password, confirmPassword, userName,
  } = form;

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box sx={{
          display: 'flex',
          textAlign: 'center',
        }}
        >
          <Box sx={{
            width: '30%',
            mr: '1rem',
            py: '1rem',
          }}
          >
            <Typography align="center">
              이메일
            </Typography>
          </Box>
          <TextField
            type="email"
            variant="outlined"
            size="small"
            name="email"
            fullWidth
            required
            sx={{ my: 1 }}
            value={email}
            onChange={onChange}
            // error={error}
            // helperText={error.email?"이미 사용중인 이메일입니다":false}
          />
        </Box>

        <Box sx={{
          display: 'flex',
        }}
        >
          <Box sx={{
            width: '30%',
            mr: '1rem',
            py: '1rem',
          }}
          >
            <Typography align="center">
              비밀번호
            </Typography>
          </Box>
          <TextField
            type="password"
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
          display: 'flex',
        }}
        >
          <Box sx={{
            width: '30%',
            mr: '1rem',
            // py: "1rem"
          }}
          >
            <Typography align="center">
              비밀번호 확인
            </Typography>
          </Box>
          <TextField
            type="password"
            variant="outlined"
            size="small"
            name="confirmPassword"
            fullWidth
            required
            sx={{ my: 1 }}
            value={confirmPassword}
            onChange={onChange}
          />
        </Box>
        <Box sx={{
          display: 'flex',
        }}
        >
          <Box sx={{
            width: '30%',
            mr: '1rem',
            py: '1rem',
          }}
          >
            <Typography component={Box} align="center">
              닉네임
            </Typography>
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
            // error={error}
            // helperText={error.userName?"이미 사용중인 닉네임입니다":false}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 1, mb: 2 }}
        >
          회원가입
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
