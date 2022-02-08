import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import EditBoard from './EditBoard';
import Comment from './Comment';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function Summary ({
  groupInfo,
  boardList,
  onClickEdit,
  removeBoardOnConfirm,
  editMode,
  toggleEditMode,
  refreshComment,
}) {
  
  const [groupRankArray, setGroupRankArray] = useState([]);
  
  const findGroupIndex = (groupArray, group_id) => {
    return groupArray.findIndex((group) => group._id === group_id);
	}
  
  useEffect(() => {
    Axios.get('/api/ranking/group').then((response) => {
      if (response.data.success) {
        setGroupRankArray(response.data.result);
      } else {
        alert('Failed');
      }
    });
	}, []);
  
  console.log(groupInfo);
  const myGroupRank = findGroupIndex(groupRankArray, groupInfo._id) + 1;
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={5}>
        <GrayBox>
          <Box sx={{
              display: 'flex',
          }}>
            <Typography sx={{
              mr: 1,
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              그룹 전체 랭킹
            </Typography>
            <EqualizerIcon sx={{color: '#5E5E5E'}}/>
            <Box sx={{ flexGrow: 1 }} />
            <Typography sx={{
              //color: 'text.subtitle1',
            }}>
              랭킹 자세히 보기
            </Typography>
            <ChevronRightIcon />
          </Box>
          <Divider />
          {groupInfo.totalTime}
          <Box sx={{
            display: 'flex',
          }}>
            <Typography>Gold</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography>
              <strong>상위 {((myGroupRank - 1)/groupRankArray.length * 100).toFixed(1)}%</strong>
            </Typography>
          </Box>
          <Typography>
            이 그룹은 총 <strong>{groupRankArray.length}</strong>개의 그룹 중
            <strong> {myGroupRank}위</strong>입니다.
          </Typography>
        </GrayBox>
      </Grid>

      <Grid item xs={7}>
        <GrayBox >
          <Typography>유저 이름</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography>5시간</Typography>
            <PublicIcon />
          </Box>
        </GrayBox>
      </Grid>

      <Grid item xs={5}>
        <GrayBox>
          <Box sx={{display: 'flex' }}>
            <Typography sx={{
              mr: 1,
              fontSize: '1.2rem', 
              fontWeight: 'bold',
            }}>
              정보
            </Typography>
            <PersonIcon sx={{color: '#5E5E5E'}}/>
          </Box>
          <Typography>
            {groupInfo.info}
          </Typography>
        </GrayBox>
      </Grid>

      <Grid item xs={7}>
        <GrayBox>
          {	boardList &&
            boardList.map((board) => (
              <Box key={board._id}>
                <h2>제목 : {board.title}</h2>
                <Button onClick={(e) => { onClickEdit(e, board) }}>
                  <EditOutlinedIcon />
                  수정하기
                </Button>
                <Button onClick={(e) => { removeBoardOnConfirm(e, board) }} >
                  <CloseOutlinedIcon />
                  삭제하기
                </Button>

                <h3>
                  작성자 : {board.writerId.name} 작성일 : {board.posted}
                </h3>
                <h3>내용 : {board.content}</h3>
                {editMode && (
                  <form style={{ display: "flex", marginLeft: "40px" }}>
                    <EditBoard
                      board={board}
                      toggleEditMode={toggleEditMode}
                    />
                    <br />
                  </form>
                )}
                <Comment
                  boardId={board._id}
                  refreshComment={refreshComment}
                />
              </Box>
          ))}
        </GrayBox>
      </Grid>
    </Grid>
  );
}