import React from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';

const PCRegisterForm = ({
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
          <Typography
            component={Box}
            align="left"
            sx={{
              py: '1rem',
              width: '33%',
            }}
          >
            이메일
          </Typography>

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
          <Typography
            component={Box}
            align="left"
            sx={{
              py: '1rem',
              width: '33%',
            }}
          >
            비밀번호
          </Typography>
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
          <Typography
            component={Box}
            align="left"
            sx={{
              py: '1rem',
              width: '33%',
            }}
          >
            비밀번호 확인
          </Typography>
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
          <Typography
            component={Box}
            align="left"
            sx={{
              py: '1rem',
              width: '33%',
            }}
          >
            닉네임
          </Typography>
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
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{
              mt: 1,
              mb: 2,
              width: '75%',
            }}
          >
            회원가입
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PCRegisterForm;
