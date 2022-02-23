import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Container } from '@mui/material';
import { profileUser } from "../../../_actions/user_actions";
import CardTemplete from './Sections/CardTemplete';
import defaultUserProfile from "../../../static/imgs/user_profile.png";
import defaultUserBackground from "../../../static/imgs/user_background.png";

export default function UserPage(props) {
  const dispatch = useDispatch();
	const { userId } = props.match.params;
  const userInfo = useSelector((state) => state.profile.userProfile);
  const [bgImageId, setBgImageId] = useState(null);
  
  const getBgImageId = (user_id) => {
    dispatch(profileUser({ userId: user_id })).then((response) => {
      if (response.payload.success) {
        const bgImageId = response.payload.user.background;
        setBgImageId(bgImageId);
      } else {
        alert("그룹정보 가져오기 실패");
      }
    });
  }
  
  useEffect( () => {
    getBgImageId(userId);
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
            `${ bgImageId
              ? `url(/api/users/download/background/${bgImageId})`
              : `url(${defaultUserBackground})`
            }`,
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
          src={user.image ? user.image : defaultUserProfile}
          sx={{
            width: '9rem',
            height: '9rem',
            position: 'absolute',
            zIndex: 3,
            top: '10rem',
            left: '15%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Container>
    );
  }
}