import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Button, Grid, IconButton, Paper, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useConfirmDialog } from 'react-mui-confirm';
import Summary from './Summary/Summary';
import Ranking from './Ranking/Ranking';
import Post from './Post/Post';
import Group from './Group/Group';
import Achievement from './Achievement/Achievement';

export default function CardTemplete({
  userInfo
}) {
  const dispatch = useDispatch();
  
  const [tabValue, setTabValue] = useState('1');

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };
  
  return (
    <>
      <Box sx={{ ml: '22%', mr: '30%' }}>
        <Typography sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
        }}>
          {userInfo.name}
        </Typography>
        <Typography sx={{
          fontWeight: 'bold',
          color: '#ECD351'
        }}>
           GOLD {userInfo.totalTime}
        </Typography>
        <Typography sx={{
          fontWeight: 'bold',
          color: '#073113'
        }}>
           육군 병장
        </Typography>
      </Box>
    
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="개요" value="1" />
            <Tab label="랭킹" value="2" />
            <Tab label="게시글" value="3" />
            <Tab label="그룹" value="4" />
            <Tab label="업적" value="5" />
          </TabList>
        </Box>
      
        <TabPanel value="1">
          <Summary
            userInfo={userInfo}
          />
        </TabPanel>
      
        <TabPanel value="2">
          <Ranking

          />
        </TabPanel>
        <TabPanel value="3">
          <Post

          />
        </TabPanel>
      
        <TabPanel value="4">
          <Group

          />
        </TabPanel>
      
        <TabPanel value="5">
          <Achievement

          />
        </TabPanel>
      </TabContext>
    
    </>
  );
}