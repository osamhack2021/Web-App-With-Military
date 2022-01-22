import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Grid, IconButton, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import TimerIcon from '@mui/icons-material/Timer';
import CreateIcon from '@mui/icons-material/Create';
import EqualizerIcon from '@mui/icons-material/Equalizer';
//import PCUploadForm from './PCUploadForm';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { styled } from '@mui/material/styles';
// import createGroup from '../../modules/group';
import StudyMenu from "../../NavBar/Sections/StudyMenu";

const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

const MyBoard = ({group}) => {
  const [toggleUploadForm, setToggleUploadForm] = useState(false);

  const onClickToggle = () => {
    setToggleUploadForm(prev => !prev);
  };

  const time = { startTime: '00:00:00', endTime: '00:00:00' };

  const [form, setForm] = useState({
    title: '',
    subTitle: '',
    content: '',
  });
  const onChange = e => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
    console.log(form);
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      {/* {toggleUploadForm && (
        <PCUploadForm
          form={form}
          time={time}
          onChange={onChange}
          onSubmit={onSubmit}
          onClickToggle={onClickToggle}
        />
      )} */}
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
          right: '25%',
        }}  
      >
        <Typography sx={{
          mr: 1,
          fontSize: '1rem',
        }}>
          공부 시작하기
        </Typography>
        <TimerIcon />
      </Button>

      <Button
        variant="contained"
        onClick={onClickToggle}
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
        <Typography sx={{
          mr: 1,
          fontSize: '1rem',
        }}>
          게시글작성
        </Typography>
        <CreateIcon />
      </Button>

      <Box sx={{
        ml: '20%',
        mr: '30%',
      }}>
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          {group.groupName}
        </Typography>

        <Box
          sx={{
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
            {group.members.length}
            /30
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{
          mt: 2,
          mx: 6,
          p: 4,
          borderTop: '1px solid #5E5E5E',
        }}
      >
        <Grid container spacing={4}
          sx={{
            '& .MuiGrid-root': {
              p: 2,
            },
          }}
        >
          <Grid item xs={5}>
            <GrayBox sx={{display: 'flex'}}>
              <Typography sx={{
                mr: 1,
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}>
                그룹 전체 랭킹
              </Typography>
              <EqualizerIcon sx={{color: '#5E5E5E'}}/>
            </GrayBox>
          </Grid>
          
          <Grid item xs={7}>
            <GrayBox >
              <Avatar
                alt="Group Profile Picture"
                sx={{
                  width: '3.5rem',
                  height: '3.5rem',
                }}
                src={localStorage.getItem('image')}
              />
              <Typography>유저 이름</Typography>
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Typography>5시간</Typography>
                <PublicIcon />
              </Box>
            </GrayBox>
          </Grid>
          
          <Grid item xs={5}>
            <GrayBox sx={{display: 'flex'}}>
              <Typography sx={{
                mr: 1,
                fontSize: '1.2rem', 
                fontWeight: 'bold',
              }}>
                정보
              </Typography>
              <PersonIcon sx={{color: '#5E5E5E'}}/>
            </GrayBox>
          </Grid>
        </Grid>
      </Box>

      <StudyMenu />

    </>
  );
};

export default MyBoard;