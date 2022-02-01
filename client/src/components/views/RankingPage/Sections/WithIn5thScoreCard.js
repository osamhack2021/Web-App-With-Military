import React from 'react';
import {Avatar, Box, Button, IconButton, Paper, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

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
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component={Link}
      to={data.link}
    >
      <Avatar 
        src={data.image}  
      />
      <Typography>{data.name}</Typography>
      <Typography>{data.tier}</Typography>
      <Typography>{data.score}</Typography>
    </Paper>
  );
}