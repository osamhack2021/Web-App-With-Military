import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import RankingBoard from './Sections/RankingBoard'

export default function RankingPage(props) {
	const target = props.match.params.target;
	const [rankList, setRankList] = useState([]);
	
	const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
	
	useEffect(() => {
		switch (target) {
			case "user":
				Axios.get('/api/ranking/user').then((response) => {
					if (response.data.success) {
						setRankList(response.data.result);
						if (tabIndex !== 0)
							setTabIndex(0);
					} else {
						alert('Failed');
					}
				});
				break;
			case "group":
				Axios.get('/api/ranking/group').then((response) => {
					if (response.data.success) {
						setRankList(response.data.result);
						if (tabIndex !== 1)
							setTabIndex(1);
					} else {
						alert('Failed');
					}
				});
				break;
			default:
				//
		}
	}, [target]);
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        rankData={rankList}
        tabIndex={tabIndex}
      />
    </Container>
  );
  
	
	
}