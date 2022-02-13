import React from 'react';
import {Avatar, Box, Paper, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const RankNumberBox = styled(Box)({
  width: 35,
  height: 35,
  position: 'absolute',
  left: 0,
  backgroundColor: '#c4c4c4',
  color: 'white',
  borderRadius: '0 0px 3px 0',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export default function TopScoreCard({data}) {
  return (
    <Paper
      sx={{
        //width: 200,
        height: 180,
        //padding: theme.spacing(1),
        //color: theme.palette.text.secondary,
        //textAlign: 'center',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component={Link}
      to={data.link}
    >
      <RankNumberBox>{data.rank}</RankNumberBox>
      <Avatar 
        src={data.image}  
      />
      <Typography>{data.name}</Typography>
      <Typography>{data.tier}</Typography>
      <Typography>{data.score}</Typography>
    </Paper>
  );
}