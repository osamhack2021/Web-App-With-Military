import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge, Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import Axios from "axios";
import StudyGroupCard from './Sections/StudyGroupCard';

export default function UserGroupPage() {
    const user = useSelector((state) => state.user);

    if (user.userData === undefined) {
        return (
            <div>유저정보 불러오는 중</div>
        );
    }   else {
        
        const myGroups = 
            <>
            { user.userData.groupList.map((group, index) => (
                    <Grid
                        item
                        xs={3}
                        key={index}
                    >
                        <Link
                            href={`/groups/${group._id}`}
                            underline="none"
                        >
                            <StudyGroupCard group={group}/>
                        </Link>
                    </Grid>
                ))}
            </>
        return (
            <Container 
                component="main"
                maxWidth="lg"
            >
                <Box sx={{display: 'flex'}}>
                    <Avatar
                        size="large"
                        src={localStorage.getItem("image")}
                        style={{
                            fontSize: "32px",
                            position: "flex",
                        }}
                    />
                    <Typography>
                        안녕하세요, {user.userData.name}님!
                        공부를 시작한지 벌써
                    </Typography>
                </Box>
    
                <Box 
                    sx={{
                        backgroundColor: '#E8E8E8',
                        borderRadius: '2.5rem',
                        p: 4,
                    }}
                >
                    <Typography
                        component={Box}
                        sx={{
                            pb: 2,
                            fontSize: '2rem',
                            borderBottom: '1px solid #5E5E5E',
                        }}
                    >
                        스터디 그룹
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid
                        item
                        xs={3}
                        >
                            <Button
                                component="a"
                                href="/group/create"
                                variant="contained"
                                color="secondary"
                            >
                                스터디 그룹 추가
                            </Button>
                        </Grid>
                        {myGroups}
                    </Grid>
                </Box>
            </Container>
        );
    }
    
}