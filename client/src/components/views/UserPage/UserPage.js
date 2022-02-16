import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Container } from '@mui/material';
import { profileUser } from "../../../_actions/user_actions";
import CardTemplete from './Sections/CardTemplete';

export default function UserPage(props) {
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
          minHeight: 'calc(100vh - 9rem - 1px)',
           overflow: 'hidden',
        }}
        disableGutters
      >
        <Box
          sx={{
            width: '100%',
            height: '15rem',
            position: 'absolute',
            top: 0,
            zIndex: 1,
            backgroundImage:
              'url("https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=850&q=80 850w")',
          }}
        />
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            mt: '10rem',
            zIndex: 2,
            backgroundColor: '#f1f8ff',
            borderRadius: '40px 40px 0px 0px',
          }}
        >
          {/* 템플릿 안에 내용이 들어가는 부분 */}
          <CardTemplete
            userInfo={user}  
          />
        </Box>
        <Avatar
          alt="Group Profile Picture"
          sx={{
            width: '9rem',
            height: '9rem',
            position: 'absolute',
            zIndex: 3,
            top: '10rem',
            left: '15%',
            transform: 'translate(-50%, -50%)',
          }}
          src={user.image}
        />
      </Container>
    );
  }
}