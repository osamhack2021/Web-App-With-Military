import React from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';

const PCRegisterForm = ({ form, onChange, onSubmit /* error */ }) => {
  const {
    groupName, category, tag1, tag2, tag3, readme,
  } = form;

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box
          sx={{
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
            스터디그룹명
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            name="groupName"
            fullWidth
            required
            sx={{ my: 1 }}
            value={groupName}
            onChange={onChange}
            // error={error}
            // helperText={error.groupName?"사용가능한 그룹명입니다":false}
          />
        </Box>

        <Box
          sx={{
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
            스터디그룹 테마
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="category"
            fullWidth
            required
            sx={{ my: 1 }}
            value={category}
            onChange={onChange}
          />
        </Box>
        <Box
          sx={{
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
            스터디그룹 태그1
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="tag1"
            fullWidth
            sx={{ my: 1 }}
            value={tag1}
            onChange={onChange}
          />
        </Box>
        <Box
          sx={{
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
            스터디그룹 태그2
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="tag2"
            fullWidth
            sx={{ my: 1 }}
            value={tag2}
            onChange={onChange}
          />
        </Box>

        <Box
          sx={{
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
            스터디그룹 태그3
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="tag3"
            fullWidth
            sx={{ my: 1 }}
            value={tag3}
            onChange={onChange}
          />
        </Box>

        <Box
          sx={{
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
            그룹 소개글
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            name="groupIntro"
            fullWidth
            required
            sx={{ my: 1 }}
            value={readme}
            onChange={onChange}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ my: 2 }}
        >
          스터디그룹 생성
        </Button>
      </form>
    </>
  );
};

export default PCRegisterForm;

/* 그룹 가입 가능 인원은 일단 api 로직 상에서 제외되었으므로 ui에서도 제외함
<Box
  sx={{
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
    그룹 가입 가능 인원
  </Typography>
  <TextField
    variant="outlined"
    size="small"
    name="maxMember"
    fullWidth
    required
    sx={{ my: 1 }}
    value={maxMember}
    onChange={onChange}
  />
</Box>; */
