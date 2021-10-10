import React, { useState } from 'react';
import {
  Box, Button, Grid, IconButton, Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';
import CreateIcon from '@mui/icons-material/Create';
import MyAvatar from '../common/MyAvatar';
import MyListItem from '../common/MyListItem';
import PCUploadForm from './PCUploadForm';

const PCStudyGroupMain = () => {
  const userData = {
    userName: 'goodgun',
    totalMember: 26,
    studyGroupName: 'Study with me :)',
    tier: 'Gold',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
  };

  const [toggleUploadForm, setToggleUploadForm] = useState(false);

  const onClickToggle = () => {
    setToggleUploadForm((prev) => !prev);
  };

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
  };

  return (
    <>
      {toggleUploadForm
      && <PCUploadForm
        form={form}
        time={time}
        onChange={onChange}
        onSubmit={onSubmit}
        onClickToggle={onClickToggle}
      />}
      <Button
        variant="contained"
        color="secondary"
        style={{
          borderRadius: '0.5rem',
          width: '11.3rem',
          height: '2.5rem',
          textTransform: 'none',
          marginTop: '1rem',
          position: 'absolute',
          right: '7%',
        }}
      >
        <TimerIcon />
        <Typography
          component={Box}
          sx={{
            ml: 0.5,
            fontSize: '1rem',
          }}
        >
          공부 시작하기
        </Typography>
      </Button>

      <MyListItem
        sx={{
          width: '50%',
          ml: '20%',
          mr: '30%',
        }}
        primary={
          <Typography
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            {userData.studyGroupName}
          </Typography>
        }
        secondary={<>
          <Typography
            component={Box}
          >
            {userData.tier}
          </Typography>
          <Box sx={{
            color: '#5E5E5E',
            display: 'flex',
          }}
          >
            <PersonIcon width="1rem" height="1rem" sx={{ mr: 0.5 }} />
            <Typography
              component={Box}
              sx={{
                fontWeight: 'bold',
                py: '2px',
              }}
            >
              {/* ↓ 스터디 그룹에 참여하는 총 인원 */}
              {userData.totalMember}
              /30
            </Typography>
          </Box>
                   </>}
      />

      <Box sx={{
        mt: 2,
        mx: 6,
        p: 4,
        borderTop: '1px solid #5E5E5E',
      }}
      >
        {/* studygroup_main content */}

        <Grid
          container
          spacing={1}
          sx={{
            '& .MuiGrid-root': {
              p: 2,
            },
          }}
        >
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              '& .MuiGrid-root': {
                p: 3,
              },
            }}
          >
            <Box sx={{
              p: 3,
              mb: 4,
              backgroundColor: ' #E8E8E8',
              borderRadius: '1rem',
            }}
            >
              정보
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            sx={{ }}
          >
            <Box sx={{
              p: 3,
              mb: 4,
              backgroundColor: ' #E8E8E8',
              borderRadius: '1rem',
              display: 'flex',
            }}
            >
              <Typography
                component={Box}
                sx={{
                  my: 'auto',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                게시글작성
              </Typography>
              <IconButton
                sx={{
                  color: '#5E5E5E',
                  ml: 2,
                }}
                onClick={onClickToggle}
              >
                <CreateIcon />
              </IconButton>
            </Box>

            <Box sx={{
              p: 3,
              mb: 4,
              backgroundColor: ' #E8E8E8',
              borderRadius: '1rem',
            }}
            >
              <MyListItem
                avatar={<MyAvatar
                  sx={{
                    width: '3.5rem',
                    height: '3.5rem',
                  }}
                  imageUrl={userData.imageUrl}
                />}
                primary={<Typography>{userData.userName}</Typography>}
                secondary={
                  <Box sx={{
                    display: 'flex',

                  }}
                  >
                    <Typography>
                      5시간
                    </Typography>
                    <PublicIcon />
                  </Box>
                    }
              />
            </Box>
          </Grid>
        </Grid>

      </Box>

    </>

  );
};

export default PCStudyGroupMain;
