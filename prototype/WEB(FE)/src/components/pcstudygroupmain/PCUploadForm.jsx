import React from 'react';
import {
  Box, Toolbar, Input, IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const UploadForm = ({
  form, time, onChange, onSubmit, onClickToggle,
}) => {
  const { startTime, endTime } = time;
  const { title, subTitle, content } = form;

  const StyledToolbar = styled(Toolbar)({
    backgroundColor: '#000F04',
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  });

  return (
    <Box sx={{
      backgroundColor: '#000F04',
      '& .MuiInput-root': {
        padding: '1rem 1rem 1rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      },
      '& input, & textarea': {
        color: 'white',
      },
      position: 'fixed',
      top: '20%',
      left: '50%',
      zIndex: 4,
      transform: 'translateX(-50%)',
    }}
    >
      <form onSubmit={onSubmit}>
        <StyledToolbar>
          <IconButton size="large" color="inherit">
            <ClearIcon onClick={onClickToggle} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography style={{ color: 'white' }}>글쓰기</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton type="submit" size="large" color="inherit">
            <CheckIcon />
          </IconButton>
        </StyledToolbar>
        <Input
          placeholder="제목"
          value={title}
          onChange={onChange}
          name="title"
          fullWidth
          required
        />
        <Input
          placeholder="소제목"
          value={subTitle}
          onChange={onChange}
          name="subTitle"
          fullWidth
          required
        />
        <Input
          placeholder="내용을 입력하세요."
          value={content}
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
        justifyContent: 'center',
        textAlign: 'center',
        '& .MuiBox-root':
          {
            margin: '0.5rem',
            width: '33%',
          },
      }}
      >
        <Box sx={{ color: 'white' }}>
          <Typography>시작시간</Typography>
          <Typography>{startTime}</Typography>
        </Box>
        <Box sx={{ color: 'white' }}>
          <Typography>종료시간</Typography>
          <Typography>{endTime}</Typography>
        </Box>
        <Box sx={{ color: 'white' }}>
          <Typography>총 집중시간</Typography>
          <Typography>{endTime - startTime}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadForm;
