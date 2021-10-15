import React from 'react';
import {
  Box, Toolbar, Input, IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const UploadForm = ({
  form, time, onChange, onSubmit,
}) => {
  const { startTime, endTime } = time;
  const { title, subTitle, content } = form;

  const StyledToolbar = styled(Toolbar)({
    backgroundColor: '#000F04',
    color: 'white',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
  });

  const StyledTypography = styled(Typography)({
    color: 'white',
  });

  return (
    <Box sx={{
      '& .MuiInput-root': {
        padding: '1rem 1rem 1rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      },
      '& input, & textarea': {
        color: 'white',
      },
    }}
    >
      <form onSubmit={onSubmit}>
        <StyledToolbar>
          <IconButton size="large" color="inherit">
            <ClearIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <StyledTypography>글쓰기</StyledTypography>
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
        <Box>
          <StyledTypography>시작시간</StyledTypography>
          <StyledTypography>{startTime}</StyledTypography>
        </Box>
        <Box>
          <StyledTypography>종료시간</StyledTypography>
          <StyledTypography>{endTime}</StyledTypography>
        </Box>
        <Box>
          <StyledTypography>총 집중시간</StyledTypography>
          <StyledTypography>{endTime - startTime}</StyledTypography>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadForm;
