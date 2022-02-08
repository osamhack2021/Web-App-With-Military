import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import EditBoard from './EditBoard';
import Comment from './Comment';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function Summary ({
  boardList,
  onClickEdit,
  removeBoardOnConfirm,
  editMode,
  toggleEditMode,
  refreshComment,
}) {
  return (
    <Grid container spacing={4}>
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
          <Typography>유저 이름</Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography>5시간</Typography>
            <PublicIcon />
          </Box>
        </GrayBox>
      </Grid>

      <Grid item xs={5}>
        <GrayBox sx={{display: 'flex' }}>
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