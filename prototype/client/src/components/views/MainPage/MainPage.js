import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge, Box, Button, Container, Grid, Typography } from '@mui/material';
import Axios from "axios";
import { styled } from '@mui/system';

const GrayBox = styled(Box)({
    backgroundColor: '#E8E8E8',
    borderRadius: '2.5rem',
    padding: '1rem',
})

function MainPage() {
    const user = useSelector((state) => state.user);
    
    if (user.userData === undefined) {
        return (
            <div>유저정보 불러오는 중</div>
        );
    }   else {
        return (
            <Container 
                component="main"
                maxWidth="lg"
            >
                <Box sx={{display: 'flex', my: 4}}>
                    <Avatar
                        size="large"
                        src={localStorage.getItem("image")}
                        sx={{
                            fontSize: "32px",
                            mr: 2,
                        }}
                    />
                    <Typography variant="h5"
                    >
                        안녕하세요, {user.userData.name}님!
                        공부를 시작한지 벌써 000이 지났어요
                    </Typography>
                </Box>
                
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <GrayBox>전역률</GrayBox>
                    </Grid>

                    <Grid item xs={9}>
                        <GrayBox>내 랭킹</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>10월 활동량</GrayBox>
                    </Grid>

                    <Grid item xs={9}>
                        <GrayBox>일주일간 활동 그래프</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>일주일간 활동 비율</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>W.M.과 함께한 시간</GrayBox>
                    </Grid>

                    <Grid item xs={3}>
                        <GrayBox>인기 태그</GrayBox>
                    </Grid>


                </Grid>
            </Container>
        );
    }
}

export default MainPage
