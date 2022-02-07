import React, { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Badge, Box, Button, Container, Divider, Grid, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { profileUser, rankingUser, rankingGroup } from "../../../_actions/user_actions";
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Tier from './Sections/Tier';

const GrayBox = styled(Box)({
    backgroundColor: '#E8E8E8',
    borderRadius: '1rem',
    padding: '1rem',
})

const userId = localStorage.getItem('userId');

export default function MainPage() {
	const dispatch = useDispatch();
	const userProfile = useSelector((state) => state.profile.userProfile);
	const [userRankArray, setUserRankArray] = useState(0);
	const [groupRankArray, setGroupRankArray] = useState(0);

	const findUserIndex = (userArray, user_id) => {
		return userArray.findIndex((user) => user._id === user_id);
	}
	
	const findUser = (userArray, user_id) => {
		return userArray.find((user) => user._id === user_id);
	}
	
	useEffect( () => {
    dispatch(profileUser({userId : userId}))
    .then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("유저정보 불러오기를 실패했습니다.");
      }
    });
    dispatch(rankingUser())
    .then((response) => {
      if (response.payload.success) {
        setUserRankArray(response.payload.result)
      } else {
        alert("유저랭킹 불러오기를 실패했습니다.");
      }
    });
    dispatch(rankingGroup())
    .then((response) => {
      if (response.payload.success) {
        setGroupRankArray(response.payload.result)
      } else {
        alert("그룹랭킹 불러오기를 실패했습니다.");
      }
    });
	}, []);
	
	
  if (userProfile === undefined || !userRankArray || !groupRankArray) {
    return <div>데이터 불러오는 중</div>
  } else {
    const myRank = findUserIndex(userRankArray, userId) + 1;
    const myData = findUser(userRankArray, userId);

    // console.log(myData);
    // console.log(myRank);
    // console.log(userRankArray);

    const userData = userProfile.user;
    const myElapsedDays = Math.floor((new Date().getTime() - new Date(userData.created).getTime()) / 1000 / 60 / 60 / 24);
    return (
      <Container 
        component="main"
        maxWidth="lg"
      >
        <Box sx={{display: 'flex', my: 4}}>
          <Avatar
            size="large"
            src={userData.image}
            sx={{
              fontSize: "32px",
              mr: 2,
            }}
          />
          <Typography variant="h5">
            안녕하세요, {userData.name}님!
            공부를 시작한지 벌써 {myElapsedDays}일이 지났어요
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={3}>
            <GrayBox sx={{display: 'flex'}}>
              <Typography sx={{mr: 1}}>남은 군생활</Typography>
              <HomeIcon sx={{color: '#5E5E5E'}}/>
            </GrayBox>
          </Grid>

          <Grid item xs={9}>
            <GrayBox>
              <Box sx={{display: 'flex'}}>
                <Typography sx={{mr: 1}}>내 랭킹</Typography>
                <EqualizerIcon sx={{color: '#5E5E5E'}}/>
              </Box>
              <Box sx={{p:2}}>
                <Tier score={myData.totalTime} tier={"Gold"} />
                <Stack
                  direction="row"
                  spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                  sx={{
                    py: 1,
                    '& .MuiBox-root': {
                      display: 'flex',
                    },
                  }}
                >
                  <Box>
                    <Typography sx={{fontWeight: 'bold'}}>{ myRank }</Typography>
                    <Typography>위</Typography>
                  </Box>
                  <Box>
                    <Typography>상위</Typography>
                    <Typography sx={{fontWeight: 'bold'}}>
                      { (myRank/userRankArray.length * 100).toFixed(0) }
                    </Typography>
                    <Typography>%</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{fontWeight: 'bold'}}>
                      { parseInt(myData.totalTime/3600) }
                    </Typography>
                    <Typography sx={{mr: 1}}>시간</Typography>
                    <Typography sx={{fontWeight: 'bold'}}>
                      { parseInt((myData.totalTime%3600)/60) }
                    </Typography>
                    <Typography sx={{mr: 1}}>분</Typography>
                    <Typography sx={{fontWeight: 'bold'}}>
                      { myData.totalTime%60 }
                    </Typography>
                    <Typography>초</Typography>
                  </Box>
                </Stack>
              </Box>
            </GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>2월 활동량</GrayBox>
          </Grid>

          <Grid item xs={9}>
            <GrayBox>일주일간 활동 그래프</GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>일주일간 활동한 카테고리</GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>WM와 함께한 시간</GrayBox>
          </Grid>

          <Grid item xs={3}>
            <GrayBox>인기 태그</GrayBox>
          </Grid>
        </Grid>
      </Container>
    );
	}
}