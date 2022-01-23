import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Badge, Container, IconButton, Typography } from '@mui/material';
import { profileGroup } from "../../../_actions/user_actions";
import MyBoard from './Sections/MyBoard';

function GroupPage(props) {
  const { groupId } = props.match.params;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileGroup({ groupId: groupId }))
    .then((response) => {
      if (response.payload.success) {
        //console.log(response.payload);
      } else {
        alert("그룹정보 가져오기를 실패했습니다.");
      }
    });
  }, []);

  const groupData = useSelector((state) => state.user);

  if (groupData.groupProfile === undefined) {
    return (
        <div>그룹정보 불러오는 중</div>
    );
  } else {
    const {group} = groupData.groupProfile;
    console.log(group);
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
          <MyBoard group={group}/>
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
          src={localStorage.getItem('image')}
        />
      </Container>
    );
  }
  
  // return (
  //   <div>
  //     {GroupInfo && (
  //       <div>
	// 		<img src={GroupInfo.image} />
  //         <h1> 그룹 이름 : {GroupInfo.groupName} </h1>
  //         <h2> 그룹 설명 : {GroupInfo.Info} </h2>
  //         <h2> 카테고리 : {GroupInfo.category} </h2>
  //         <h2> 전체 공부 시간 : {GroupInfo.totalTime} </h2>
  //         <h3>태그</h3>
  //         {Tags.map((tag) => (
  //           <span>{tag} </span>
  //         ))}
  //       </div>
  //     )}
  //     <Board groupId={props.match.params.groupId}/>
  //   </div>
  // );
}

export default GroupPage;
