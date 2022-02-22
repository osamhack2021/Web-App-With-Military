import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import RankingBoard from './Sections/RankingBoard'

export default function RankingPage(props) {
	const target = props.match.params.target;
	const [rankData, setRankData] = useState([]);
	
	const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  
  const getUserRank = () => {
    return Axios.get('/api/ranking/user')
  }
  
  const getGroupRank = () => {
    return Axios.get('/api/ranking/group')
  }
  
  const getUserRankData = () => {
    const userRankArray = 
      new Promise((resolve, reject) => {
        const userRankData = getUserRank();
        resolve(userRankData);
      })
    userRankArray.then((response) => {
      const userRankData = response.data.result;
      //console.log(userRankData);
      setRankData(userRankData);
    })
  }
  
  const getGroupRankData = () => {
    const groupRankArray = 
      new Promise((resolve, reject) => {
        const groupRankData = getGroupRank();
        resolve(groupRankData);
      })
    groupRankArray.then((response) => {
      const groupRankData = response.data.result;
      console.log(groupRankData);
      setRankData(groupRankData);
    })
  }
	
	useEffect(() => {
    switch (target) {
      case "user":
         getUserRankData();
        break;
      case "group":
        getGroupRankData();
        break;
      default:
        //
    }
	}, [target]);

  if(rankData.length === 0){
    return <></>
  } else {
    return (
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'calc(100vh - 9rem - 1px)',
          overflow: 'hidden'
        }}
      >
        <br/>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            label="유저 랭킹"
            sx={{ fontSize: '2rem', fontWeight: 'bold' }}
            component={Link}
            to={'/ranking/user'}
          />
          <Tab
            label="그룹 랭킹"
            sx={{ fontSize: '2rem', fontWeight: 'bold' }}
            component={Link}
            to={'/ranking/group'}
          />
        </Tabs>

        <RankingBoard
          rankData={rankData}
          tabIndex={tabIndex}
        />
      </Container>
    );
  }
}