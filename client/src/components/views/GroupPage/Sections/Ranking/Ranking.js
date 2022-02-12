import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const GrayBox = styled(Box)({
  backgroundColor: '#E8E8E8',
  borderRadius: '2.5rem',
  padding: '1rem',
})

export default function Ranking ({
  boardList,
  onClickEdit,
  removeBoardOnConfirm,
  editMode,
  toggleEditMode,
  refreshComment,
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  
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
        <GrayBox>
          <Box sx={{display: 'flex'}}>
            <Typography sx={{
              mr: 1,
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              멤버 랭킹
            </Typography>
            <EqualizerIcon sx={{color: '#5E5E5E'}}/>
          </Box>
          <Tabs
            value={tabValue}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            onChange={handleTabChange}
            aria-label="day week month ranking"
          >
            <Tab label="일간 랭킹" />
            <Tab label="주간 랭킹" />
            <Tab label="월별 랭킹" />
          </Tabs>
        </GrayBox>
      </Grid>

      <Grid item xs={5}>
        <GrayBox sx={{display: 'flex' }}>
          <Typography sx={{
            mr: 1,
            fontSize: '1.2rem', 
            fontWeight: 'bold',
          }}>
            그룹 외국어 랭킹
          </Typography>
          <MenuBookIcon sx={{color: '#5E5E5E'}}/>
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
              </Box>
          ))}
        </GrayBox>
      </Grid>
    </Grid>
  );
}