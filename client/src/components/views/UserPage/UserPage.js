import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { profileUser } from "../../../_actions/user_actions";
import GrassChart from './Sections/GrassChart';
import AllLineChart from './Sections/AllLineChart';

function UserPage(props) {
  const dispatch = useDispatch();
	const { userId } = props.match.params;
  const userInfo = useSelector((state) => state.profile.userProfile);
  
  useEffect( () => {
    dispatch(profileUser({userId : userId}))
    .then(response => {
      if (response.payload.success) {
          //console.log(response.payload);
      }
    });
  }, []);

  if (userInfo === undefined) {
    return <div>유저정보 불러오는 중</div>;
  } else {
    const {user} = userInfo;
    return (
      <Container 
        component="main"
        maxWidth="lg"
        sx={{
          position: 'relative',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '25%',
            backgroundImage:
              'url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80 850w")',
            position: 'absolute',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: '80%',
            position: 'absolute',
            backgroundColor: '#f1f8ff',
            zIndex: 2,
            bottom: 0,
            borderRadius: '40px 40px 0px 0px',
          }}
        >
          {/* 카드 안에 내용이 들어가는 부분 */}
          {userInfo && (
            <div>
              <br/>
              <br/>
              <h1> 유저 이름 : {user.name}</h1>
              <h2> 전체 공부 시간 : {user.totalTime}</h2>
              <h2> 최장 스트릭 : {user.maxStreak} 현재 스트릭 : {user.curStreak}</h2>
              <GrassChart data={user.history} />
              <AllLineChart data={user.history} />
            </div>
          )}
        </Box>
        <Avatar
          alt="Group Profile Picture"
          sx={{
            width: '9rem',
            height: '9rem',
            position: 'absolute',
            zIndex: 3,
            top: '20%',
            left: '15%',
            transform: 'translate(-50%, -50%)',
          }}
          src={user.image}
        />
      </Container>
    );
  }
}

export default UserPage;