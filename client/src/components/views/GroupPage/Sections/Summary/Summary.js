import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import EditBoard from './EditBoard';
import Comment from './Comment';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';


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
        <GrayBox>
          {	boardList &&
            boardList.map((board) => {
              const creationDate = new Date(board.posted);
              creationDate.setHours(creationDate.getHours() - 9);
              const now = new Date();
              const timeDiff = Math.floor(now.getTime()/1000 - creationDate.getTime()/1000);
              
              return (
                <Box key={board._id}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5">{board.title}</Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <IconButton onClick={(e) => { onClickEdit(e, board) }}>
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={(e) => { removeBoardOnConfirm(e, board) }} >
                      <CloseOutlinedIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Avatar src={board.writerId.image} sx={{mr: 1}}/>
                    <Typography sx={{mr: 1}}>{board.writerId.name}</Typography>
                    <Box sx={{flexGrow: 1}}/>
                    { parseInt(timeDiff/3600/24/365) ? <Typography>{parseInt(timeDiff/3600/24/365)} 년</Typography> :
                      parseInt(timeDiff/3600/24/30)  ? <Typography>{parseInt(timeDiff/3600/24/30)} 달</Typography>  :
                      parseInt(timeDiff/3600/24)     ? <Typography>{parseInt(timeDiff/3600/24)} 일</Typography>     :
                      parseInt(timeDiff/3600)        ? <Typography>{parseInt(timeDiff/3600)} 시간</Typography>      :
                      parseInt(timeDiff%3600/60)     ? <Typography>{parseInt(timeDiff%3600/60)} 분</Typography>     :
                                                       <Typography>{timeDiff%60} 초</Typography>                     }
                    <PublicIcon sx={{color: '#5E5E5E'}}/>
                  </Box>
                  <Typography>{board.content}</Typography>
                  {editMode && (
                    <EditBoard
                      board={board}
                      toggleEditMode={toggleEditMode}
                    />
                  )}
                  <Comment
                    boardId={board._id}
                    refreshComment={refreshComment}
                  />
                </Box>
              );
            }
          )
        }
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
          <Divider />
          <Typography>
            {groupInfo.info}
          </Typography>
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
              집중중인 멤버
            </Typography>
            <TimerOutlinedIcon sx={{color: '#5E5E5E'}}/>
          </Box>
          <Divider />
          <Typography>
            {groupInfo.info}
          </Typography>
        </GrayBox>
      </Grid>
    </Grid>
  );
}